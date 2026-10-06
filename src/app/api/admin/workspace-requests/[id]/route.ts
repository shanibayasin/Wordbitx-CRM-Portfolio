import { createHash, randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../../../wordbitx/lib/mongodb';
import { requirePlatformAdmin } from '../../../../../../wordbitx/lib/auth';
import { sendWorkspaceInviteEmail } from '../../../../../../wordbitx/lib/workspaceInvites';
import User from '../../../../../../wordbitx/models/User';
import WorkspaceRequest from '../../../../../../wordbitx/models/WorkspaceRequest';

const actionSchema = z.object({ action: z.enum(['approve', 'reject']) }).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await requirePlatformAdmin();
    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return jsonError('The workspace request id is invalid.', 400);
    }

    const body: unknown = await request.json().catch(() => null);
    const validation = actionSchema.safeParse(body);
    if (!validation.success) {
      return jsonError('Choose whether to approve or reject this request.', 422);
    }

    await connectToDatabase();
    const workspaceRequest = await WorkspaceRequest.findById(id);
    if (!workspaceRequest) {
      return jsonError('Workspace request not found.', 404);
    }

    if (validation.data.action === 'reject') {
      const rejected = await WorkspaceRequest.findOneAndUpdate(
        { _id: workspaceRequest._id, status: { $in: ['NEW', 'INVITE_PENDING'] } },
        {
          $set: {
            status: 'REJECTED',
            inviteTokenHash: null,
            inviteExpiresAt: null,
          },
          $unset: { activeRequestEmail: 1 },
        },
        { new: true, runValidators: true }
      ).select('_id status');
      if (!rejected) {
        return jsonError('Only unfulfilled requests can be rejected.', 409);
      }
      return NextResponse.json({ success: true, data: { id, status: rejected.status } });
    }

    if (!['NEW', 'INVITE_PENDING', 'INVITE_SENT'].includes(workspaceRequest.status)) {
      return jsonError('This workspace request can no longer be approved.', 409);
    }

    const existingUser = await User.findOne({ email: workspaceRequest.email }).select('_id').lean();
    if (existingUser) {
      return jsonError('An account with this email already exists. Resolve that account before approval.', 409);
    }

    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const approvedAt = workspaceRequest.approvedAt ?? new Date();
    const inviteExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);
    const inviteRequest = await WorkspaceRequest.findOneAndUpdate(
      {
        _id: workspaceRequest._id,
        status: { $in: ['NEW', 'INVITE_PENDING', 'INVITE_SENT'] },
      },
      {
        $set: {
          status: 'INVITE_PENDING',
          inviteTokenHash: tokenHash,
          inviteExpiresAt,
          approvedAt,
        },
      },
      { new: true, runValidators: true }
    );
    if (!inviteRequest) {
      return jsonError('This workspace request has already been resolved.', 409);
    }

    try {
      await sendWorkspaceInviteEmail({
        email: inviteRequest.email,
        name: inviteRequest.name,
        companyName: inviteRequest.companyName,
        token,
      });
    } catch (error) {
      const details = error as { name?: string; message?: string };
      console.error('[workspace-request] Invite email could not be sent.', {
        name: details.name ?? 'Error',
        code: (error as { code?: string | number }).code ?? 'unavailable',
      });
      return jsonError('Approval was recorded, but the invite email could not be sent. Configure SMTP or retry sending the invite.', 503);
    }

    const updated = await WorkspaceRequest.findOneAndUpdate(
      { _id: inviteRequest._id, status: 'INVITE_PENDING', inviteTokenHash: tokenHash },
      { $set: { status: 'INVITE_SENT' } },
      { new: true, runValidators: true }
    ).select('_id status');

    if (!updated) {
      return jsonError('The invite was sent, but the request changed before it could be confirmed. Review its status before retrying.', 409);
    }

    return NextResponse.json({ success: true, data: { id, status: updated.status } });
  } catch (error) {
    const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Unable to update workspace request.';
    return jsonError(message, status);
  }
}
