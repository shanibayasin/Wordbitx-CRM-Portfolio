'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PageRoute } from '../types';

interface NavigationContextType {
  currentPath: PageRoute;
  navigate: (path: PageRoute | string) => void;
  isExploreDemoOpen: boolean;
  openExploreDemo: () => void;
  closeExploreDemo: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const pendingHash = useRef<string | null>(null);
  const currentPath = (pathname || '/') as PageRoute;
  const [isExploreDemoOpen, setIsExploreDemoOpen] = useState(false);

  useEffect(() => {
    const hash = pendingHash.current;
    if (pathname !== '/' || !hash) return;

    pendingHash.current = null;
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, [pathname]);

  const navigate = (path: PageRoute | string) => {
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        pendingHash.current = path.substring(1);
        router.push('/');
      } else {
        document.querySelector(path.substring(1))?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    if (path.includes('#')) {
      pendingHash.current = path.substring(path.indexOf('#'));
    }

    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExploreDemo = () => setIsExploreDemoOpen(true);
  const closeExploreDemo = () => setIsExploreDemoOpen(false);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        isExploreDemoOpen,
        openExploreDemo,
        closeExploreDemo
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
