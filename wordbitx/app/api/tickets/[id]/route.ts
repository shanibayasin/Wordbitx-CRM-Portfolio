import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Customer from '../../../../models/Customer.ts';
import Ticket from '../../../../models/Ticket.ts';
import User from '../../../../models/User.ts';
import { ticketSchema } from '../../../../lib/validations/ticketSchema.ts';

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view tickets.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Ticket id is invalid.' }, { status: 400 });
    }
    await connectToDatabase();
    const ticket = await Ticket.findOne({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(user.organizationId),
    })
      .populate('customerId', 'name company email phone avatarUrl')
      .populate('assignedToId', 'name email role avatarUrl')
      .lean();
    if (!ticket) return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    return NextResponse.json({ id: ticket._id.toString(), ...ticket });
  } catch (error) {
    return errorResponse(error, 'Failed to fetch ticket.');
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to update tickets.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Ticket id is invalid.' }, { status: 400 });
    }
    const body: unknown = await request.json().catch(() => null);
    const validation = ticketSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten() }, { status: 422 });
    }
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const { assignedToId, customerId } = validation.data;
    if (assignedToId && (!mongoose.isValidObjectId(assignedToId) ||
      !await User.exists({ _id: assignedToId, organizationId }))) {
      return NextResponse.json({ error: 'Assigned user does not belong to this workspace.' }, { status: 422 });
    }
    if (customerId && (!mongoose.isValidObjectId(customerId) ||
      !await Customer.exists({ _id: customerId, organizationId }))) {
      return NextResponse.json({ error: 'Customer does not belong to this workspace.' }, { status: 422 });
    }
    const updated = await Ticket.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId },
      validation.data,
      { new: true, runValidators: true }
    )
      .populate('customerId', 'name company email phone avatarUrl')
      .populate('assignedToId', 'name email role avatarUrl')
      .lean();
    if (!updated) return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    return NextResponse.json({ id: updated._id.toString(), ...updated });
  } catch (error) {
    return errorResponse(error, 'Failed to update ticket.');
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to delete tickets.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Ticket id is invalid.' }, { status: 400 });
    }
    await connectToDatabase();
    const deleted = await Ticket.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(user.organizationId),
    });
    if (!deleted) return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return errorResponse(error, 'Failed to delete ticket.');
  }
}
