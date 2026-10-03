import { NextResponse } from 'next/server';
import type { UpdateQuery } from 'mongoose';
import connectToDatabase from '../../../../lib/mongodb.ts';
import Order from '../../../../models/Order.ts';
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
  const { id } = await params;
  try {
    await connectToDatabase();
    const order = await Order.findById(id)
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
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = orderSchema.partial().safeParse(body);
    if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    await connectToDatabase();
    const current = await Order.findById(id).lean();
    if (!current) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

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
      const actor = typeof body.changedBy === 'string' ? body.changedBy : 'System';
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

    const updated = await Order.findByIdAndUpdate(id, update as UpdateQuery<IOrder>, { new: true, runValidators: true })
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
