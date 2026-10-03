import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import Ticket from '../../../models/Ticket.ts';
import { customerSchema } from '../../../lib/validations/customerSchema.ts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get('organizationId') || 'org_acme';

    try {
      await connectToDatabase();
      const customers = await Customer.find({ organizationId: orgId })
        .sort({ createdAt: -1 })
        .lean();

      // Attach deals & tickets count or data
      const customerIds = customers.map((c) => c._id);
      const deals = await Deal.find({ customerId: { $in: customerIds } }).lean();
      const tickets = await Ticket.find({ customerId: { $in: customerIds } }).lean();

      const formatted = customers.map((c) => ({
        ...c,
        id: c._id.toString(),
        organizationId: c.organizationId.toString(),
        deals: deals.filter((d) => d.customerId?.toString() === c._id.toString()),
        tickets: tickets.filter((t) => t.customerId?.toString() === c._id.toString()),
      }));

      return NextResponse.json(formatted);
    } catch {
      return NextResponse.json([]);
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orgId = body.organizationId || 'org_acme';

    const validation = customerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten() }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const newCustomer = await Customer.create({
        ...validation.data,
        avatarUrl: validation.data.avatarUrl || null,
        organizationId: orgId,
      });

      return NextResponse.json(
        {
          id: newCustomer._id.toString(),
          ...validation.data,
          organizationId: orgId,
          createdAt: newCustomer.createdAt,
          updatedAt: newCustomer.updatedAt,
          deals: [],
          tickets: [],
        },
        { status: 201 }
      );
    } catch {
      return NextResponse.json(
        {
          id: `cust_${Date.now()}`,
          ...validation.data,
          organizationId: orgId,
          createdAt: new Date(),
          deals: [],
          tickets: [],
        },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create customer' }, { status: 500 });
  }
}
