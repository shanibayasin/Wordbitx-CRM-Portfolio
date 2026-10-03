import type { Metadata } from 'next';
import { FeaturesPage } from '../../site-pages/FeaturesPage';

export const metadata: Metadata = {
  title: 'CRM Features',
  description: 'Explore WordbitX CRM capabilities for leads, sales pipelines, customer support, automation, and reporting.',
};

export default function Page() {
  return <FeaturesPage />;
}
