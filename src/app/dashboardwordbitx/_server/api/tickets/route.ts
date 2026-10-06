import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Ticket from '../../../models/Ticket.ts';
import User from '../../../models/User.ts';
import { ticketSchema } from '../../../lib/validations/ticketSchema.ts';

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function GET() {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view tickets.' }, { status: 403 });
    }
    await connectToDatabase();
    const tickets = await Ticket.find({ organizationId: new mongoose.Types.ObjectId(user.organizationId) })
      .populate('customerId', 'name company email avatarUrl')
      .populate('assignedToId', 'name email role avatarUrl')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(tickets.map((ticket) => ({
      id: ticket._id.toString(),
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      organizationId: ticket.organizationId.toString(),
      customerId: ticket.customerId?._id?.toString() ?? null,
      customer: ticket.customerId ?? null,
      assignedToId: ticket.assignedToId?._id?.toString() ?? null,
      assignedTo: ticket.assignedToId ?? null,
      attachments: ticket.attachments ?? [],
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    })));
  } catch (error) {
    return errorResponse(error, 'Failed to fetch tickets.');
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to create tickets.' }, { status: 403 });
    }
    const body: unknown = await request.json().catch(() => null);
    const validation = ticketSchema.safeParse(body);
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
    const ticket = await Ticket.create({
      ...validation.data,
      assignedToId: assignedToId || null,
      customerId: customerId || null,
      organizationId,
    });
    return NextResponse.json({
      id: ticket._id.toString(),
      ...validation.data,
      organizationId: ticket.organizationId.toString(),
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error, 'Failed to create ticket.');
  }
}
