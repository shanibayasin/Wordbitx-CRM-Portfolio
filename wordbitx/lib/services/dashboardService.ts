import type { DashboardStats } from '../../types/index.ts';

export async function getDashboardStats(signal?: AbortSignal): Promise<DashboardStats> {
  const response = await fetch('/api/dashboard-stats', {
    cache: 'no-store',
    signal,
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
        ? payload.error
        : 'Unable to load dashboard metrics.';
    throw new Error(errorMessage);
  }

  if (!payload || typeof payload !== 'object' || !('totalLeads' in payload)) {
    throw new Error('The dashboard metrics response was invalid.');
  }

  return payload as DashboardStats;
}
