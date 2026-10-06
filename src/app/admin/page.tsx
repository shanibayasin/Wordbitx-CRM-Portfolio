import { redirect } from 'next/navigation';
import { getCurrentUser, isConfiguredPlatformAdminEmail } from '@/app/dashboardwordbitx/lib/auth';
import { DemoRequestsPanel } from '@/app/dashboardwordbitx/components/dashboard/DemoRequestsPanel';
import { WorkspaceRequestsPanel } from '@/app/dashboardwordbitx/components/dashboard/WorkspaceRequestsPanel';

export default async function PlatformAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (
    user.role !== 'SUPER_ADMIN' ||
    user.organizationId ||
    !isConfiguredPlatformAdminEmail(user.email)
  ) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-16 dark:bg-[#071714]">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-[#183932] dark:bg-[#0b1f1b]">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          WordbitX Platform
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Super Admin</h1>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Signed in as {user.email ?? user.name ?? 'Platform administrator'}.
        </p>
      </section>
      <section className="mx-auto mt-6 max-w-3xl">
        <WorkspaceRequestsPanel />
      </section>
      <section className="mx-auto mt-6 max-w-3xl">
        <DemoRequestsPanel scope="platform" />
      </section>
    </main>
  );
}
