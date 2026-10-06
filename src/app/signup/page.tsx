import type { Metadata } from 'next';
import { SignupPage } from '../../site-pages/SignupPage';

export const metadata: Metadata = {
  title: 'Request a Workspace',
  description: 'Request a WordbitX workspace for administrator approval.',
};

export default function Page() {
  return <SignupPage />;
}
