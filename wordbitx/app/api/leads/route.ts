import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireAuth } from '../../../lib/auth.ts';
import Lead from '../../../models/Lead.ts';
import { leadSchema } from '../../../lib/validations/leadSchema.ts';

function jsonError(message: string, status: number, code = 'ERROR') {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

function serializeLead(input: unknown) {
  const record = input as Record<string, unknown>;
  return {
    ...record,
    id: String(record._id ?? record.id ?? ''),
    organizationId: String(record.organizationId ?? ''),
    assignedToId: record.assignedToId ? String(record.assignedToId) : null,
    createdAt: record.createdAt ?? new Date(),
    updatedAt: record.updatedAt ?? new Date(),
  };
}

export async function GET(request: Request) {
  try {
    const currentUser = await requireAuth();
    if (!canViewLeads(currentUser.role)) {
      return jsonError('You do not have permission to view leads.', 403, 'FORBIDDEN');
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '25');
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 25;
    const organizationId = new mongoose.Types.ObjectId(currentUser.organizationId);

    const query: Record<string, unknown> = { organizationId };

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } },
        { company: { $regex: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } },
        { email: { $regex: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } },
      ];
    }

    if (status) {
      query.status = status;
    }

    await connectToDatabase();
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean();

    return NextResponse.json({
      success: true,
      data: leads.map((lead) => serializeLead(lead)),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
      },
    });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to load leads.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuth();
    if (!canManageLeads(currentUser.role)) {
      return jsonError('You do not have permission to create leads.', 403, 'FORBIDDEN');
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== 'object') {
      return jsonError('Request body is required.', 400, 'VALIDATION_ERROR');
    }

    if ('organizationId' in rawBody && rawBody.organizationId && String(rawBody.organizationId) !== currentUser.organizationId) {
      return jsonError('organizationId is derived from the authenticated session and cannot be changed.', 400, 'VALIDATION_ERROR');
    }

    const validation = leadSchema.safeParse(rawBody);
    if (!validation.success) {
      return jsonError(validation.error.issues[0]?.message || 'Lead data is invalid.', 422, 'VALIDATION_ERROR');
    }

    const assignedToId = validation.data.assignedToId;
    if (assignedToId && !mongoose.isValidObjectId(assignedToId)) {
      return jsonError('Assigned user id is invalid.', 400, 'VALIDATION_ERROR');
    }

    const payload = {
      ...validation.data,
      name: validation.data.name.trim(),
      company: validation.data.company?.trim() || null,
      email: validation.data.email?.trim() || null,
      phone: validation.data.phone?.trim() || null,
      notes: validation.data.notes?.trim() || null,
      source: validation.data.source?.trim() || null,
      assignedToId: assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null,
      organizationId: new mongoose.Types.ObjectId(currentUser.organizationId),
      nextFollowUp: validation.data.nextFollowUp ? new Date(validation.data.nextFollowUp) : null,
    };

    await connectToDatabase();
    const createdLead = await Lead.create(payload);

    return NextResponse.json({ success: true, data: serializeLead(createdLead.toObject()) }, { status: 201 });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to create lead.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}
