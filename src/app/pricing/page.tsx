import type { Metadata } from 'next';
import { PricingPage } from '../../site-pages/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Review WordbitX plan information and compare CRM features.',
};

export default function Page() {
  return <PricingPage />;
}
