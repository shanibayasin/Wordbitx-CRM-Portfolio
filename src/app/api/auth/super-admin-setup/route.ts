import bcrypt from 'bcryptjs';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/app/dashboardwordbitx/lib/mongodb';
import User from '@/app/dashboardwordbitx/models/User';

const setupSchema = z.object({
  password: z
    .string()
    .min(16, 'Use a unique password with at least 16 characters.')
    .max(128)
    .refine((password) => password.trim().length >= 16 && new Set(password).size >= 8, {
      message: 'Use a strong, unique password with at least 16 characters.',
    }),
}).strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  const setupToken = process.env.PLATFORM_SUPER_ADMIN_SETUP_TOKEN;
  const email = process.env.PLATFORM_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  if (!setupToken || setupToken.length < 32 || !email || !z.string().email().safeParse(email).success) {
    return jsonError('Platform administrator setup is not enabled.', 503);
  }

  const suppliedToken = request.headers.get('x-platform-admin-setup-token') ?? '';
  const expectedBytes = Buffer.from(setupToken);
  const suppliedBytes = Buffer.from(suppliedToken);
  if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
    return jsonError('Administrator setup authorization failed.', 403);
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

  const validation = setupSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json({
      success: false,
      error: 'Please use a strong, unique password.',
      fieldErrors: validation.error.flatten().fieldErrors,
    }, { status: 422 });
  }

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email }).select('_id').lean();
    if (existingUser) {
      return jsonError('The configured platform administrator account already exists.', 409);
    }

    const password = await bcrypt.hash(validation.data.password, 12);
    const user = await User.create({
      name: 'WordbitX Super Admin',
      email,
      password,
      role: 'SUPER_ADMIN',
      organizationId: null,
    });

    return NextResponse.json({ success: true, data: { id: user._id.toString() } }, { status: 201 });
  } catch (error) {
    const details = error as { name?: string; code?: string | number };
    if (details.code === 11000) {
      return jsonError('The configured platform administrator account already exists.', 409);
    }

    console.error('[super-admin-setup] Platform administrator setup failed.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return jsonError('Platform administrator setup could not be completed. Please try again later.', 503);
  }
}
