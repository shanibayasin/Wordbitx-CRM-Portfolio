import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AppProviders from '../components/AppProviders';
import './globals.css';

const description =
  'WordbitX brings leads, customers, sales pipelines, support, automation, analytics and AI-assisted workflows into one powerful CRM workspace.';

export const metadata: Metadata = {
  title: {
    default: 'WordbitX — Intelligent CRM for Sales, Teams & Customer Operations',
    template: '%s | WordbitX',
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'WordbitX',
    title: 'WordbitX — Intelligent CRM for Sales, Teams & Customer Operations',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordbitX — Intelligent CRM for Sales, Teams & Customer Operations',
    description,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WordbitX',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  description,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '29',
    highPrice: '189',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#f5f8f6] text-slate-900 dark:bg-[#071714] dark:text-slate-100 font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
