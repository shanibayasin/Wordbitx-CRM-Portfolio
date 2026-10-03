import type { Metadata } from 'next';
import { DemoPage } from '../../site-pages/DemoPage';

export const metadata: Metadata = {
  title: 'WordbitX Demo',
  description: 'Explore the WordbitX CRM demo and review the platform experience.',
};

export default function Page() {
  return <DemoPage />;
}
