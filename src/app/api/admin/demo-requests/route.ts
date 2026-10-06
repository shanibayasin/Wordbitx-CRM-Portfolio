import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../wordbitx/lib/mongodb';
import { canManageOrganization, requireOrganizationAuth } from '../../../../../wordbitx/lib/auth';
import DemoRequest from '../../../../../wordbitx/models/DemoRequest';

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageOrganization(user.role)) {
      return jsonError('Only workspace administrators can view demo requests.', 403);
    }

    await connectToDatabase();
    const requests = await DemoRequest.find({
      organizationId: new mongoose.Types.ObjectId(user.organizationId),
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: requests.map((request) => ({
        id: request._id.toString(),
        name: request.name,
        email: request.email,
        company: request.company,
        phone: request.phone,
        teamSize: request.teamSize,
        role: request.role,
        features: request.features,
        preferredDate: request.preferredDate,
        preferredTime: request.preferredTime,
        message: request.message,
        status: request.status,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Unable to load demo requests.';
    return jsonError(message, status);
  }
}
