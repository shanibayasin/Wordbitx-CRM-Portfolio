import { z } from 'zod';
import type { Customer, Deal, User } from '../../types/index.ts';
import type { DealFormValues } from '../validations/dealSchema.ts';

const dealSchema = z.object({
  id: z.string().min(1),
  organizationId: z.string().min(1),
  title: z.string(),
  value: z.number(),
  stage: z.enum(['NEW', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']),
  probability: z.number(),
  status: z.enum(['OPEN', 'WON', 'LOST']).optional(),
  assignedToId: z.string().nullable().optional(),
  customerId: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).passthrough();

const customerSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  organizationId: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  email: z.string(),
  role: z.enum(['ADMIN', 'SALES', 'SUPPORT', 'AGENT']),
  organizationId: z.string().min(1),
  createdAt: z.string(),
});

const workspaceSchema = z.object({
  success: z.literal(true),
  data: z.object({
    currentUserId: z.string().min(1),
    deals: z.array(dealSchema),
    customers: z.array(customerSchema),
    users: z.array(userSchema),
    leadCount: z.number().int().nonnegative(),
  }),
});

const dealResponseSchema = z.object({ success: z.literal(true), data: dealSchema });
const dealListResponseSchema = z.object({ success: z.literal(true), data: z.array(dealSchema) });

function errorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object' || !('error' in payload)) return fallback;
  const error = payload.error;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') return error.message;
  return fallback;
}

function normalizeDeal(deal: z.infer<typeof dealSchema>): Deal {
  return {
    ...deal,
    company: deal.company ?? null,
    currency: deal.currency ?? 'USD',
    priority: deal.priority ?? 'MEDIUM',
    assignedToId: deal.assignedToId ?? null,
    customerId: deal.customerId ?? null,
    createdAt: deal.createdAt,
    updatedAt: deal.updatedAt,
  } as Deal;
}

export type PipelineWorkspace = {
  currentUserId: string;
  deals: Deal[];
  customers: Customer[];
  users: User[];
  leadCount: number;
};

export async function getPipelineWorkspace(signal?: AbortSignal): Promise<PipelineWorkspace> {
  const response = await fetch('/api/pipeline', { cache: 'no-store', signal });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(errorMessage(payload, 'Unable to load pipeline workspace.'));
  const result = workspaceSchema.safeParse(payload);
  if (!result.success) throw new Error('The pipeline workspace response was invalid.');
  return {
    currentUserId: result.data.data.currentUserId,
    deals: result.data.data.deals.map(normalizeDeal),
    customers: result.data.data.customers.map((customer) => ({
      ...customer,
      company: customer.company ?? null,
      email: customer.email ?? null,
      phone: customer.phone ?? null,
    })),
    users: result.data.data.users,
    leadCount: result.data.data.leadCount,
  };
}

async function requestDeal(path: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown): Promise<Deal | null> {
  const response = await fetch(path, {
    method,
    ...(body === undefined ? {} : {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(errorMessage(payload, 'Unable to save this deal.'));
  if (method === 'DELETE') return null;
  const result = dealResponseSchema.safeParse(payload);
  if (!result.success) throw new Error('The deal response was invalid.');
  return normalizeDeal(result.data.data);
}

export async function createWorkspaceDeal(
  data: Pick<DealFormValues, 'title' | 'value' | 'stage' | 'probability'> & Partial<DealFormValues>
): Promise<Deal> {
  const deal = await requestDeal('/api/deals', 'POST', data);
  if (!deal) throw new Error('The created deal response was empty.');
  return deal;
}

export async function updateWorkspaceDeal(id: string, data: Partial<Deal>): Promise<Deal> {
  const deal = await requestDeal(`/api/deals/${encodeURIComponent(id)}`, 'PATCH', data);
  if (!deal) throw new Error('The updated deal response was empty.');
  return deal;
}

export async function deleteWorkspaceDeal(id: string): Promise<void> {
  await requestDeal(`/api/deals/${encodeURIComponent(id)}`, 'DELETE');
}

export async function updateWorkspaceDeals(ids: string[], updates: Partial<Deal>): Promise<Deal[]> {
  const results = await Promise.all(ids.map((id) => updateWorkspaceDeal(id, updates)));
  return results;
}

export async function getWorkspaceDeals(signal?: AbortSignal): Promise<Deal[]> {
  const response = await fetch('/api/deals', { cache: 'no-store', signal });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(errorMessage(payload, 'Unable to load workspace deals.'));
  const result = dealListResponseSchema.safeParse(payload);
  if (!result.success) throw new Error('The deals response was invalid.');
  return result.data.data.map(normalizeDeal);
}
