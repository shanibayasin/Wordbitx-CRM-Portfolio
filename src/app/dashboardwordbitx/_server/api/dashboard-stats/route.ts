import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb.ts';
import { getCurrentUser } from '../../../lib/auth.ts';
import Customer from '../../../models/Customer.ts';
import Deal from '../../../models/Deal.ts';
import Lead from '../../../models/Lead.ts';
import Order from '../../../models/Order.ts';
import Task from '../../../models/Task.ts';
import Ticket from '../../../models/Ticket.ts';
import type { DashboardStats, DealStage } from '../../../types/index.ts';

type DealDashboardAggregate = {
  stageTotals: Array<{ _id: DealStage; count: number; totalValue: number }>;
  totals: Array<{
    activeDealsCount: number;
    activeDealsValue: number;
    revenueTotal: number;
    closedDealsCount: number;
    wonDealsCount: number;
  }>;
  monthlyRevenue: Array<{ _id: string; revenue: number; dealsWon: number }>;
  recentDeals: Array<{
    _id: mongoose.Types.ObjectId;
    title: string;
    value: number;
    stage: DealStage;
    updatedAt: Date;
  }>;
  callCount: Array<{ total: number }>;
  activities: Array<{
    _id: mongoose.Types.ObjectId;
    activityId?: string;
    title: string;
    description: string;
    user?: string;
    occurredAt: Date;
  }>;
};

type CustomerDashboardAggregate = {
  callCount: Array<{ total: number }>;
  recentCalls: Array<{
    _id: mongoose.Types.ObjectId;
    callId?: string;
    name: string;
    callType?: string;
    duration?: string;
    outcome?: string;
    notes?: string;
    agent?: string;
    occurredAt: Date;
  }>;
  recentNotes: Array<{
    _id: mongoose.Types.ObjectId;
    noteId?: string;
    name: string;
    content?: string;
    author?: string;
    occurredAt: Date;
  }>;
};

type OrderActivity = {
  _id: mongoose.Types.ObjectId;
  activityId?: string;
  description: string;
  user?: string;
  occurredAt: Date;
};

function toIsoString(value: Date | string): string {
  return new Date(value).toISOString();
}

function getCustomerLabel(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null;
  const customer = value as { name?: unknown; company?: unknown };
  if (typeof customer.company === 'string' && customer.company.trim()) return customer.company;
  return typeof customer.name === 'string' && customer.name.trim() ? customer.name : null;
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    const currentOrganizationId = currentUser.organizationId;
    if (!currentOrganizationId || !mongoose.isValidObjectId(currentOrganizationId)) {
      return NextResponse.json({ error: 'The current workspace is invalid.' }, { status: 403 });
    }

    await connectToDatabase();
    const organizationId = new mongoose.Types.ObjectId(currentOrganizationId);
    const now = new Date();
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const firstMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1));
    const stages: DealStage[] = ['NEW', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

    const [
      totalLeads,
      convertedLeads,
      totalContacts,
      dueToday,
      recentDemoLeads,
      dealResults,
      customerResults,
      orderActivities,
      ticketResults,
    ] = await Promise.all([
      Lead.countDocuments({ organizationId }),
      Lead.countDocuments({ organizationId, status: 'CONVERTED' }),
      Customer.countDocuments({ organizationId }),
      Task.countDocuments({
        organizationId,
        completed: false,
        dueDate: { $gte: todayStart, $lt: tomorrowStart },
      }),
      Lead.find({ organizationId, source: 'website-demo' })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('_id name company email notes createdAt')
        .lean(),
      Deal.aggregate<DealDashboardAggregate>([
        { $match: { organizationId } },
        {
          $facet: {
            stageTotals: [
              { $group: { _id: '$stage', count: { $sum: 1 }, totalValue: { $sum: '$value' } } },
            ],
            totals: [
              {
                $group: {
                  _id: null,
                  activeDealsCount: {
                    $sum: { $cond: [{ $in: ['$stage', ['WON', 'LOST']] }, 0, 1] },
                  },
                  activeDealsValue: {
                    $sum: { $cond: [{ $in: ['$stage', ['WON', 'LOST']] }, 0, '$value'] },
                  },
                  revenueTotal: { $sum: { $cond: [{ $eq: ['$stage', 'WON'] }, '$value', 0] } },
                  closedDealsCount: {
                    $sum: { $cond: [{ $in: ['$stage', ['WON', 'LOST']] }, 1, 0] },
                  },
                  wonDealsCount: { $sum: { $cond: [{ $eq: ['$stage', 'WON'] }, 1, 0] } },
                },
              },
              {
                $project: {
                  _id: 0,
                  activeDealsCount: 1,
                  activeDealsValue: 1,
                  revenueTotal: 1,
                  closedDealsCount: 1,
                  wonDealsCount: 1,
                },
              },
            ],
            monthlyRevenue: [
              { $match: { stage: 'WON', updatedAt: { $gte: firstMonth } } },
              {
                $group: {
                  _id: { $dateToString: { format: '%Y-%m', date: '$updatedAt', timezone: 'UTC' } },
                  revenue: { $sum: '$value' },
                  dealsWon: { $sum: 1 },
                },
              },
            ],
            recentDeals: [
              { $sort: { updatedAt: -1 } },
              { $limit: 3 },
              { $project: { title: 1, value: 1, stage: 1, updatedAt: 1 } },
            ],
            callCount: [
              { $unwind: '$calls' },
              { $count: 'total' },
            ],
            activities: [
              { $unwind: '$activities' },
              { $sort: { 'activities.createdAt': -1 } },
              { $limit: 10 },
              {
                $project: {
                  activityId: '$activities.id',
                  title: '$title',
                  description: '$activities.description',
                  user: '$activities.user',
                  occurredAt: '$activities.createdAt',
                },
              },
            ],
          },
        },
      ]),
      Customer.aggregate<CustomerDashboardAggregate>([
        { $match: { organizationId } },
        {
          $facet: {
            callCount: [
              { $unwind: '$calls' },
              { $count: 'total' },
            ],
            recentCalls: [
              { $unwind: '$calls' },
              { $sort: { 'calls.date': -1 } },
              { $limit: 10 },
              {
                $project: {
                  callId: '$calls.id',
                  name: 1,
                  callType: '$calls.type',
                  duration: '$calls.duration',
                  outcome: '$calls.outcome',
                  notes: '$calls.notes',
                  agent: '$calls.agent',
                  occurredAt: '$calls.date',
                },
              },
            ],
            recentNotes: [
              { $unwind: '$customerNotes' },
              { $sort: { 'customerNotes.createdAt': -1 } },
              { $limit: 10 },
              {
                $project: {
                  noteId: '$customerNotes.id',
                  name: 1,
                  content: '$customerNotes.content',
                  author: '$customerNotes.author',
                  occurredAt: '$customerNotes.createdAt',
                },
              },
            ],
          },
        },
      ]),
      Order.aggregate<OrderActivity>([
        { $match: { organizationId } },
        { $unwind: '$activities' },
        { $sort: { 'activities.createdAt': -1 } },
        { $limit: 10 },
        {
          $project: {
            activityId: '$activities.id',
            description: '$activities.description',
            user: '$activities.user',
            occurredAt: '$activities.createdAt',
          },
        },
      ]),
      Ticket.find({
        organizationId,
        status: { $in: ['OPEN', 'IN_PROGRESS', 'WAITING'] },
        priority: { $in: ['URGENT', 'HIGH'] },
      })
        .populate('customerId', 'name company')
        .sort({ updatedAt: -1 })
        .limit(3)
        .lean(),
    ]);

    const dealStats = dealResults[0];
    const customerStats = customerResults[0];
    const dealTotals = dealStats?.totals[0];
    const revenueByMonth = new Map(
      (dealStats?.monthlyRevenue ?? []).map((month) => [month._id, month]),
    );
    const monthlyRevenue = Array.from({ length: 6 }, (_, index) => {
      const monthDate = new Date(Date.UTC(firstMonth.getUTCFullYear(), firstMonth.getUTCMonth() + index, 1));
      const key = `${monthDate.getUTCFullYear()}-${String(monthDate.getUTCMonth() + 1).padStart(2, '0')}`;
      const month = revenueByMonth.get(key);
      return {
        month: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(monthDate),
        revenue: month?.revenue ?? 0,
        dealsWon: month?.dealsWon ?? 0,
      };
    });

    const activities: DashboardStats['recentActivities'] = [
      ...recentDemoLeads.map((lead) => ({
        id: `demo-${lead._id.toString()}`,
        type: 'lead' as const,
        title: `Demo request · ${lead.name}`,
        description: [lead.company, lead.email, lead.notes?.split('\n')[0]]
          .filter(Boolean)
          .join(' · ') || 'New website demo request',
        user: null,
        occurredAt: toIsoString(lead.createdAt),
        href: `/leads/${lead._id.toString()}`,
      })),
      ...(dealStats?.activities ?? []).map((activity) => ({
        id: activity.activityId || `${activity._id.toString()}-${activity.occurredAt.getTime()}`,
        type: 'deal' as const,
        title: activity.title,
        description: activity.description || 'Deal updated',
        user: activity.user || null,
        occurredAt: toIsoString(activity.occurredAt),
        href: `/deals/${activity._id.toString()}`,
      })),
      ...(customerStats?.recentCalls ?? []).map((call) => ({
        id: call.callId || `${call._id.toString()}-${call.occurredAt.getTime()}`,
        type: 'call' as const,
        title: `${call.callType || 'Recorded'} call · ${call.name}`,
        description: call.notes || call.outcome || call.duration || 'Call recorded',
        user: call.agent || null,
        occurredAt: toIsoString(call.occurredAt),
        href: `/customers/${call._id.toString()}`,
      })),
      ...(customerStats?.recentNotes ?? []).map((note) => ({
        id: note.noteId || `${note._id.toString()}-${note.occurredAt.getTime()}`,
        type: 'note' as const,
        title: `Customer note · ${note.name}`,
        description: note.content || 'Customer note added',
        user: note.author || null,
        occurredAt: toIsoString(note.occurredAt),
        href: `/customers/${note._id.toString()}`,
      })),
      ...orderActivities.map((activity) => ({
        id: activity.activityId || `${activity._id.toString()}-${activity.occurredAt.getTime()}`,
        type: 'order' as const,
        title: 'Order activity',
        description: activity.description || 'Order updated',
        user: activity.user || null,
        occurredAt: toIsoString(activity.occurredAt),
        href: `/orders/${activity._id.toString()}`,
      })),
    ];

    const stats: DashboardStats = {
      workspace: {
        organizationId: currentOrganizationId,
        organizationName: currentUser.organizationName ?? null,
        user: {
          name: currentUser.name ?? null,
          email: currentUser.email ?? null,
          role: currentUser.role ?? null,
        },
      },
      totalLeads,
      totalContacts,
      activeDealsCount: dealTotals?.activeDealsCount ?? 0,
      activeDealsValue: dealTotals?.activeDealsValue ?? 0,
      revenueTotal: dealTotals?.revenueTotal ?? 0,
      closedDealsCount: dealTotals?.closedDealsCount ?? 0,
      wonDealsCount: dealTotals?.wonDealsCount ?? 0,
      averageDealSize: dealTotals?.wonDealsCount
        ? (dealTotals.revenueTotal ?? 0) / dealTotals.wonDealsCount
        : 0,
      callsCount: (dealStats?.callCount[0]?.total ?? 0) + (customerStats?.callCount[0]?.total ?? 0),
      tasksDueToday: dueToday,
      conversionRate: totalLeads === 0 ? 0 : Number(((convertedLeads / totalLeads) * 100).toFixed(1)),
      monthlyRevenue,
      dealsByStage: stages.map((stage) => {
        const stageStats = dealStats?.stageTotals.find((item) => item._id === stage);
        return { stage, count: stageStats?.count ?? 0, totalValue: stageStats?.totalValue ?? 0 };
      }),
      recentDeals: (dealStats?.recentDeals ?? []).map((deal) => ({
        id: deal._id.toString(),
        title: deal.title,
        value: deal.value,
        stage: deal.stage,
        updatedAt: toIsoString(deal.updatedAt),
      })),
      urgentTickets: ticketResults.map((ticket) => ({
        id: ticket._id.toString(),
        subject: ticket.subject,
        priority: ticket.priority,
        customer: getCustomerLabel(ticket.customerId),
        updatedAt: toIsoString(ticket.updatedAt),
      })),
      recentActivities: activities
        .sort((left, right) => Date.parse(right.occurredAt) - Date.parse(left.occurredAt))
        .slice(0, 8),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch dashboard stats.' },
      { status: 500 },
    );
  }
}
