'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card.tsx';
import { Button } from '../../../../components/ui/Button.tsx';
import { Badge } from '../../../../components/ui/Badge.tsx';
import { ArrowLeft, Mail, Phone, Calendar, UserCheck, ExternalLink } from 'lucide-react';
import { formatDate } from '../../../../lib/utils.ts';
import type { Lead } from '../../../../types/index.ts';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLead = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/leads/${id}`, { cache: 'no-store' });
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.error?.message || payload?.error || 'Unable to load lead details.');
        }

        const nextLead = payload?.data ?? payload;
        setLead({
          id: String(nextLead.id ?? nextLead._id ?? id),
          name: nextLead.name ?? 'Untitled Lead',
          email: nextLead.email ?? null,
          phone: nextLead.phone ?? null,
          source: nextLead.source ?? null,
          score: Number(nextLead.score ?? 0),
          status: nextLead.status ?? 'NEW',
          organizationId: nextLead.organizationId ?? '',
          assignedToId: nextLead.assignedToId ?? null,
          company: nextLead.company ?? null,
          priority: nextLead.priority ?? 'MEDIUM',
          notes: nextLead.notes ?? null,
          createdAt: nextLead.createdAt ?? new Date(),
          updatedAt: nextLead.updatedAt ?? new Date(),
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load lead details.');
      } finally {
        setLoading(false);
      }
    };

    void loadLead();
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading lead details…</div>;
  }

  if (error || !lead) {
    return (
      <div className="max-w-5xl mx-auto rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        <div className="font-semibold">Unable to load lead</div>
        <div className="mt-1">{error || 'This lead could not be found.'}</div>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push('/leads')}>
          Back to leads
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push('/leads')} className="space-x-1.5">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Leads</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push('/pipeline')} className="space-x-1">
            <span>Convert to Deal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">{lead.name}</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Lead ID: {lead.id}</p>
            </div>
            <Badge variant="success">{lead.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{lead.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{lead.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Created {formatDate(lead.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <UserCheck className="h-4 w-4 text-slate-400" />
                <span>Assigned: {lead.assignedToId ? lead.assignedToId : 'Unassigned'}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Lead Notes & Context</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800">
                {lead.notes || 'No notes provided for this lead.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead Health & Scoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
              <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{lead.score}</span>
              <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">Outreach Propensity Score</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Acquisition Channel</span>
                <span className="font-semibold">{lead.source || '—'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Company</span>
                <span className="font-semibold">{lead.company || '—'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Tenant Isolation</span>
                <span className="font-semibold text-emerald-600">Enforced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
