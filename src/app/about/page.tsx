import type { Metadata } from 'next';
import { AboutPage } from '../../site-pages/AboutPage';

export const metadata: Metadata = {
  title: 'About WordbitX',
  description: 'Learn about WordbitX and its approach to bringing sales, customer operations, and team workflows together.',
};

export default function Page() {
  return <AboutPage />;
}
