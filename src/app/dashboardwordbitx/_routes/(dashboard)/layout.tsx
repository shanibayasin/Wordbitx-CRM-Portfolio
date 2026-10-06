import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../lib/auth.ts';
import App from '../../App.tsx';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (user?.role === 'SUPER_ADMIN') {
    redirect('/admin');
  }
  if (!user?.id || !user.organizationId) {
    redirect('/login');
  }

  return <App>{children}</App>;
}
