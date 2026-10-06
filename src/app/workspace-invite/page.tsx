import type { Metadata } from 'next';
import { WorkspaceInviteForm } from '../../../wordbitx/components/dashboard/WorkspaceInviteForm';

export const metadata: Metadata = {
  title: 'Activate Workspace',
  description: 'Set a password to activate your approved WordbitX workspace.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function WorkspaceInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = '' } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f6] px-4 py-12 dark:bg-[#071714]">
      <section className="w-full max-w-lg space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-[#183932] dark:bg-[#0b1f1b] sm:p-8">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">WordbitX workspace</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activate your workspace</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Choose a strong password to finish creating your approved workspace.
          </p>
        </header>
        {token ? (
          <WorkspaceInviteForm token={token} />
        ) : (
          <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            This invite link is missing its token. Ask the administrator to send a new invite.
          </p>
        )}
      </section>
    </main>
  );
}
