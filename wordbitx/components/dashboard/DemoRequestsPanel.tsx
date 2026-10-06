'use client';

import { useCallback, useEffect, useState } from 'react';
import { BellRing, Building2, CalendarClock, Mail, Phone, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog.tsx';
import { Select } from '../ui/Select.tsx';

type RequestStatus = 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED';

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  role: string;
  features: string[];
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<RequestStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
};

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string') {
    return payload.error;
  }
  return fallback;
}

export function DemoRequestsPanel() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [selected, setSelected] = useState<DemoRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const loadRequests = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/admin/demo-requests', { cache: 'no-store', signal });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, 'Unable to load demo requests.'));
      }
      if (!payload || typeof payload !== 'object' || !('data' in payload) || !Array.isArray(payload.data)) {
        throw new Error('The demo request response was invalid.');
      }

      const data = payload.data as DemoRequest[];
      setRequests(data);
      setSelected((current) => current ? data.find((request) => request.id === current.id) ?? current : null);
      setError('');
    } catch (loadError) {
      if (signal?.aborted) return;
      setError(loadError instanceof Error ? loadError.message : 'Unable to load demo requests.');
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        return loadRequests(controller.signal);
      }
    });
    const interval = window.setInterval(() => void loadRequests(), 30_000);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadRequests]);

  const updateStatus = async (status: RequestStatus) => {
    if (!selected) return;
    setIsUpdating(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/demo-requests/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, 'Unable to update this demo request.'));
      }
      await loadRequests();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update this demo request.');
    } finally {
      setIsUpdating(false);
    }
  };

  const newCount = requests.filter((request) => request.status === 'NEW').length;

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-indigo-600" />
              Demo requests
              {newCount > 0 && <Badge variant="warning">{newCount} new</Badge>}
            </CardTitle>
            <CardDescription>New website demo requests for this workspace.</CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Refresh demo requests"
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              void loadRequests();
            }}
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="max-h-96 space-y-3 overflow-y-auto">
          {error && (
            <div role="alert" className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              <span>{error}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => void loadRequests()}>
                Try again
              </Button>
            </div>
          )}
          {isLoading ? (
            <p className="py-5 text-center text-sm text-slate-500">Loading demo requests…</p>
          ) : requests.length === 0 ? (
            <p className="py-5 text-center text-sm text-slate-500">No demo requests have arrived yet.</p>
          ) : (
            requests.map((request) => (
              <button
                type="button"
                key={request.id}
                onClick={() => setSelected(request)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {request.name} · {request.company}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {request.preferredDate} at {request.preferredTime} · {request.email}
                  </span>
                </span>
                <Badge variant={request.status === 'NEW' ? 'warning' : 'secondary'}>{statusLabels[request.status]}</Badge>
              </button>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        {selected && (
          <DialogContent>
            <DialogHeader onClose={() => setSelected(null)}>
              <DialogTitle>Demo request from {selected.name}</DialogTitle>
              <DialogDescription>Received {new Date(selected.createdAt).toLocaleString()}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><span className="break-all">{selected.email}</span></div>
              <div className="flex items-start gap-2"><Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><span>{selected.company}</span></div>
              <div className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><span>{selected.phone || 'No phone provided'}</span></div>
              <div className="flex items-start gap-2"><CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><span>{selected.preferredDate} at {selected.preferredTime}</span></div>
              <div><span className="font-semibold">Team size:</span> {selected.teamSize}</div>
              <div><span className="font-semibold">Role:</span> {selected.role || 'Not provided'}</div>
              <div className="sm:col-span-2"><span className="font-semibold">Focus areas:</span> {selected.features.length ? selected.features.join(', ') : 'None selected'}</div>
            </div>
            <section className="space-y-1">
              <h3 className="text-sm font-semibold">Message</h3>
              <p className="whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{selected.message}</p>
            </section>
            <div className="space-y-2">
              <label htmlFor="demo-request-status" className="text-sm font-semibold">Request status</label>
              <Select
                id="demo-request-status"
                value={selected.status}
                disabled={isUpdating}
                onChange={(event) => void updateStatus(event.target.value as RequestStatus)}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
              {isUpdating && <p className="text-xs text-slate-500">Saving status…</p>}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
