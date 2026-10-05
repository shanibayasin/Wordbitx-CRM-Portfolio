import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../../wordbitx/lib/mongodb';
import Lead from '../../../../../wordbitx/models/Lead';
import Organization from '../../../../../wordbitx/models/Organization';

const demoRequestSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your name.').max(120, 'Name is too long.'),
    email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.'),
    company: z.string().trim().min(1, 'Enter your company name.').max(120, 'Company name is too long.'),
    teamSize: z.enum(['1-5', '5-20', '20-50', '50+']),
    role: z.string().trim().max(120, 'Role is too long.'),
    features: z.array(z.enum([
      'Sales Pipeline & Kanban',
      'Call Center & SIP Telephony',
      'AI Follow-up Assistant',
      'Customer Support SLA Desk',
      'Multi-Workspace Agency Model',
      'REST API & Webhooks',
    ])).max(6),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a valid demo date.'),
    notes: z.string().trim().max(2000, 'Additional notes are too long.'),
  })
  .strict()
  .refine(({ date }) => {
    const parsed = new Date(`${date}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
  }, { path: ['date'], message: 'Choose a valid demo date.' });

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ success: false, error: 'Request origin is not allowed.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ success: false, error: 'Content-Type must be application/json.' }, { status: 415 });
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 8192) {
    return NextResponse.json({ success: false, error: 'Request body is too large.' }, { status: 413 });
  }

  let rawBody: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, 'utf8') > 8192) {
      return NextResponse.json({ success: false, error: 'Request body is too large.' }, { status: 413 });
    }
    rawBody = JSON.parse(body);
  } catch {
    return NextResponse.json({ success: false, error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const validation = demoRequestSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: validation.error.issues[0]?.message || 'Please check the submitted information.',
      },
      { status: 422 }
    );
  }

  const organizationId = process.env.PUBLIC_LEAD_ORGANIZATION_ID;
  if (!organizationId || !mongoose.isValidObjectId(organizationId)) {
    return NextResponse.json(
      { success: false, error: 'Demo requests are temporarily unavailable.' },
      { status: 503 }
    );
  }

  try {
    await connectToDatabase();
    const organization = await Organization.findById(organizationId).select('_id').lean();
    if (!organization) {
      return NextResponse.json(
        { success: false, error: 'Demo requests are temporarily unavailable.' },
        { status: 503 }
      );
    }

    const { name, email, company, teamSize, role, features, date, notes } = validation.data;
    const message = [
      notes ? `Message: ${notes}` : '',
      `Preferred demo date: ${date}`,
      `Team size: ${teamSize}`,
      role ? `Role: ${role}` : '',
      `Focus areas: ${features.join(', ') || 'None selected'}`,
    ].filter(Boolean).join('\n\n');
    const lead = await Lead.create({
      name,
      email: email.toLowerCase(),
      company,
      companySize: teamSize,
      source: 'website-demo',
      notes: message,
      organizationId: new mongoose.Types.ObjectId(organizationId),
    });

    return NextResponse.json(
      { success: true, data: { id: lead._id.toString() } },
      { status: 201 }
    );
  } catch (error) {
    const details = error as { name?: string; code?: string | number };
    console.error('[demo-requests] Failed to save demo request.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return NextResponse.json(
      { success: false, error: 'We could not submit your request. Please try again later.' },
      { status: 503 }
    );
  }
}
