import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireAuth } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import User from '../../../models/User.ts';
import { dealSchema } from '../../../lib/validations/dealSchema.ts';

function jsonError(message: string, status: number, code = 'ERROR') {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

function serializeDeal(input: unknown) {
  const deal = input as Record<string, unknown>;
  const idString = (value: unknown): string | null => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null && '_id' in value) return String(value._id);
    return String(value);
  };
  return {
    ...deal,
    id: String(deal._id ?? deal.id ?? ''),
    organizationId: idString(deal.organizationId) ?? '',
    customerId: idString(deal.customerId),
    assignedToId: idString(deal.assignedToId),
  };
}

export async function GET() {
  try {
    const currentUser = await requireAuth();
    if (!canViewLeads(currentUser.role)) {
      return jsonError('You do not have permission to view deals.', 403, 'FORBIDDEN');
    }
    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(currentUser.organizationId);
    const deals = await Deal.find({ organizationId })
      .populate('customerId', 'name company email phone organizationId')
      .populate('assignedToId', 'name email role organizationId')
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: deals.map(serializeDeal) });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to load deals.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await requireAuth();
    if (!canManageLeads(currentUser.role)) {
      return jsonError('You do not have permission to create deals.', 403, 'FORBIDDEN');
    }
    if (!currentUser.organizationId || !mongoose.isValidObjectId(currentUser.organizationId)) {
      return jsonError('Organization context is missing or invalid.', 401, 'UNAUTHORIZED');
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return jsonError('Request body is required.', 400, 'VALIDATION_ERROR');
    }
    if ('organizationId' in body) {
      return jsonError('organizationId is derived from the authenticated session and cannot be changed.', 400, 'VALIDATION_ERROR');
    }

    const validation = dealSchema.safeParse(body);
    if (!validation.success) {
      return jsonError(validation.error.issues[0]?.message || 'Deal data is invalid.', 422, 'VALIDATION_ERROR');
    }
    await connectToDatabase();

    const organizationId = new mongoose.Types.ObjectId(currentUser.organizationId);
    const { customerId, assignedToId } = validation.data;
    if (customerId) {
      if (!mongoose.isValidObjectId(customerId) || !await Customer.exists({ _id: customerId, organizationId })) {
        return jsonError('Customer must belong to the current organization.', 422, 'VALIDATION_ERROR');
      }
    }
    if (assignedToId) {
      if (!mongoose.isValidObjectId(assignedToId) || !await User.exists({ _id: assignedToId, organizationId })) {
        return jsonError('Assigned user must belong to the current organization.', 422, 'VALIDATION_ERROR');
      }
    }

    const createdAt = new Date();
    const stage = validation.data.stage;
    const status = stage === 'WON' ? 'WON' : stage === 'LOST' ? 'LOST' : 'OPEN';
    const deal = await Deal.create({
      ...validation.data,
      customerId: customerId ? new mongoose.Types.ObjectId(customerId) : null,
      assignedToId: assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null,
      organizationId,
      status,
      probability: stage === 'WON' ? 100 : stage === 'LOST' ? 0 : validation.data.probability,
      stageEnteredAt: createdAt,
      lastActivityAt: createdAt,
      stageHistory: [{
        id: `stage_${new mongoose.Types.ObjectId().toString()}`,
        fromStage: null,
        toStage: stage,
        changedBy: currentUser.name || currentUser.email || 'Workspace user',
        changedAt: createdAt,
        timeInPreviousStageMs: 0,
      }],
      activities: [{
        id: `activity_${new mongoose.Types.ObjectId().toString()}`,
        type: 'CREATED',
        description: 'Deal created',
        user: currentUser.name || currentUser.email || 'Workspace user',
        relatedEntity: 'Deal',
        createdAt,
      }],
    });

    const created = await Deal.findOne({ _id: deal._id, organizationId })
      .populate('customerId', 'name company email phone organizationId')
      .populate('assignedToId', 'name email role organizationId')
      .lean();

    return NextResponse.json({ success: true, data: serializeDeal(created) }, { status: 201 });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    const message = error instanceof Error ? error.message : 'Failed to create deal.';
    return jsonError(message, statusCode, statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR');
  }
}
