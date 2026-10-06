import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../../wordbitx/lib/mongodb';
import { isConfiguredPlatformAdminEmail } from '../../../../../wordbitx/lib/auth';
import User from '../../../../../wordbitx/models/User';
import WorkspaceRequest from '../../../../../wordbitx/models/WorkspaceRequest';

const requestSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Name is too long.'),
  email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.'),
  companyName: z.string().trim().min(2, 'Enter your company name.').max(120, 'Company name is too long.'),
}).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) {
    return jsonError('Request origin is not allowed.', 403);
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('Content-Type must be application/json.', 415);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 8192) {
    return jsonError('Request body is too large.', 413);
  }

  let rawBody: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, 'utf8') > 8192) {
      return jsonError('Request body is too large.', 413);
    }
    rawBody = JSON.parse(body);
  } catch {
    return jsonError('Request body must be valid JSON.', 400);
  }

  const validation = requestSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json({
      success: false,
      error: 'Please check the submitted information.',
      fieldErrors: validation.error.flatten().fieldErrors,
    }, { status: 422 });
  }

  const email = validation.data.email.toLowerCase();
  if (isConfiguredPlatformAdminEmail(email)) {
    return jsonError('This email is reserved for platform administrator access.', 409);
  }

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email }).select('_id').lean();
    if (existingUser) {
      return jsonError('An account with this email already exists. Please sign in instead.', 409);
    }

    const existingRequest = await WorkspaceRequest.findOne({
      email,
      status: { $in: ['NEW', 'INVITE_PENDING', 'INVITE_SENT'] },
    }).select('_id').lean();
    if (existingRequest) {
      return jsonError('A workspace request for this email is already awaiting action.', 409);
    }

    const workspaceRequest = await WorkspaceRequest.create({
      ...validation.data,
      email,
      activeRequestEmail: email,
    });

    return NextResponse.json(
      { success: true, data: { id: workspaceRequest._id.toString(), status: workspaceRequest.status } },
      { status: 201 }
    );
  } catch (error) {
    const details = error as { name?: string; code?: string | number };
    if (details.code === 11000) {
      return jsonError('A workspace request for this email is already awaiting action.', 409);
    }
    console.error('[workspace-request] Failed to save workspace request.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return jsonError('Your workspace request could not be submitted. Please try again later.', 503);
  }
}
