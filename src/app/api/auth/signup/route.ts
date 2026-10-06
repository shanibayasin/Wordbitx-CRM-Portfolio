import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../../wordbitx/lib/mongodb';
import Organization from '../../../../../wordbitx/models/Organization';
import User from '../../../../../wordbitx/models/User';

const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Name is too long.'),
    email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.'),
    password: z.string().min(12, 'Password must be at least 12 characters.').max(128, 'Password is too long.'),
    companyName: z.string().trim().min(2, 'Enter your company name.').max(120, 'Company name is too long.'),
  })
  .strict();

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ success: false, error: 'Content-Type must be application/json.' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const validation = signupSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please check the submitted information.',
        fieldErrors: validation.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  let stage = 'database connection';
  try {
    await connectToDatabase();
    stage = 'starting registration transaction';
    const session = await User.db.startSession();
    let userId: string | undefined;

    try {
      stage = 'registering workspace and administrator';
      await session.withTransaction(async () => {
        const email = validation.data.email.toLowerCase();
        stage = 'checking email availability';
        const existingUser = await User.findOne({ email }).session(session).select('_id').lean();
        if (existingUser) {
          throw new Error('EMAIL_ALREADY_REGISTERED');
        }

        stage = 'creating workspace';
        const [organization] = await Organization.create(
          [{ name: validation.data.companyName }],
          { session }
        );
        stage = 'creating administrator';
        const [user] = await User.create(
          [
            {
              name: validation.data.name,
              email,
              password: await bcrypt.hash(validation.data.password, 12),
              role: 'ORGANIZATION_OWNER',
              organizationId: organization._id,
            },
          ],
          { session }
        );

        stage = 'linking workspace administrator';
        await Organization.updateOne(
          { _id: organization._id },
          { $set: { initialAdminId: user._id } },
          { session }
        );
        userId = user._id.toString();
      });
    } finally {
      await session.endSession();
    }

    if (!userId) {
      throw new Error('WORKSPACE_SIGNUP_FAILED');
    }

    return NextResponse.json({ success: true, data: { id: userId } }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_REGISTERED') {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    const details = error as { name?: string; code?: string | number };
    if (details.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    console.error('[auth-signup] Workspace creation failed.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
      stage,
    });
    return NextResponse.json(
      { success: false, error: 'Workspace creation could not be completed. Please try again later.' },
      { status: 503 }
    );
  }
}
