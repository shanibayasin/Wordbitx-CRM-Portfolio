import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import CRMApp from '../../../../wordbitx/src/App';

export const metadata: Metadata = {
  title: 'CRM Dashboard Preview',
  description: 'Explore the WordbitX CRM dashboard using illustrative sample data.',
  robots: { index: false, follow: false },
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments = [] } = await params;
  if (segments.length === 1 && segments[0] === 'login') {
    const crmAppUrl = process.env.CRM_APP_URL;
    if (!crmAppUrl) {
      throw new Error('CRM_APP_URL must be configured to direct users to CRM sign-in.');
    }

    let crmUrl: URL;
    try {
      crmUrl = new URL(crmAppUrl);
    } catch {
      throw new Error('CRM_APP_URL must be a valid absolute URL.');
    }

    if (crmUrl.protocol !== 'http:' && crmUrl.protocol !== 'https:') {
      throw new Error('CRM_APP_URL must use HTTP or HTTPS.');
    }

    redirect(new URL('/login', crmUrl).toString());
  }

  return <CRMApp />;
}
