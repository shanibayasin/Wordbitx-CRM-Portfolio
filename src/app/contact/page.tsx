import type { Metadata } from 'next';
import { ContactPage } from '../../site-pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact WordbitX',
  description: 'Contact WordbitX about the CRM platform, integrations, or product information.',
};

export default function Page() {
  return <ContactPage />;
}
