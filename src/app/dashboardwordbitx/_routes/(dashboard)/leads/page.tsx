'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeadForm } from '../../../components/leads/LeadForm.tsx';
import { LeadAdvancedTable } from '../../../components/leads/LeadAdvancedTable.tsx';
import { Lead, User } from '../../../types/index.ts';
import { toast } from '../../../components/ui/Sonner.tsx';
import { Button } from '../../../components/ui/Button.tsx';
import { Users, Plus, Target, CircleDollarSign, AlertTriangle, BriefcaseBusiness } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card.tsx';
import type { LeadFormValues } from '../../../lib/validations/leadSchema.ts';

function normalizeLeadRecord(value: Record<string, unknown>): Lead {
  return {
    id: String(value.id ?? value._id ?? ''),
    _id: typeof value._id === 'string' ? value._id : undefined,
    name: typeof value.name === 'string' ? value.name : 'Untitled Lead',
    firstName: typeof value.firstName === 'string' ? value.firstName : undefined,
    lastName: typeof value.lastName === 'string' ? value.lastName : undefined,
    company: typeof value.company === 'string' ? value.company : null,
    email: typeof value.email === 'string' ? value.email : null,
    phone: typeof value.phone === 'string' ? value.phone : null,
    alternatePhone: typeof value.alternatePhone === 'string' ? value.alternatePhone : null,
    source: typeof value.source === 'string' ? value.source : null,
    industry: typeof value.industry === 'string' ? value.industry : null,
    jobTitle: typeof value.jobTitle === 'string' ? value.jobTitle : null,
    companySize: typeof value.companySize === 'string' ? value.companySize : null,
    score: Number(value.score ?? 0),
    status: (value.status as Lead['status']) ?? 'NEW',
    priority: (value.priority as Lead['priority']) ?? 'MEDIUM',
    organizationId: typeof value.organizationId === 'string' ? value.organizationId : '',
    assignedToId: typeof value.assignedToId === 'string' ? value.assignedToId : null,
    assignedTo: null,
    assignedTeam: typeof value.assignedTeam === 'string' ? value.assignedTeam : null,
    assignedDealer: typeof value.assignedDealer === 'string' ? value.assignedDealer : null,
    nextFollowUp: value.nextFollowUp ? new Date(String(value.nextFollowUp)) : null,
    followUpType: typeof value.followUpType === 'string' ? value.followUpType : null,
    notes: typeof value.notes === 'string' ? value.notes : null,
    createdAt: value.createdAt ? new Date(String(value.createdAt)) : new Date(),
    updatedAt: value.updatedAt ? new Date(String(value.updatedAt)) : new Date(),
  };
}

function LeadStatsOverview({ leads }: { leads: Lead[] }) {
  const stats = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((lead) => lead.status === 'NEW').length;
    const qualified = leads.filter((lead) => lead.status === 'QUALIFIED').length;
    const converted = leads.filter((lead) => lead.status === 'CONVERTED').length;
    const lost = leads.filter((lead) => lead.status === 'LOST').length;
    const highPriority = leads.filter((lead) => lead.priority === 'HIGH' || lead.priority === 'URGENT').length;

    return [
      { title: 'Total Leads', value: total, trend: total === 0 ? '0%' : '+12.4%', icon: Users, tone: 'indigo' },
      { title: 'New Leads', value: newLeads, trend: newLeads === 0 ? '0%' : '+8.1%', icon: Plus, tone: 'emerald' },
      { title: 'Qualified Leads', value: qualified, trend: qualified === 0 ? '0%' : '+14.2%', icon: Target, tone: 'purple' },
      { title: 'Converted Leads', value: converted, trend: converted === 0 ? '0%' : '+7.8%', icon: CircleDollarSign, tone: 'amber' },
      { title: 'Lost Leads', value: lost, trend: lost === 0 ? '0%' : '-3.6%', icon: AlertTriangle, tone: 'rose' },
      { title: 'High Priority Leads', value: highPriority, trend: highPriority === 0 ? '0%' : '+9.3%', icon: BriefcaseBusiness, tone: 'sky' },
    ];
  }, [leads]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const toneMap = {
          indigo: 'bg-indigo-50 text-indigo-600',
          emerald: 'bg-emerald-50 text-emerald-600',
          purple: 'bg-purple-50 text-purple-600',
          amber: 'bg-amber-50 text-amber-600',
          rose: 'bg-rose-50 text-rose-600',
          sky: 'bg-sky-50 text-sky-600',
        };

        const positive = !item.trend.startsWith('-');

        return (
          <Card key={item.title} className="hover:border-slate-300 transition duration-150">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{item.title}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneMap[item.tone as keyof typeof toneMap]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-2xl font-bold tracking-tight text-slate-900">{item.value}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {item.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', { cache: 'no-store', signal });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Unable to load leads.');
      }

      const nextLeads = Array.isArray(payload?.data) ? payload.data.map((item) => normalizeLeadRecord(item as Record<string, unknown>)) : [];
      setLeads(nextLeads);
      setUsers((prev) => prev.length > 0 ? prev : []);
    } catch (loadError) {
      if (signal?.aborted) return;
      const message = loadError instanceof Error ? loadError.message : 'Unable to load leads.';
      setError(message);
      toast.error(message);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => {
      if (!controller.signal.aborted) void loadLeads(controller.signal);
    });
    return () => controller.abort();
  }, [loadLeads]);

  const handleAddLead = () => {
    setSelectedLead(null);
    setIsFormOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsFormOpen(true);
  };

  const handleDeleteLead = async (id: string) => {
    const confirmed = window.confirm('Delete this lead?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Unable to delete lead.');
      }

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      toast.success('Lead removed successfully');
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'Unable to delete lead.';
      toast.error(message);
    }
  };

  const handleSubmitLead = async (data: LeadFormValues) => {
    const isEditing = Boolean(selectedLead);
    const response = await fetch(isEditing ? `/api/leads/${selectedLead!.id}` : '/api/leads', {
      method: isEditing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload?.error?.message || payload?.error || payload?.issues || 'Unable to save lead.';
      throw new Error(typeof message === 'string' ? message : 'Unable to save lead.');
    }

    const nextLead = normalizeLeadRecord((payload?.data ?? payload) as Record<string, unknown>);
    setLeads((prev) => {
      if (isEditing && selectedLead) {
        return prev.map((lead) => (lead.id === selectedLead.id ? nextLead : lead));
      }
      return [nextLead, ...prev.filter((lead) => lead.id !== nextLead.id)];
    });

    toast.success(isEditing ? 'Lead updated successfully' : 'New lead created successfully');
    setIsFormOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Lead Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Qualification pipeline, follow-up management, and conversion velocity across sales teams.
          </p>
        </div>
        <Button onClick={handleAddLead} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          <div className="font-semibold">Unable to load leads</div>
          <div className="mt-1">{error}</div>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => void loadLeads()}>
            Retry
          </Button>
        </div>
      ) : null}

      <LeadStatsOverview leads={leads} />

      <LeadAdvancedTable
        leads={leads}
        users={users}
        isLoading={isLoading}
        onAddLead={handleAddLead}
        onEditLead={handleEditLead}
        onDeleteLead={handleDeleteLead}
        onViewLead={(id) => router.push(`/leads/${id}`)}
        onConvertLead={(lead) => router.push(`/pipeline?convertLead=${lead.id}`)}
      />

      <LeadForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmitLead}
        lead={selectedLead}
        users={users}
      />
    </div>
  );
}
