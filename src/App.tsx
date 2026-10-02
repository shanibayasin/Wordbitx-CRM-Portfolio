import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { AnnouncementBar } from './components/navbar/AnnouncementBar';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ExploreDemoModal } from './components/ui/ExploreDemoModal';

import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DemoPage } from './pages/DemoPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

const AppContent: React.FC = () => {
  const { currentPath } = useNavigation();

  const isAuthPage = currentPath === '/login' || currentPath === '/signup';

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/features':
        return <FeaturesPage />;
      case '/solutions':
        return <SolutionsPage />;
      case '/integrations':
        return <IntegrationsPage />;
      case '/pricing':
        return <PricingPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/demo':
        return <DemoPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8f6] text-slate-900 dark:bg-[#071714] dark:text-slate-100 transition-colors selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100">
      {!isAuthPage && <AnnouncementBar />}
      <Navbar />

      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {!isAuthPage && <Footer />}

      {/* Global Interactive Modals */}
      <CommandPalette />
      <ExploreDemoModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <CommandPaletteProvider>
          <AppContent />
        </CommandPaletteProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
