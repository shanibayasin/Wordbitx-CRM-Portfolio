import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/app/dashboardwordbitx/lib/mongodb';
import {
  canManageOrganization,
  requireAuth,
  requirePlatformAdmin,
} from '@/app/dashboardwordbitx/lib/auth';
import DemoRequest from '@/app/dashboardwordbitx/models/DemoRequest';

const statusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'SCHEDULED', 'COMPLETED']),
}).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();

    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return jsonError('The demo request id is invalid.', 400);
    }

    const filter: { _id: mongoose.Types.ObjectId; organizationId?: string } = {
      _id: new mongoose.Types.ObjectId(id),
    };
    if (user.role === 'SUPER_ADMIN') {
      await requirePlatformAdmin();
    } else {
      if (!canManageOrganization(user.role) || !user.organizationId) {
        return jsonError('Only workspace administrators can manage demo requests.', 403);
      }
      filter.organizationId = user.organizationId;
    }

    const body: unknown = await request.json().catch(() => null);
    const validation = statusSchema.safeParse(body);
    if (!validation.success) {
      return jsonError(validation.error.issues[0]?.message ?? 'A valid request status is required.', 422);
    }

    await connectToDatabase();
    const updated = await DemoRequest.findOneAndUpdate(
      filter,
      { $set: { status: validation.data.status } },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return jsonError('Demo request not found.', 404);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updated._id.toString(),
        status: updated.status,
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Unable to update demo request.';
    return jsonError(message, status);
  }
}
