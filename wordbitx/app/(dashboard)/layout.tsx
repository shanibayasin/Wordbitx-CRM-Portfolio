import type { ReactNode } from 'react';
import App from '../../src/App.tsx';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <App>{children}</App>;
}
