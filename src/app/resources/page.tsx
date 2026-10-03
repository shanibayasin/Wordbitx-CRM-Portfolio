import type { Metadata } from 'next';
import { ResourcesPage } from '../../site-pages/ResourcesPage';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Browse WordbitX CRM implementation, sales, telephony, automation, and developer guide previews.',
};

export default function Page() {
  return <ResourcesPage />;
}
