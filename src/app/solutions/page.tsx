import type { Metadata } from 'next';
import { SolutionsPage } from '../../site-pages/SolutionsPage';

export const metadata: Metadata = {
  title: 'CRM Solutions',
  description: 'Explore WordbitX CRM workflows for sales teams, call centers, support, agencies, real estate, and enterprise operations.',
};

export default function Page() {
  return <SolutionsPage />;
}
