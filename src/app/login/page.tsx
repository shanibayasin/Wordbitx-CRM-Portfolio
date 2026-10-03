import type { Metadata } from 'next';
import { LoginPage } from '../../site-pages/LoginPage';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Continue to the WordbitX CRM application to sign in to your workspace.',
};

export default function Page() {
  return <LoginPage />;
}
