import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canViewLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import User from '../../../models/User.ts';

export async function GET() {
  try {
    const currentUser = await requireOrganizationAuth();
    if (!canViewLeads(currentUser.role)) {
      return NextResponse.json({ success: false, error: { message: 'You do not have permission to view workspace users.' } }, { status: 403 });
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return NextResponse.json({ success: false, error: { message: 'Organization context is missing or invalid.' } }, { status: 401 });
    }

    await connectToDatabase();
    const users = await User.find({ organizationId: new mongoose.Types.ObjectId(currentUser.organizationId) })
      .select('_id name email role organizationId createdAt')
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId?.toString() ?? '',
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to load workspace users.';
    return NextResponse.json({ success: false, error: { message } }, { status: statusCode });
  }
}
