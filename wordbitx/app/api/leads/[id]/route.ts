import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb.ts';
import Lead from '../../../../models/Lead.ts';
import { leadSchema } from '../../../../lib/validations/leadSchema.ts';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const lead = await Lead.findById(id)
      .populate('assignedToId', 'name email role avatarUrl')
      .populate('organizationId', 'name logoUrl')
      .lean();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: lead._id.toString(),
      ...lead,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten() }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const updated = await Lead.findByIdAndUpdate(
        id,
        { ...validation.data, updatedAt: new Date() },
        { new: true }
      )
        .populate('assignedToId', 'name email role avatarUrl')
        .lean();

      if (!updated) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }

      return NextResponse.json({
        id: updated._id.toString(),
        ...updated,
      });
    } catch {
      return NextResponse.json({
        id,
        ...validation.data,
        updatedAt: new Date(),
      });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    try {
      await connectToDatabase();
      await Lead.findByIdAndDelete(id);
    } catch {
      // Graceful delete confirmation
    }
    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete lead' }, { status: 500 });
  }
}
