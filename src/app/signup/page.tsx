import type { Metadata } from 'next';
import { SignupPage } from '../../site-pages/SignupPage';

export const metadata: Metadata = {
  title: 'Create a Workspace',
  description: 'Review the WordbitX workspace setup preview or continue to the CRM application.',
};

export default function Page() {
  return <SignupPage />;
}
