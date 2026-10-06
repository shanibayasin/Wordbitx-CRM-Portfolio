import { NextResponse } from 'next/server';
import type { UpdateQuery } from 'mongoose';
import mongoose from 'mongoose';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Customer from '../../../../models/Customer.ts';
import Deal from '../../../../models/Deal.ts';
import Order from '../../../../models/Order.ts';
import User from '../../../../models/User.ts';
import { orderSchema } from '../../../../lib/validations/orderSchema.ts';
import { calculateOrderTotals, getNextOrderStatuses, getPaymentStatus } from '../../../../components/orders/orderMath.ts';
import type { IOrder } from '../../../../models/Order.ts';
import type { OrderStatus } from '../../../../types/index.ts';

function getReferenceId(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return null;
  if ('_id' in value) return getReferenceId(value._id);
  return 'toString' in value && typeof value.toString === 'function' ? value.toString() : null;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view orders.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Order id is invalid.' }, { status: 400 });
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const order = await Order.findOne({ _id: new mongoose.Types.ObjectId(id), organizationId })
      .populate('customerId', 'name company email phone address city state country postalCode')
      .populate('dealId', 'title value stage probability assignedToId expectedCloseDate')
      .populate('salespersonId', 'name email role')
      .lean();
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json({
      ...order,
      id: order._id.toString(),
      organizationId: order.organizationId.toString(),
      customerId: getReferenceId(order.customerId),
      dealId: getReferenceId(order.dealId),
      salespersonId: getReferenceId(order.salespersonId),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to load order' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to update orders.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Order id is invalid.' }, { status: 400 });
    const body: Record<string, unknown> = await request.json().catch(() => ({}));
    const parsed = orderSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 422 });
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const current = await Order.findOne({ _id: new mongoose.Types.ObjectId(id), organizationId }).lean();
    if (!current) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const customerId = parsed.data.customerId;
    const dealId = parsed.data.dealId;
    const salespersonId = parsed.data.salespersonId;
    if (customerId && (!mongoose.isValidObjectId(customerId) ||
      !await Customer.exists({ _id: customerId, organizationId }))) {
      return NextResponse.json({ error: 'Customer does not belong to this workspace.' }, { status: 422 });
    }
    if (dealId && (!mongoose.isValidObjectId(dealId) ||
      !await Deal.exists({ _id: dealId, organizationId }))) {
      return NextResponse.json({ error: 'Deal does not belong to this workspace.' }, { status: 422 });
    }
    if (salespersonId && (!mongoose.isValidObjectId(salespersonId) ||
      !await User.exists({ _id: salespersonId, organizationId }))) {
      return NextResponse.json({ error: 'Salesperson does not belong to this workspace.' }, { status: 422 });
    }

    const now = new Date();
    const update: Record<string, unknown> = { ...parsed.data, updatedAt: now, lastActivityAt: now };
    if (parsed.data.status && parsed.data.status !== current.status) {
      if (parsed.data.status === 'CANCELLED' && !body.cancellationReason) {
        return NextResponse.json({ error: 'Cancellation reason is required' }, { status: 400 });
      }
      if (parsed.data.status !== 'CANCELLED' && parsed.data.status !== 'REFUNDED' && !getNextOrderStatuses(current.status as OrderStatus).includes(parsed.data.status as OrderStatus)) {
        return NextResponse.json({ error: `Invalid order status transition: ${current.status} to ${parsed.data.status}` }, { status: 409 });
      }
      if (parsed.data.status === 'REFUNDED' && (current.status !== 'COMPLETED' || current.paidAmount <= 0)) {
        return NextResponse.json({ error: 'Only completed orders with recorded payments can be refunded' }, { status: 409 });
      }
      const actor = user.name || user.email || 'Workspace user';
      update.activities = [{
        id: `activity_${now.getTime()}`,
        type: parsed.data.status === 'CONFIRMED' ? 'CONFIRMED' : parsed.data.status === 'PROCESSING' ? 'PROCESSING' : parsed.data.status === 'READY' ? 'READY' : parsed.data.status === 'COMPLETED' ? 'COMPLETED' : 'UPDATED',
        description: parsed.data.status === 'CANCELLED' ? `Order cancelled: ${body.cancellationReason}` : `Order status changed to ${parsed.data.status}`,
        user: actor,
        createdAt: now,
      }, ...(current.activities || [])];
    }
    if (parsed.data.items || parsed.data.additionalCharges !== undefined || parsed.data.paidAmount !== undefined) {
      const items = parsed.data.items || current.items;
      const charges = parsed.data.additionalCharges ?? current.additionalCharges;
      const paid = parsed.data.paidAmount ?? current.paidAmount;
      const totals = calculateOrderTotals(items, charges, paid);
      Object.assign(update, totals, { paymentStatus: getPaymentStatus(totals.total, totals.paidAmount, parsed.data.paymentDueDate || current.paymentDueDate) });
    }
    if (parsed.data.status === 'CANCELLED') {
      update.cancellationReason = body.cancellationReason || current.cancellationReason;
      update.cancellationNotes = body.cancellationNotes || null;
    }
    if (parsed.data.status === 'REFUNDED') {
      if (!body.refundReason || !Number.isFinite(Number(body.refundAmount)) || Number(body.refundAmount) <= 0 || Number(body.refundAmount) > current.paidAmount) {
        return NextResponse.json({ error: 'Valid refund amount and reason are required' }, { status: 400 });
      }
      const amount = Number(body.refundAmount);
      const fullyRefunded = amount >= current.paidAmount;
      update.refundAmount = (current.refundAmount || 0) + amount;
      update.refundDate = now;
      update.refundReason = body.refundReason;
      update.refundStatus = fullyRefunded ? 'COMPLETED' : 'PENDING';
      const remainingPaidAmount = Math.max(0, current.paidAmount - amount);
      update.paidAmount = remainingPaidAmount;
      update.remainingAmount = Math.max(0, current.total - remainingPaidAmount);
      update.paymentStatus = fullyRefunded ? 'REFUNDED' : getPaymentStatus(current.total, remainingPaidAmount, current.paymentDueDate);
      update.status = fullyRefunded ? 'REFUNDED' : current.status;
    }

    const updated = await Order.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId },
      update as UpdateQuery<IOrder>,
      { new: true, runValidators: true }
    )
      .populate('customerId', 'name company email phone')
      .populate('dealId', 'title value stage')
      .populate('salespersonId', 'name email')
      .lean();
    if (!updated) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json({ ...updated, id: updated._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update order' }, { status: 500 });
  }
}
