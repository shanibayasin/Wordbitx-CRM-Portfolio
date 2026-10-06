import bcrypt from 'bcryptjs';
import { createHash } from 'node:crypto';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/app/dashboardwordbitx/lib/mongodb';
import Organization from '@/app/dashboardwordbitx/models/Organization';
import User from '@/app/dashboardwordbitx/models/User';
import WorkspaceRequest from '@/app/dashboardwordbitx/models/WorkspaceRequest';

const inviteSchema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{43}$/, 'This invite link is invalid or expired.'),
  password: z
    .string()
    .min(16, 'Use a unique password with at least 16 characters.')
    .max(128, 'Password is too long.')
    .refine((password) => password.trim().length >= 16 && new Set(password).size >= 8, {
      message: 'Use a strong, unique password with at least 16 characters.',
    }),
}).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function clearAuthSessionCookies(request: Request, response: NextResponse) {
  const sessionCookieNames = new Set(
    (request.headers.get('cookie') ?? '')
      .split(';')
      .map((cookie) => cookie.trim().split('=', 1)[0])
      .filter((name) => /^(?:__Secure-)?next-auth\.session-token(?:\.\d+)?$/.test(name))
  );

  for (const name of sessionCookieNames) {
    response.cookies.set(name, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: name.startsWith('__Secure-'),
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });
  }
  return response;
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) {
    return jsonError('Request origin is not allowed.', 403);
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('Content-Type must be application/json.', 415);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError('Request body must be valid JSON.', 400);
  }

  const validation = inviteSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json({
      success: false,
      error: validation.error.issues[0]?.message ?? 'Please check the submitted information.',
    }, { status: 422 });
  }

  try {
    await connectToDatabase();
    const session = await mongoose.startSession();
    let createdUserId: string | undefined;

    try {
      await session.withTransaction(async () => {
        const inviteTokenHash = createHash('sha256').update(validation.data.token).digest('hex');
        const workspaceRequest = await WorkspaceRequest.findOne({
          inviteTokenHash,
          status: 'INVITE_SENT',
          inviteExpiresAt: { $gt: new Date() },
        }).select('+inviteTokenHash').session(session);

        if (!workspaceRequest) {
          throw new Error('WORKSPACE_INVITE_INVALID');
        }

        const existingUser = await User.findOne({ email: workspaceRequest.email })
          .session(session)
          .select('_id')
          .lean();
        if (existingUser) {
          throw new Error('WORKSPACE_INVITE_ACCOUNT_EXISTS');
        }

        const [organization] = await Organization.create(
          [{ name: workspaceRequest.companyName }],
          { session }
        );
        const [user] = await User.create(
          [{
            name: workspaceRequest.name,
            email: workspaceRequest.email,
            password: await bcrypt.hash(validation.data.password, 12),
            role: 'ORGANIZATION_OWNER',
            organizationId: organization._id,
          }],
          { session }
        );

        await Organization.updateOne(
          { _id: organization._id },
          { $set: { initialAdminId: user._id } },
          { session }
        );

        const completed = await WorkspaceRequest.updateOne(
          {
            _id: workspaceRequest._id,
            status: 'INVITE_SENT',
            inviteTokenHash,
            inviteExpiresAt: { $gt: new Date() },
          },
          {
            $set: {
              status: 'COMPLETED',
              organizationId: organization._id,
              completedAt: new Date(),
              inviteTokenHash: null,
              inviteExpiresAt: null,
            },
            $unset: { activeRequestEmail: 1 },
          },
          { session }
        );
        if (completed.modifiedCount !== 1) {
          throw new Error('WORKSPACE_INVITE_INVALID');
        }
        createdUserId = user._id.toString();
      });
    } finally {
      await session.endSession();
    }

    if (!createdUserId) {
      throw new Error('WORKSPACE_INVITE_COMPLETION_FAILED');
    }
    return clearAuthSessionCookies(
      request,
      NextResponse.json({ success: true, data: { id: createdUserId } }, { status: 201 })
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'WORKSPACE_INVITE_INVALID') {
      return jsonError('This invite link is invalid, expired, or has already been used.', 410);
    }
    if (error instanceof Error && error.message === 'WORKSPACE_INVITE_ACCOUNT_EXISTS') {
      return jsonError('An account with this email already exists. Please contact support.', 409);
    }

    const details = error as { name?: string; code?: string | number };
    if (details.code === 11000) {
      return jsonError('An account with this email already exists. Please contact support.', 409);
    }
    console.error('[workspace-invite] Failed to activate approved workspace.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return jsonError('Workspace activation failed. Please try again later.', 503);
  }
}
