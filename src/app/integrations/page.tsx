import type { Metadata } from 'next';
import { IntegrationsPage } from '../../site-pages/IntegrationsPage';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Review the illustrative WordbitX integrations catalog for communication, telephony, productivity, and developer tools.',
};

export default function Page() {
  return <IntegrationsPage />;
}
