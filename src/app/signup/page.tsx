import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../wordbitx/lib/auth';
import { SignupPage } from '../../site-pages/SignupPage';

export const metadata: Metadata = {
  title: 'Create a Workspace',
  description: 'Create a WordbitX workspace and administrator account.',
};

export default async function Page() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }

  return <SignupPage />;
}
