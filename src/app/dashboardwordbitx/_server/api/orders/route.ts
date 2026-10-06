import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import Order from '../../../models/Order.ts';
import User from '../../../models/User.ts';
import { orderSchema } from '../../../lib/validations/orderSchema.ts';
import { calculateOrderTotals, getPaymentStatus } from '../../../components/orders/orderMath.ts';

function getReferenceId(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return null;
  if ('_id' in value) return getReferenceId(value._id);
  return 'toString' in value && typeof value.toString === 'function' ? value.toString() : null;
}

export async function GET() {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view orders.' }, { status: 403 });
    }
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    await connectToDatabase();
    const orders = await Order.find({ organizationId })
      .populate('customerId', 'name company email phone address city state country postalCode')
      .populate('dealId', 'title value stage probability assignedToId expectedCloseDate')
      .populate('salespersonId', 'name email role')
      .sort({ orderDate: -1 })
      .lean();
    return NextResponse.json(orders.map((order) => ({
      ...order,
      id: order._id.toString(),
      organizationId: order.organizationId.toString(),
      customerId: getReferenceId(order.customerId),
      dealId: getReferenceId(order.dealId),
      salespersonId: getReferenceId(order.salespersonId),
    })));
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to load orders' }, { status: statusCode });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to create orders.' }, { status: 403 });
    }
    const requestBody: unknown = await request.json().catch(() => null);
    const body = requestBody && typeof requestBody === 'object' && !Array.isArray(requestBody)
      ? requestBody as Record<string, unknown>
      : {};
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 422 });

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const { customerId, dealId, salespersonId } = parsed.data;
    if (!mongoose.isValidObjectId(customerId) ||
      !await Customer.exists({ _id: customerId, organizationId })) {
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
    const totals = calculateOrderTotals(parsed.data.items, parsed.data.additionalCharges, parsed.data.paidAmount);
    const paymentStatus = getPaymentStatus(totals.total, totals.paidAmount, parsed.data.paymentDueDate);
    const { notes: noteText, ...orderData } = parsed.data;
    const actor = user.name || user.email || 'Workspace user';
    const created = await Order.create({
      ...orderData,
      customerId: new mongoose.Types.ObjectId(customerId),
      dealId: dealId ? new mongoose.Types.ObjectId(dealId) : null,
      salespersonId: salespersonId ? new mongoose.Types.ObjectId(salespersonId) : null,
      ...totals,
      organizationId,
      paymentStatus,
      notes: noteText?.trim() ? [{ id: `note_${now.getTime()}`, content: noteText.trim(), author: actor, createdAt: now }] : [],
      activities: [{ id: `activity_${now.getTime()}`, type: 'CREATED', description: 'Order created', user: actor, createdAt: now }],
      invoiceReferences: [],
      paymentReferences: [],
      refundStatus: 'NONE',
      lastActivityAt: now,
    });
    return NextResponse.json({ ...created.toObject(), id: created._id.toString(), organizationId: created.organizationId.toString() }, { status: 201 });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create order' }, { status: statusCode });
  }
}
