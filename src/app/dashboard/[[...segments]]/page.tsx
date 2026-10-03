import type { Metadata } from 'next';
import CRMApp from '../../../../wordbitx/src/App';

export const metadata: Metadata = {
  title: 'CRM Dashboard Preview',
  description: 'Explore the WordbitX CRM dashboard using illustrative sample data.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <CRMApp />;
}
