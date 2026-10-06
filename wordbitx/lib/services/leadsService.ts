import { z } from 'zod';
import type { Lead, User } from '../../types/index.ts';
import type { LeadFormValues } from '../validations/leadSchema.ts';

const leadSchema = z.object({
  id: z.string().min(1),
  organizationId: z.string().min(1),
  name: z.string(),
  company: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  score: z.number().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST', 'FOLLOW_UP']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedToId: z.string().nullable().optional(),
  assignedTeam: z.string().nullable().optional(),
  assignedDealer: z.string().nullable().optional(),
  nextFollowUp: z.string().nullable().optional(),
  followUpType: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).passthrough();

const leadsResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(leadSchema),
});

const leadResponseSchema = z.object({
  success: z.literal(true),
  data: leadSchema,
});

const usersResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(z.object({
    id: z.string().min(1),
    name: z.string(),
    email: z.string(),
    role: z.enum([
      'SUPER_ADMIN',
      'ORGANIZATION_OWNER',
      'ORGANIZATION_ADMIN',
      'SALES_MANAGER',
      'SALES_AGENT',
      'VIEWER',
      'ADMIN',
      'SALES',
      'SUPPORT',
      'AGENT',
    ]),
    organizationId: z.string().min(1),
    createdAt: z.string(),
  })),
});

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object' || !('error' in payload)) return fallback;
  const error = payload.error;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return fallback;
}

export async function getLeads(signal?: AbortSignal): Promise<Lead[]> {
  const response = await fetch('/api/leads?limit=100', {
    cache: 'no-store',
    signal,
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'Unable to load workspace leads.'));
  }

  const result = leadsResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('The workspace leads response was invalid.');
  }

  return result.data.data.map((lead) => ({
    ...lead,
    company: lead.company ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    source: lead.source ?? null,
    score: lead.score ?? 0,
    assignedToId: lead.assignedToId ?? null,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  }));
}

export async function getLeadAssignees(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch('/api/users', { cache: 'no-store', signal });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'Unable to load workspace team members.'));
  }

  const result = usersResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('The workspace users response was invalid.');
  }

  return result.data.data;
}

export async function updateLead(id: string, data: LeadFormValues): Promise<Lead> {
  const response = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'Unable to update this lead.'));
  }

  const result = leadResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('The updated lead response was invalid.');
  }

  const lead = result.data.data;
  return {
    ...lead,
    company: lead.company ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    source: lead.source ?? null,
    score: lead.score ?? 0,
    assignedToId: lead.assignedToId ?? null,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  };
}

export async function createLead(data: LeadFormValues): Promise<Lead> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'Unable to create this lead.'));
  }

  const result = leadResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error('The created lead response was invalid.');
  }

  const lead = result.data.data;
  return {
    ...lead,
    company: lead.company ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    source: lead.source ?? null,
    score: lead.score ?? 0,
    assignedToId: lead.assignedToId ?? null,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  };
}

export async function deleteLead(id: string): Promise<void> {
  const response = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'Unable to delete this lead.'));
  }
}
