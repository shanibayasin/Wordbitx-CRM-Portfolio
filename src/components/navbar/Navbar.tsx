'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  PhoneCall,
  GitPullRequest,
  Bot,
  LayoutDashboard,
  Users,
  Shield,
  CreditCard,
  HelpCircle,
  Building,
  Briefcase
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { PRODUCT_MENU, SOLUTIONS_MENU, RESOURCES_MENU } from '../../data/navigationData';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, openExploreDemo } = useNavigation();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { openPalette } = useCommandPalette();

  const [activeDropdown, setActiveDropdown] = useState<'product' | 'solutions' | 'resources' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'product' | 'solutions' | 'resources') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#071714]/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-[#183932] shadow-xs'
          : 'bg-white/90 dark:bg-[#071714]/90 backdrop-blur-lg border-b border-slate-200/60 dark:border-[#183932]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
        {/* Zone 1: WordbitX Logo Matching Template */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none cursor-pointer"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl text-base font-black bg-[#0b1f1b] text-emerald-300 shadow-sm group-hover:scale-105 transition-transform">
              W
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                Wordbit<span className="text-emerald-600 dark:text-emerald-400">X</span>
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                CRM
              </span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          {/* Product Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('product')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
                activeDropdown === 'product' ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-[#0e2722]' : ''
              }`}
            >
              <span>Product</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'product' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'product' && (
              <div
                className="absolute top-full left-0 mt-2 w-[540px] bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('product')}
                onMouseLeave={handleMouseLeave}
              >
                {PRODUCT_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 px-2 py-1">
                      {col.title}
                    </div>
                    {col.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          closeDropdown();
                          navigate(item.href);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#12352e] transition-colors group block cursor-pointer"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
                activeDropdown === 'solutions' ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-[#0e2722]' : ''
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'solutions' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'solutions' && (
              <div
                className="absolute top-full left-0 mt-2 w-[520px] bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                {SOLUTIONS_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 px-2 py-1">
                      {col.title}
                    </div>
                    {col.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          closeDropdown();
                          navigate(item.href);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#12352e] transition-colors group block cursor-pointer"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <button
            onClick={() => navigate('/features')}
            className={`px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
              currentPath === '/features' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Features
          </button>

          {/* Integrations */}
          <button
            onClick={() => navigate('/integrations')}
            className={`px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
              currentPath === '/integrations' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Integrations
          </button>

          {/* Pricing */}
          <button
            onClick={() => navigate('/pricing')}
            className={`px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
              currentPath === '/pricing' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            Pricing
          </button>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer ${
                activeDropdown === 'resources' ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-[#0e2722]' : ''
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'resources' && (
              <div
                className="absolute top-full right-0 mt-2 w-[480px] bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                {RESOURCES_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 px-2 py-1">
                      {col.title}
                    </div>
                    {col.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          closeDropdown();
                          navigate(item.href);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/70 dark:hover:bg-[#12352e] transition-colors group block cursor-pointer"
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Actions + Search & Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            onClick={openPalette}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-600 hover:text-emerald-800 dark:text-slate-300 dark:hover:text-white bg-slate-100/90 dark:bg-[#0e2722] rounded-lg border border-slate-200 dark:border-[#183932] transition-colors cursor-pointer"
            title="Search & Quick Actions (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#12352e] rounded text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-white rounded-lg hover:bg-emerald-50 dark:hover:bg-[#0e2722] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-emerald-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Sign In */}
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Sign In
          </button>

          {/* Start Free */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/signup')}
            className="hidden sm:inline-flex bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300"
          >
            Start Free
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-[#0e2722] transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-[#183932] bg-white dark:bg-[#071714] px-4 py-4 space-y-4 animate-in fade-in duration-150">
          <div className="space-y-1">
            {['/', '/features', '/solutions', '/integrations', '/pricing', '/resources', '/about', '/contact'].map((path) => {
              const label =
                path === '/'
                  ? 'Overview'
                  : path === '/features'
                  ? 'All Features'
                  : path === '/solutions'
                  ? 'Solutions'
                  : path === '/integrations'
                  ? 'Integrations & Telephony'
                  : path === '/pricing'
                  ? 'Pricing Plans'
                  : path === '/resources'
                  ? 'Guides & Playbooks'
                  : path === '/about'
                  ? 'About WordbitX'
                  : 'Contact Sales & Support';
              return (
                <button
                  key={path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(path);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-[#0e2722] text-slate-900 dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300"
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-[#183932] flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/demo');
              }}
              className="w-full justify-center"
            >
              Book a Demo
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/signup');
              }}
              className="w-full justify-center bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
