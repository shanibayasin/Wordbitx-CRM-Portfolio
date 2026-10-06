import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../../lib/mongodb.ts';
import { canManageLeads, requireOrganizationAuth } from '../../../../lib/auth.ts';
import Task from '../../../../models/Task.ts';
import User from '../../../../models/User.ts';

const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Due date is invalid.').nullable().optional(),
  assignedToId: z.string().nullable().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, 'Provide at least one task field to update.');

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to update tasks.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Task id is invalid.' }, { status: 400 });
    }
    const body: unknown = await request.json().catch(() => null);
    const validation = updateTaskSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0]?.message ?? 'Task data is invalid.' }, { status: 422 });
    }

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const assignedToId = validation.data.assignedToId;
    if (assignedToId && (!mongoose.isValidObjectId(assignedToId) ||
      !await User.exists({ _id: assignedToId, organizationId }))) {
      return NextResponse.json({ error: 'Assigned user does not belong to this workspace.' }, { status: 422 });
    }

    const update = {
      ...validation.data,
      ...(validation.data.dueDate !== undefined && {
        dueDate: validation.data.dueDate ? new Date(validation.data.dueDate) : null,
      }),
      ...(assignedToId !== undefined && {
        assignedToId: assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null,
      }),
    };
    const updated = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), organizationId },
      update,
      { new: true, runValidators: true }
    ).populate<{ assignedToId: { _id: mongoose.Types.ObjectId; name: string; email: string; role: string; avatarUrl?: string | null } | null }>(
      'assignedToId',
      'name email role avatarUrl'
    ).lean();
    if (!updated) {
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
    }
    return NextResponse.json({
      id: updated._id.toString(),
      title: updated.title,
      dueDate: updated.dueDate,
      completed: updated.completed,
      organizationId: updated.organizationId.toString(),
      assignedToId: updated.assignedToId?._id?.toString() ?? null,
      assignedTo: updated.assignedToId ?? null,
      createdAt: updated.createdAt,
    });
  } catch (error) {
    return errorResponse(error, 'Failed to update task.');
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to delete tasks.' }, { status: 403 });
    }
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Task id is invalid.' }, { status: 400 });
    }
    await connectToDatabase();
    const deleted = await Task.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      organizationId: new mongoose.Types.ObjectId(user.organizationId),
    });
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return errorResponse(error, 'Failed to delete task.');
  }
}
