'use client';

import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, LayoutDashboard, PhoneCall, Bot, GitPullRequest, Shield, Layers, HelpCircle, CreditCard, Sparkles, ExternalLink } from 'lucide-react';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { useNavigation } from '../../context/NavigationContext';

const CRM_APP_URL = 'https://wordbitx-iota.vercel.app/';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'CRM Features' | 'Quick Actions' | 'External';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const { isOpen, closePalette } = useCommandPalette();
  const { navigate, openExploreDemo } = useNavigation();
  const [query, setQuery] = useState('');

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Home',
        subtitle: 'Main overview & interactive CRM preview',
        icon: <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/')
      },
      {
        id: 'nav-features',
        category: 'Navigation',
        title: 'All Features Directory',
        subtitle: 'Comprehensive catalog of platform capabilities',
        icon: <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/features')
      },
      {
        id: 'nav-solutions',
        category: 'Navigation',
        title: 'Solutions by Team & Industry',
        subtitle: 'Sales, Call Centers, Support, Real Estate, Enterprise',
        icon: <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/solutions')
      },
      {
        id: 'nav-integrations',
        category: 'Navigation',
        title: 'Integrations & Telephony Stack',
        subtitle: 'Gmail, WhatsApp, Twilio, Vonage, SIP, REST API',
        icon: <GitPullRequest className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/integrations')
      },
      {
        id: 'nav-pricing',
        category: 'Navigation',
        title: 'Pricing & Plan Comparison',
        subtitle: 'Starter, Business, and Enterprise tiers',
        icon: <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/pricing')
      },
      {
        id: 'nav-resources',
        category: 'Navigation',
        title: 'Resources & Guides',
        subtitle: 'CRM playbooks, automation templates & docs',
        icon: <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/resources')
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'About WordbitX',
        subtitle: 'Mission, architecture principles & philosophy',
        icon: <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/about')
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Contact WordbitX Team',
        subtitle: 'Talk to sales, support, or partnerships',
        icon: <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/contact')
      },
      // Quick Actions
      {
        id: 'act-demo',
        category: 'Quick Actions',
        title: 'Book a Live Product Demo',
        subtitle: 'Schedule a 1-on-1 personalized session',
        icon: <ArrowRight className="w-4 h-4 text-emerald-500" />,
        action: () => navigate('/demo')
      },
      {
        id: 'act-signup',
        category: 'Quick Actions',
        title: 'Create Free Workspace (Sign Up)',
        subtitle: 'Start with 14-day free trial, no card required',
        icon: <ArrowRight className="w-4 h-4 text-emerald-500" />,
        action: () => navigate('/signup')
      },
      {
        id: 'act-signin',
        category: 'Quick Actions',
        title: 'Sign In to Workspace',
        subtitle: 'Access your WordbitX organization',
        icon: <ArrowRight className="w-4 h-4 text-emerald-500" />,
        action: () => navigate('/login')
      },
      // CRM Features
      {
        id: 'crm-pipeline',
        category: 'CRM Features',
        title: 'Sales Pipeline & Kanban',
        subtitle: 'Jump to visual deal stages and forecasting',
        icon: <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/#sales-pipeline')
      },
      {
        id: 'crm-callcenter',
        category: 'CRM Features',
        title: 'Call Center & Agent Presence',
        subtitle: 'Live call queue and telephony operations',
        icon: <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/#call-center')
      },
      {
        id: 'crm-ai',
        category: 'CRM Features',
        title: 'AI CRM Intelligence',
        subtitle: 'Lead summaries and automated follow-ups',
        icon: <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        action: () => navigate('/#ai-crm')
      },
      {
        id: 'crm-automation',
        category: 'CRM Features',
        title: 'Visual Workflow Builder',
        subtitle: 'Rules, assignment triggers, and alerts',
        icon: <GitPullRequest className="w-4 h-4 text-teal-500" />,
        action: () => navigate('/#automation')
      },
      // External
      {
        id: 'ext-crm-app',
        category: 'External',
        title: 'Launch Existing CRM App',
        subtitle: 'Open wordbitx-iota.vercel.app in a new tab',
        icon: <ExternalLink className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />,
        action: () => {
          openExploreDemo();
        }
      }
    ],
    [navigate, openExploreDemo]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#0b1f1b]/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={closePalette}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 dark:border-[#183932]">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search (e.g. Pipeline, Call Center, Pricing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 bg-slate-100 dark:bg-[#122e28] rounded border border-slate-200 dark:border-[#183932]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  closePalette();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#122e28] transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#122e28] group-hover:bg-white dark:group-hover:bg-[#1a3d35] transition-colors border border-transparent group-hover:border-slate-200/80 dark:group-hover:border-[#1e483e]">
                    {cmd.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {cmd.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {cmd.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-[#122e28]">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#071714] border-t border-slate-200/80 dark:border-[#183932] text-[11px] text-slate-500 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>Press <strong className="font-mono">Esc</strong> to dismiss</span>
        </div>
      </div>
    </div>
  );
};
