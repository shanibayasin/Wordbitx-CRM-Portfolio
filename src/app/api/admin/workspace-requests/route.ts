import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/dashboardwordbitx/lib/mongodb';
import { requirePlatformAdmin } from '@/app/dashboardwordbitx/lib/auth';
import WorkspaceRequest from '@/app/dashboardwordbitx/models/WorkspaceRequest';

export async function GET() {
  try {
    await requirePlatformAdmin();
    await connectToDatabase();
    const requests = await WorkspaceRequest.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: requests.map((request) => ({
        id: request._id.toString(),
        name: request.name,
        email: request.email,
        companyName: request.companyName,
        status: request.status,
        createdAt: request.createdAt.toISOString(),
        approvedAt: request.approvedAt?.toISOString() ?? null,
        completedAt: request.completedAt?.toISOString() ?? null,
      })),
    });
  } catch (error) {
    const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Unable to load workspace requests.';
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
