import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/auth.ts';
import LoginForm from './LoginForm.tsx';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user?.role === 'SUPER_ADMIN') {
    redirect('/admin');
  }
  if (user?.id && user.organizationId) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
