import { redirect } from 'next/navigation';
import { getSafeServerSession } from '../../../lib/auth.ts';
import LoginForm from './LoginForm.tsx';

export default async function LoginPage() {
  const session = await getSafeServerSession();
  if (session?.user?.id && session.user.organizationId) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
