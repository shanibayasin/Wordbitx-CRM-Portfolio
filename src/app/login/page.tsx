import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/dashboardwordbitx/lib/auth';
import { LoginPage } from '../../site-pages/LoginPage';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Continue to the WordbitX CRM application to sign in to your workspace.',
};

export default async function Page() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }

  return <LoginPage />;
}
