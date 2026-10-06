'use client';

import { useCallback, useEffect, useState } from 'react';
import { Building2, CircleCheck, CircleX, Mail, RefreshCw, UserRound } from 'lucide-react';
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

type WorkspaceRequestStatus = 'NEW' | 'INVITE_PENDING' | 'INVITE_SENT' | 'REJECTED' | 'COMPLETED';

interface WorkspaceRequest {
  id: string;
  name: string;
  email: string;
  companyName: string;
  status: WorkspaceRequestStatus;
  createdAt: string;
  approvedAt: string | null;
  completedAt: string | null;
}

const statusLabels: Record<WorkspaceRequestStatus, string> = {
  NEW: 'New request',
  INVITE_PENDING: 'Invite needs retry',
  INVITE_SENT: 'Invite sent',
  REJECTED: 'Rejected',
  COMPLETED: 'Workspace active',
};

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string') {
    return payload.error;
  }
  return fallback;
}

export function WorkspaceRequestsPanel() {
  const [requests, setRequests] = useState<WorkspaceRequest[]>([]);
  const [selected, setSelected] = useState<WorkspaceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const loadRequests = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/admin/workspace-requests', { cache: 'no-store', signal });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, 'Unable to load workspace requests.'));
      }
      if (!payload || typeof payload !== 'object' || !('data' in payload) || !Array.isArray(payload.data)) {
        throw new Error('The workspace request response was invalid.');
      }
      const data = payload.data as WorkspaceRequest[];
      setRequests(data);
      setSelected((current) => current ? data.find((request) => request.id === current.id) ?? null : null);
      setError('');
    } catch (loadError) {
      if (signal?.aborted) return;
      setError(loadError instanceof Error ? loadError.message : 'Unable to load workspace requests.');
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => {
      if (!controller.signal.aborted) return loadRequests(controller.signal);
    });
    const interval = window.setInterval(() => void loadRequests(), 30_000);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadRequests]);

  const updateRequest = async (action: 'approve' | 'reject') => {
    if (!selected) return;
    setIsUpdating(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/workspace-requests/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(getErrorMessage(payload, 'Unable to update this workspace request.'));
      }
      await loadRequests();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update this workspace request.');
    } finally {
      setIsUpdating(false);
    }
  };

  const pendingCount = requests.filter((request) =>
    request.status === 'NEW' || request.status === 'INVITE_PENDING'
  ).length;

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              Workspace requests
              {pendingCount > 0 && <Badge variant="warning">{pendingCount} pending</Badge>}
            </CardTitle>
            <CardDescription>Review workspace access requests and send approved owners a secure invite.</CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Refresh workspace requests"
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
            <p className="py-5 text-center text-sm text-slate-500">Loading workspace requests…</p>
          ) : requests.length === 0 ? (
            <p className="py-5 text-center text-sm text-slate-500">No workspace requests have arrived yet.</p>
          ) : (
            requests.map((request) => (
              <button
                type="button"
                key={request.id}
                onClick={() => setSelected(request)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {request.companyName} · {request.name}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {request.email} · {new Date(request.createdAt).toLocaleString()}
                  </span>
                </span>
                <Badge variant={request.status === 'NEW' || request.status === 'INVITE_PENDING' ? 'warning' : 'secondary'}>
                  {statusLabels[request.status]}
                </Badge>
              </button>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        {selected && (
          <DialogContent>
            <DialogHeader onClose={() => setSelected(null)}>
              <DialogTitle>Workspace request: {selected.companyName}</DialogTitle>
              <DialogDescription>
                Submitted {new Date(selected.createdAt).toLocaleString()} · {statusLabels[selected.status]}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><UserRound className="h-4 w-4 text-slate-400" />{selected.name}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" />{selected.email}</div>
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-slate-400" />{selected.companyName}</div>
            </div>
            {selected.status === 'NEW' || selected.status === 'INVITE_PENDING' ? (
              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="destructive" disabled={isUpdating} onClick={() => void updateRequest('reject')}>
                  <CircleX className="mr-1.5 h-4 w-4" />Reject
                </Button>
                <Button type="button" disabled={isUpdating} isLoading={isUpdating} onClick={() => void updateRequest('approve')}>
                  <CircleCheck className="mr-1.5 h-4 w-4" />Approve &amp; send invite
                </Button>
              </div>
            ) : selected.status === 'INVITE_SENT' ? (
              <Button type="button" variant="outline" disabled={isUpdating} isLoading={isUpdating} onClick={() => void updateRequest('approve')}>
                Resend invite
              </Button>
            ) : null}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
