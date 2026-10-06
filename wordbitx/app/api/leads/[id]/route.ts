import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Lead from '../../../../models/Lead.ts';
import User from '../../../../models/User.ts';
import { leadSchema } from '../../../../lib/validations/leadSchema.ts';

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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await requireOrganizationAuth();
    const { id } = await params;

    if (!canViewLeads(currentUser.role)) {
      return jsonError('You do not have permission to view leads.', 403, 'FORBIDDEN');
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    if (!mongoose.isValidObjectId(id)) {
      return jsonError('Lead id is invalid.', 400, 'VALIDATION_ERROR');
    }

    await connectToDatabase();
    const lead = await Lead.findOne({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(currentUser.organizationId),
    }).lean();

    if (!lead) {
      return jsonError('Lead not found for this organization.', 404, 'NOT_FOUND');
    }

    return NextResponse.json({ success: true, data: serializeLead(lead) });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to load lead.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await requireOrganizationAuth();
    const { id } = await params;

    if (!canManageLeads(currentUser.role)) {
      return jsonError('You do not have permission to update leads.', 403, 'FORBIDDEN');
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    if (!mongoose.isValidObjectId(id)) {
      return jsonError('Lead id is invalid.', 400, 'VALIDATION_ERROR');
    }

    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== 'object') {
      return jsonError('Request body is required.', 400, 'VALIDATION_ERROR');
    }

    if ('organizationId' in rawBody && rawBody.organizationId && String(rawBody.organizationId) !== currentUser.organizationId) {
      return jsonError('organizationId is derived from the authenticated session and cannot be changed.', 400, 'VALIDATION_ERROR');
    }

    const validation = leadSchema.partial().safeParse(rawBody);
    if (!validation.success) {
      return jsonError(validation.error.issues[0]?.message || 'Lead data is invalid.', 422, 'VALIDATION_ERROR');
    }

    const assignedToId = validation.data.assignedToId;
    if (assignedToId && !mongoose.isValidObjectId(assignedToId)) {
      return jsonError('Assigned user id is invalid.', 400, 'VALIDATION_ERROR');
    }

    await connectToDatabase();
    if (assignedToId) {
      const assignedUser = await User.exists({
        _id: new mongoose.Types.ObjectId(assignedToId),
        organizationId: new mongoose.Types.ObjectId(currentUser.organizationId),
      });
      if (!assignedUser) {
        return jsonError('Assigned user must belong to the current organization.', 422, 'VALIDATION_ERROR');
      }
    }

    const update: Record<string, unknown> = { ...validation.data };
    if (validation.data.name !== undefined) update.name = validation.data.name.trim();
    if (validation.data.company !== undefined) update.company = validation.data.company?.trim() || null;
    if (validation.data.email !== undefined) update.email = validation.data.email?.trim() || null;
    if (validation.data.phone !== undefined) update.phone = validation.data.phone?.trim() || null;
    if (validation.data.notes !== undefined) update.notes = validation.data.notes?.trim() || null;
    if (validation.data.source !== undefined) update.source = validation.data.source?.trim() || null;
    if (validation.data.nextFollowUp !== undefined && validation.data.nextFollowUp) update.nextFollowUp = new Date(validation.data.nextFollowUp);
    if (validation.data.assignedToId !== undefined) {
      update.assignedToId = assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null;
    }

    const updatedLead = await Lead.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId: new mongoose.Types.ObjectId(currentUser.organizationId) },
      { $set: update },
      { new: true }
    ).lean();

    if (!updatedLead) {
      return jsonError('Lead not found in the current organization.', 404, 'NOT_FOUND');
    }

    return NextResponse.json({ success: true, data: serializeLead(updatedLead) });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to update lead.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await requireOrganizationAuth();
    const { id } = await params;

    if (!canManageLeads(currentUser.role)) {
      return jsonError('You do not have permission to delete leads.', 403, 'FORBIDDEN');
    }

    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    if (!mongoose.isValidObjectId(id)) {
      return jsonError('Lead id is invalid.', 400, 'VALIDATION_ERROR');
    }

    await connectToDatabase();
    const result = await Lead.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(currentUser.organizationId),
    });

    if (result.deletedCount === 0) {
      return jsonError('Lead not found in the current organization.', 404, 'NOT_FOUND');
    }

    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to delete lead.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}
