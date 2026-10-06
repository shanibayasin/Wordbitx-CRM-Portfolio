import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Customer from '../../../../models/Customer.ts';
import Deal from '../../../../models/Deal.ts';
import User from '../../../../models/User.ts';
import { dealUpdateSchema } from '../../../../lib/validations/dealSchema.ts';

type RouteContext = { params: Promise<{ id: string }> };
const noteSchema = z.object({
  id: z.string().min(1),
  content: z.string().max(10000),
  author: z.string().max(200),
  createdAt: z.coerce.date(),
});
const callSchema = z.object({
  id: z.string().min(1),
  date: z.coerce.date(),
  agent: z.string().max(200),
  type: z.enum(['Incoming', 'Outgoing', 'Missed', 'Callback']),
  duration: z.string().max(100),
  outcome: z.string().max(500),
  notes: z.string().max(10000),
});
const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().max(500),
  assignedToId: z.string().nullable().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.coerce.date().nullable().optional(),
  completed: z.boolean().optional(),
  notes: z.string().max(10000).optional(),
  createdAt: z.coerce.date().optional(),
});
const nestedUpdateSchema = z.object({
  dealNotes: z.array(noteSchema).max(500).optional(),
  calls: z.array(callSchema).max(1000).optional(),
  tasks: z.array(taskSchema).max(1000).optional(),
  orderHandoff: z.object({
    id: z.string().min(1),
    customerId: z.string().min(1),
    amount: z.number().min(0),
    currency: z.enum(['USD', 'CAD', 'EUR', 'GBP']),
    status: z.literal('DRAFT'),
    createdAt: z.coerce.date(),
  }).nullable().optional(),
});

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

function statusForStage(stage: string) {
  return stage === 'WON' ? 'WON' : stage === 'LOST' ? 'LOST' : 'OPEN';
}

async function getScopedDeal(id: string, organizationId: mongoose.Types.ObjectId) {
  return Deal.findOne({ _id: new mongoose.Types.ObjectId(id), organizationId })
    .populate('customerId', 'name company email phone organizationId')
    .populate('assignedToId', 'name email role organizationId')
    .lean();
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireOrganizationAuth();
    if (!canViewLeads(currentUser.role)) return jsonError('You do not have permission to view deals.', 403, 'FORBIDDEN');
    const { id } = await params;
    if (!mongoose.isValidObjectId(currentUser.organizationId) || !mongoose.isValidObjectId(id)) {
      return jsonError('Deal or organization id is invalid.', 400, 'VALIDATION_ERROR');
    }

    await connectToDatabase();
    const deal = await getScopedDeal(id, new mongoose.Types.ObjectId(currentUser.organizationId));
    if (!deal) return jsonError('Deal not found in the current organization.', 404, 'NOT_FOUND');
    return NextResponse.json({ success: true, data: serializeDeal(deal) });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    return jsonError(error instanceof Error ? error.message : 'Failed to load deal.', statusCode);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  return updateDeal(request, context);
}

export async function PUT(request: Request, context: RouteContext) {
  return updateDeal(request, context);
}

async function updateDeal(request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireOrganizationAuth();
    if (!canManageLeads(currentUser.role)) return jsonError('You do not have permission to update deals.', 403, 'FORBIDDEN');
    const { id } = await params;
    if (!mongoose.isValidObjectId(currentUser.organizationId) || !mongoose.isValidObjectId(id)) {
      return jsonError('Deal or organization id is invalid.', 400, 'VALIDATION_ERROR');
    }

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return jsonError('Request body is required.', 400, 'VALIDATION_ERROR');
    if ('organizationId' in body) return jsonError('organizationId is derived from the authenticated session and cannot be changed.', 400, 'VALIDATION_ERROR');
    const core = dealUpdateSchema.safeParse(body);
    const nested = nestedUpdateSchema.safeParse(body);
    if (!core.success || !nested.success) {
      const issue = !core.success ? core.error.issues[0] : !nested.success ? nested.error.issues[0] : null;
      return jsonError(issue?.message || 'Deal data is invalid.', 422, 'VALIDATION_ERROR');
    }

    const organizationId = new mongoose.Types.ObjectId(currentUser.organizationId);
    await connectToDatabase();
    const current = await Deal.findOne({ _id: new mongoose.Types.ObjectId(id), organizationId });
    if (!current) return jsonError('Deal not found in the current organization.', 404, 'NOT_FOUND');

    const customerId = core.data.customerId;
    if (customerId && (!mongoose.isValidObjectId(customerId) || !await Customer.exists({ _id: customerId, organizationId }))) {
      return jsonError('Customer must belong to the current organization.', 422, 'VALIDATION_ERROR');
    }
    const assignedToId = core.data.assignedToId;
    if (assignedToId && (!mongoose.isValidObjectId(assignedToId) || !await User.exists({ _id: assignedToId, organizationId }))) {
      return jsonError('Assigned user must belong to the current organization.', 422, 'VALIDATION_ERROR');
    }
    const taskAssigneeIds = (nested.data.tasks || [])
      .map((task) => task.assignedToId)
      .filter((value): value is string => Boolean(value));
    if (taskAssigneeIds.some((value) => !mongoose.isValidObjectId(value))) {
      return jsonError('A deal task has an invalid assigned user id.', 422, 'VALIDATION_ERROR');
    }
    if (taskAssigneeIds.length && await User.countDocuments({
      _id: { $in: taskAssigneeIds.map((value) => new mongoose.Types.ObjectId(value)) },
      organizationId,
    }) !== new Set(taskAssigneeIds).size) {
      return jsonError('Deal task assignees must belong to the current organization.', 422, 'VALIDATION_ERROR');
    }
    const handoffCustomerId = nested.data.orderHandoff?.customerId;
    if (handoffCustomerId && (!mongoose.isValidObjectId(handoffCustomerId) || !await Customer.exists({ _id: handoffCustomerId, organizationId }))) {
      return jsonError('Order handoff customer must belong to the current organization.', 422, 'VALIDATION_ERROR');
    }

    const changedAt = new Date();
    const reopenClosedDeal = core.data.status === 'OPEN' && !core.data.stage && ['WON', 'LOST'].includes(current.stage);
    const nextStage = core.data.stage || (reopenClosedDeal ? 'NEW' : undefined);
    const update: Record<string, unknown> = { ...core.data, ...nested.data, updatedAt: changedAt, lastActivityAt: changedAt };
    if (reopenClosedDeal) {
      update.stage = 'NEW';
      update.probability = 50;
    }
    if (customerId !== undefined) update.customerId = customerId ? new mongoose.Types.ObjectId(customerId) : null;
    if (assignedToId !== undefined) update.assignedToId = assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null;
    if (nextStage && nextStage !== current.stage) {
      const stage = nextStage;
      const actor = currentUser.name || currentUser.email || 'Workspace user';
      update.status = statusForStage(stage);
      if (stage === 'WON') update.probability = 100;
      if (stage === 'LOST') update.probability = 0;
      update.stageEnteredAt = changedAt;
      update.stageHistory = [...(current.stageHistory || []), {
        id: `stage_${new mongoose.Types.ObjectId().toString()}`,
        fromStage: current.stage,
        toStage: stage,
        changedBy: actor,
        changedAt,
        timeInPreviousStageMs: Math.max(0, changedAt.getTime() - new Date(current.stageEnteredAt || current.updatedAt || current.createdAt).getTime()),
        lossReason: core.data.lossReason || null,
        lossNotes: core.data.lossNotes || null,
      }];
      update.activities = [{
        id: `activity_${new mongoose.Types.ObjectId().toString()}`,
        type: stage === 'WON' ? 'WON' : stage === 'LOST' ? 'LOST' : 'STAGE_CHANGED',
        description: stage === 'LOST' ? `Deal marked lost: ${core.data.lossReason}` : stage === 'WON' ? 'Deal marked won' : `Deal moved from ${current.stage} to ${stage}`,
        user: actor,
        relatedEntity: 'Stage',
        createdAt: changedAt,
      }, ...(current.activities || [])];
    }
    if (nested.data.dealNotes || nested.data.calls || nested.data.tasks || nested.data.orderHandoff !== undefined) {
      const actor = currentUser.name || currentUser.email || 'Workspace user';
      update.activities = [{
        id: `activity_${new mongoose.Types.ObjectId().toString()}`,
        type: nested.data.dealNotes ? 'NOTE_ADDED' : nested.data.calls ? 'CALL_COMPLETED' : nested.data.tasks ? 'TASK_CREATED' : 'UPDATED',
        description: nested.data.dealNotes ? 'Deal notes updated' : nested.data.calls ? 'Deal call log updated' : nested.data.tasks ? 'Deal tasks updated' : 'Order handoff updated',
        user: actor,
        relatedEntity: 'Deal',
        createdAt: changedAt,
      }, ...(Array.isArray(update.activities) ? update.activities : current.activities || [])];
    }
    if (Object.keys(core.data).length && !core.data.stage) {
      update.activities = [{
        id: `activity_${new mongoose.Types.ObjectId().toString()}`,
        type: 'UPDATED',
        description: 'Deal details updated',
        user: currentUser.name || currentUser.email || 'Workspace user',
        relatedEntity: 'Deal',
        createdAt: changedAt,
      }, ...(Array.isArray(update.activities) ? update.activities : current.activities || [])];
    }

    const updated = await Deal.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId },
      { $set: update },
      { new: true, runValidators: true }
    ).populate('customerId', 'name company email phone organizationId')
      .populate('assignedToId', 'name email role organizationId')
      .lean();
    if (!updated) return jsonError('Deal not found in the current organization.', 404, 'NOT_FOUND');
    return NextResponse.json({ success: true, data: serializeDeal(updated) });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    return jsonError(error instanceof Error ? error.message : 'Failed to update deal.', statusCode);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const currentUser = await requireOrganizationAuth();
    if (!canManageLeads(currentUser.role)) return jsonError('You do not have permission to delete deals.', 403, 'FORBIDDEN');
    const { id } = await params;
    if (!mongoose.isValidObjectId(currentUser.organizationId) || !mongoose.isValidObjectId(id)) {
      return jsonError('Deal or organization id is invalid.', 400, 'VALIDATION_ERROR');
    }

    await connectToDatabase();
    const result = await Deal.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(currentUser.organizationId),
    });
    if (!result.deletedCount) return jsonError('Deal not found in the current organization.', 404, 'NOT_FOUND');
    return NextResponse.json({ success: true, data: { id } });
  } catch (error) {
    const statusCode = (error as Error & { statusCode?: number }).statusCode ?? 500;
    return jsonError(error instanceof Error ? error.message : 'Failed to delete deal.', statusCode);
  }
}
