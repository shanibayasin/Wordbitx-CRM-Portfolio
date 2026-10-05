import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../lib/mongodb.ts';
import Lead from '../../../../models/Lead.ts';
import Organization from '../../../../models/Organization.ts';

const publicLeadSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name.').max(120, 'Name is too long.'),
    email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.'),
    company: z.string().trim().min(1, 'Enter your company name.').max(120, 'Company name is too long.'),
    phone: z.string().trim().max(40, 'Phone number is too long.').optional().default(''),
    companySize: z.enum(['1-10', '11-50', '51-200', '201+']),
    interest: z.enum([
      'Full CRM & Telephony Suite',
      'Sales Pipeline & Leads Only',
      'Call Center Queue Operations',
      'Agency Multi-Workspace',
      'Custom API & On-Premises SIP',
    ]),
    message: z.string().trim().min(1, 'Tell us how we can help.').max(2000, 'Message is too long.'),
  })
  .strict();

function allowedOrigins() {
  return (process.env.PUBLIC_LEAD_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => new URL(value).origin);
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function isAllowedOrigin(origin: string | null) {
  return origin !== null && allowedOrigins().includes(origin);
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ success: false, error: 'Origin is not allowed.' }, { status: 403 });
  }

  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ success: false, error: 'Origin is not allowed.' }, { status: 403 });
  }

  const cors = corsHeaders(origin);
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 8192) {
    return NextResponse.json(
      { success: false, error: 'Request body is too large.' },
      { status: 413, headers: cors }
    );
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return NextResponse.json(
      { success: false, error: 'Content-Type must be application/json.' },
      { status: 415, headers: cors }
    );
  }

  let rawBody: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, 'utf8') > 8192) {
      return NextResponse.json(
        { success: false, error: 'Request body is too large.' },
        { status: 413, headers: cors }
      );
    }
    rawBody = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Request body must be valid JSON.' },
      { status: 400, headers: cors }
    );
  }

  const validation = publicLeadSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please check the submitted information.',
        fieldErrors: validation.error.flatten().fieldErrors,
      },
      { status: 422, headers: cors }
    );
  }

  const organizationId = process.env.PUBLIC_LEAD_ORGANIZATION_ID;
  if (!organizationId || !mongoose.isValidObjectId(organizationId)) {
    return NextResponse.json(
      { success: false, error: 'Contact requests are temporarily unavailable.' },
      { status: 503, headers: cors }
    );
  }

  try {
    await connectToDatabase();
    const organization = await Organization.findById(organizationId).select('_id').lean();
    if (!organization) {
      return NextResponse.json(
        { success: false, error: 'Contact requests are temporarily unavailable.' },
        { status: 503, headers: cors }
      );
    }

    const { name, email, company, phone, companySize, interest, message } = validation.data;
    const lead = await Lead.create({
      name,
      email: email.toLowerCase(),
      company,
      phone: phone || null,
      companySize,
      source: 'website-contact',
      notes: `Interest: ${interest}\n\n${message}`,
      organizationId: new mongoose.Types.ObjectId(organizationId),
    });

    return NextResponse.json(
      { success: true, data: { id: lead._id.toString() } },
      { status: 201, headers: cors }
    );
  } catch (error) {
    const details = error as { name?: string; code?: string | number };
    console.error('[public-leads] Failed to persist contact request.', {
      name: details.name ?? 'Error',
      code: details.code ?? 'unavailable',
    });
    return NextResponse.json(
      { success: false, error: 'We could not submit your request. Please try again later.' },
      { status: 503, headers: cors }
    );
  }
}
