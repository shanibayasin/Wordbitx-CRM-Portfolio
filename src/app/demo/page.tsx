import type { Metadata } from 'next';
import { DemoPage } from '../../site-pages/DemoPage';

export const metadata: Metadata = {
  title: 'WordbitX Demo',
  description: 'Send a demo request to the WordbitX team and tell us what your team wants to explore.',
};

export default function Page() {
  return <DemoPage />;
}
