import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getSafeServerSession } from '../../lib/auth.ts';
import App from '../../src/App.tsx';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSafeServerSession();
  if (!session?.user?.id || !session.user.organizationId) {
    redirect('/login');
  }

  return <App>{children}</App>;
}
