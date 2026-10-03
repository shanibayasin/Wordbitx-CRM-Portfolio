import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb.ts';
import Customer from '../../../../models/Customer.ts';
import Deal from '../../../../models/Deal.ts';
import Ticket from '../../../../models/Ticket.ts';
import { customerSchema } from '../../../../lib/validations/customerSchema.ts';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const customer = await Customer.findById(id)
      .populate('organizationId', 'name logoUrl')
      .lean();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const deals = await Deal.find({ customerId: id })
      .populate('assignedToId', 'name email')
      .lean();

    const tickets = await Ticket.find({ customerId: id })
      .populate('assignedToId', 'name email')
      .lean();

    return NextResponse.json({
      id: customer._id.toString(),
      ...customer,
      deals,
      tickets,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validation = customerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten() }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const updated = await Customer.findByIdAndUpdate(id, validation.data, {
        new: true,
        runValidators: true,
      }).lean();

      if (!updated) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
      }

      return NextResponse.json({
        id: updated._id.toString(),
        ...updated,
      });
    } catch {
      return NextResponse.json({
        id,
        ...validation.data,
      });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    try {
      await connectToDatabase();
      await Customer.findByIdAndDelete(id);
    } catch {
      // Graceful
    }
    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete customer' }, { status: 500 });
  }
}
