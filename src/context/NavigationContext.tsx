import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [currentPath, setCurrentPath] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname as PageRoute;
      const validRoutes: PageRoute[] = [
        '/',
        '/features',
        '/solutions',
        '/integrations',
        '/pricing',
        '/resources',
        '/about',
        '/contact',
        '/demo',
        '/login',
        '/signup'
      ];
      if (validRoutes.includes(p)) return p;
    }
    return '/';
  });

  const [isExploreDemoOpen, setIsExploreDemoOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname as PageRoute;
      setCurrentPath(p || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: PageRoute | string) => {
    if (path.startsWith('/#')) {
      // Anchor navigation on homepage
      if (currentPath !== '/') {
        setCurrentPath('/');
        window.history.pushState({}, '', '/');
        setTimeout(() => {
          const el = document.querySelector(path.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(path.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    const cleanPath = path.split('#')[0] as PageRoute;
    setCurrentPath(cleanPath);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
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
