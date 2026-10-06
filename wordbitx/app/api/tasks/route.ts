import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../lib/mongodb.ts';
import { canManageLeads, canViewLeads, requireOrganizationAuth } from '../../../lib/auth.ts';
import Task from '../../../models/Task.ts';
import User from '../../../models/User.ts';

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Due date is invalid.').nullable().optional(),
  completed: z.boolean().optional(),
  assignedToId: z.string().nullable().optional(),
}).strict();

function errorResponse(error: unknown, fallback: string) {
  const status = (error as Error & { statusCode?: number }).statusCode ?? 500;
  return NextResponse.json({ error: error instanceof Error ? error.message : fallback }, { status });
}

export async function GET() {
  try {
    const user = await requireOrganizationAuth();
    if (!canViewLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to view tasks.' }, { status: 403 });
    }
    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(user.organizationId);
    const tasks = await Task.find({ organizationId })
      .populate<{ assignedToId: { _id: mongoose.Types.ObjectId; name: string; email: string; role: string; avatarUrl?: string | null } | null }>(
        'assignedToId',
        'name email role avatarUrl'
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      dueDate: task.dueDate,
      completed: task.completed,
      organizationId: task.organizationId.toString(),
      assignedToId: task.assignedToId?._id?.toString() ?? null,
      assignedTo: task.assignedToId ?? null,
      createdAt: task.createdAt,
    })));
  } catch (error) {
    return errorResponse(error, 'Failed to fetch tasks.');
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireOrganizationAuth();
    if (!canManageLeads(user.role)) {
      return NextResponse.json({ error: 'You do not have permission to create tasks.' }, { status: 403 });
    }
    const body: unknown = await request.json().catch(() => null);
    const validation = createTaskSchema.safeParse(body);
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
    const task = await Task.create({
      title: validation.data.title,
      dueDate: validation.data.dueDate ? new Date(validation.data.dueDate) : null,
      completed: validation.data.completed ?? false,
      assignedToId: assignedToId ? new mongoose.Types.ObjectId(assignedToId) : null,
      organizationId,
    });
    return NextResponse.json({
      id: task._id.toString(),
      title: task.title,
      dueDate: task.dueDate,
      completed: task.completed,
      organizationId: task.organizationId.toString(),
      assignedToId: task.assignedToId?.toString() ?? null,
      createdAt: task.createdAt,
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error, 'Failed to create task.');
  }
}
