import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import Ticket from '../../../models/Ticket.ts';
import User from '../../../models/User.ts';
import { customerSchema } from '../../../lib/validations/customerSchema.ts';

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function GET() {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view customers.' }, { status: 403 });
    }
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const customers = await Customer.find({ organizationId }).sort({ createdAt: -1 }).lean();
    const customerIds = customers.map((customer) => customer._id);
    const [deals, tickets] = await Promise.all([
      Deal.find({ organizationId, customerId: { $in: customerIds } }).lean(),
      Ticket.find({ organizationId, customerId: { $in: customerIds } }).lean(),
    ]);

    return NextResponse.json(customers.map((customer) => ({
      ...customer,
      id: customer._id.toString(),
      organizationId: customer.organizationId.toString(),
      deals: deals.filter((deal) => deal.customerId?.toString() === customer._id.toString()),
      tickets: tickets.filter((ticket) => ticket.customerId?.toString() === customer._id.toString()),
    })));
  } catch (error) {
    return errorResponse(error, 'Failed to fetch customers.');
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to create customers.' }, { status: 403 });
    }
    const body: unknown = await request.json().catch(() => null);
    const validation = customerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten() }, { status: 422 });
    }

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const assignedToId = validation.data.assignedToId;
    if (assignedToId && (!mongoose.isValidObjectId(assignedToId) ||
      !await User.exists({ _id: assignedToId, organizationId }))) {
      return NextResponse.json({ error: 'Assigned user does not belong to this workspace.' }, { status: 422 });
    }
    const customer = await Customer.create({
      ...validation.data,
      assignedToId: assignedToId || null,
      avatarUrl: validation.data.avatarUrl || null,
      organizationId,
    });
    return NextResponse.json({
      ...customer.toObject(),
      id: customer._id.toString(),
      organizationId: customer.organizationId.toString(),
      deals: [],
      tickets: [],
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error, 'Failed to create customer.');
  }
}
