import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Customer from '../../../../models/Customer.ts';
import Deal from '../../../../models/Deal.ts';
import Ticket from '../../../../models/Ticket.ts';
import User from '../../../../models/User.ts';
import { customerSchema } from '../../../../lib/validations/customerSchema.ts';

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view customers.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Customer id is invalid.' }, { status: 400 });
    }
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const customer = await Customer.findOne({ _id: new mongoose.Types.ObjectId(id), organizationId })
      .populate('organizationId', 'name logoUrl')
      .lean();
    if (!customer) return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });
    const [deals, tickets] = await Promise.all([
      Deal.find({ organizationId, customerId: customer._id }).populate('assignedToId', 'name email').lean(),
      Ticket.find({ organizationId, customerId: customer._id }).populate('assignedToId', 'name email').lean(),
    ]);
    return NextResponse.json({ id: customer._id.toString(), ...customer, deals, tickets });
  } catch (error) {
    return errorResponse(error, 'Failed to fetch customer.');
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to update customers.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Customer id is invalid.' }, { status: 400 });
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
    const updated = await Customer.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId },
      { ...validation.data, assignedToId: assignedToId || null },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });
    return NextResponse.json({ id: updated._id.toString(), ...updated });
  } catch (error) {
    return errorResponse(error, 'Failed to update customer.');
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to delete customers.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Customer id is invalid.' }, { status: 400 });
    }
    await connectToDatabase();
    const deleted = await Customer.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(user.organizationId),
    });
    if (!deleted) return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return errorResponse(error, 'Failed to delete customer.');
  }
}
