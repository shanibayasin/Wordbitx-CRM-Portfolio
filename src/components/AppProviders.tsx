'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '../context/ThemeContext';
import { NavigationProvider, useNavigation } from '../context/NavigationContext';
import { CommandPaletteProvider } from '../context/CommandPaletteContext';
import { AnnouncementBar } from './navbar/AnnouncementBar';
import { Navbar } from './navbar/Navbar';
import { Footer } from './footer/Footer';
import { CommandPalette } from './ui/CommandPalette';
import { ExploreDemoModal } from './ui/ExploreDemoModal';

function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const { currentPath } = useNavigation();
  const pathname = usePathname();
  const isAuthPage = currentPath === '/login' || currentPath === '/signup';

  if (pathname.startsWith('/dashboard')) {
    return <>{children}</>;
  }

  return (
    <div className="portfolio-shell min-h-screen flex flex-col bg-[#f5f8f6] text-slate-900 dark:bg-[#071714] dark:text-slate-100 transition-colors selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100">
      {!isAuthPage && <AnnouncementBar />}
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      {!isAuthPage && <Footer />}
      <CommandPalette />
      <ExploreDemoModal />
    </div>
  );
}

export default function AppProviders({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <CommandPaletteProvider>
          <AppShell>{children}</AppShell>
        </CommandPaletteProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
