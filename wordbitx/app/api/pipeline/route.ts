import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canViewLeads, requireAuth } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import Lead from '../../../models/Lead.ts';
import User from '../../../models/User.ts';

export async function GET() {
  try {
    const currentUser = await requireAuth();
    if (!canViewLeads(currentUser.role)) {
      return NextResponse.json({ success: false, error: { message: 'You do not have permission to view this pipeline.' } }, { status: 403 });
    }
    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return NextResponse.json({ success: false, error: { message: 'Organization context is missing or invalid.' } }, { status: 401 });
    }

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(currentUser.organizationId);
    const [deals, customers, users, leadCount] = await Promise.all([
      Deal.find({ organizationId })
        .populate('customerId', 'name company email phone organizationId')
        .populate('assignedToId', 'name email role organizationId')
        .sort({ updatedAt: -1 })
        .lean(),
      Customer.find({ organizationId })
        .select('_id name company email phone organizationId createdAt updatedAt')
        .sort({ name: 1 })
        .lean(),
      User.find({ organizationId })
        .select('_id name email role organizationId createdAt')
        .sort({ name: 1 })
        .lean(),
      Lead.countDocuments({ organizationId }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        currentUserId: currentUser.id,
        deals: deals.map((deal) => ({
          ...deal,
          id: deal._id.toString(),
          organizationId: deal.organizationId.toString(),
          customerId: deal.customerId && typeof deal.customerId === 'object' && '_id' in deal.customerId
            ? deal.customerId._id.toString()
            : deal.customerId?.toString() ?? null,
          assignedToId: deal.assignedToId && typeof deal.assignedToId === 'object' && '_id' in deal.assignedToId
            ? deal.assignedToId._id.toString()
            : deal.assignedToId?.toString() ?? null,
        })),
        customers: customers.map((customer) => ({
          id: customer._id.toString(),
          name: customer.name,
          company: customer.company ?? null,
          email: customer.email ?? null,
          phone: customer.phone ?? null,
          organizationId: customer.organizationId.toString(),
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        })),
        users: users.map((user) => ({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId.toString(),
          createdAt: user.createdAt,
        })),
        leadCount,
      },
    });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to load pipeline data.';
    return NextResponse.json({ success: false, error: { message } }, { status: statusCode });
  }
}
