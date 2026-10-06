import bcrypt from 'bcryptjs';
import { timingSafeEqual } from 'node:crypto';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../lib/mongodb.ts';
import Organization from '../../../../models/Organization.ts';
import User from '../../../../models/User.ts';

const registrationSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Name is too long.'),
    email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.'),
    password: z.string().min(12, 'Password must be at least 12 characters.').max(128, 'Password is too long.'),
  })
  .strict();

export async function POST(request: Request) {
  const setupToken = process.env.INITIAL_ADMIN_SETUP_TOKEN;
  if (!setupToken || setupToken.length < 32) {
    return NextResponse.json({ success: false, error: 'Administrator setup is not enabled.' }, { status: 503 });
  }
  const suppliedToken = request.headers.get('x-initial-admin-setup-token') ?? '';
  const expectedBytes = Buffer.from(setupToken);
  const suppliedBytes = Buffer.from(suppliedToken);
  if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
    return NextResponse.json({ success: false, error: 'Administrator setup authorization failed.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ success: false, error: 'Content-Type must be application/json.' }, { status: 415 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const validation = registrationSchema.safeParse(rawBody);
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

  const organizationId = process.env.PUBLIC_LEAD_ORGANIZATION_ID;
  if (!organizationId || !mongoose.isValidObjectId(organizationId)) {
    return NextResponse.json({ success: false, error: 'Administrator setup is unavailable.' }, { status: 503 });
  }

  try {
    await connectToDatabase();
    const organization = await Organization.findById(organizationId).select('_id').lean();
    if (!organization) {
      return NextResponse.json({ success: false, error: 'Administrator setup is unavailable.' }, { status: 503 });
    }

    const session = await mongoose.startSession();
    let createdUserId: string | undefined;
    try {
      await session.withTransaction(async () => {
        const existingUser = await User.findOne({ organizationId }).session(session).select('_id').lean();
        if (existingUser) {
          throw new Error('INITIAL_ADMIN_ALREADY_EXISTS');
        }

        const claim = await Organization.findOneAndUpdate(
          { _id: organizationId, initialAdminId: null },
          { $set: { initialAdminId: new mongoose.Types.ObjectId() } },
          { new: true, session }
        );
        if (!claim) {
          throw new Error('INITIAL_ADMIN_ALREADY_EXISTS');
        }

        const password = await bcrypt.hash(validation.data.password, 12);
        const [user] = await User.create(
          [
            {
              name: validation.data.name,
              email: validation.data.email.toLowerCase(),
              password,
              role: 'ADMIN',
              organizationId: new mongoose.Types.ObjectId(organizationId),
            },
          ],
          { session }
        );

        await Organization.updateOne(
          { _id: organizationId },
          { $set: { initialAdminId: user._id } },
          { session }
        );
        createdUserId = user._id.toString();
      });
    } finally {
      await session.endSession();
    }

    if (!createdUserId) {
      throw new Error('INITIAL_ADMIN_CREATION_FAILED');
    }

    return NextResponse.json(
      { success: true, data: { id: createdUserId } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'INITIAL_ADMIN_ALREADY_EXISTS') {
      return NextResponse.json(
        { success: false, error: 'Initial administrator setup has already been completed.' },
        { status: 409 }
      );
    }

    const details = error as { name?: string; code?: string | number };
    console.error('[auth-register] Initial administrator setup failed.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return NextResponse.json(
      { success: false, error: 'Administrator setup could not be completed. Please try again later.' },
      { status: 503 }
    );
  }
}
