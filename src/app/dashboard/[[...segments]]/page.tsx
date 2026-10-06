import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../../wordbitx/lib/auth';
import CRMApp from '../../../../wordbitx/src/App';

export const metadata: Metadata = {
  title: 'CRM Dashboard Preview',
  description: 'Explore the WordbitX CRM dashboard using illustrative sample data.',
  robots: { index: false, follow: false },
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments = [] } = await params;
  const user = await getCurrentUser();

  if (user?.role === 'SUPER_ADMIN') {
    redirect('/admin');
  }

  if (segments.length === 1 && segments[0] === 'login') {
    redirect(user ? '/dashboard' : '/login');
  }

  if (!user) {
    redirect('/login');
  }

  return <CRMApp />;
}
