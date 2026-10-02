'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, CheckCircle, Bell, UserPlus, PhoneCall, Zap, BarChart2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';
import { HeroDashboardPreview } from './HeroDashboardPreview';

export const HeroSection: React.FC = () => {
  const { navigate, openExploreDemo } = useNavigation();

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#f5f8f6] dark:bg-[#071714]">
      {/* Subtle emerald ambient aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Headline matching wordbitxx template */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 dark:border-emerald-800/80 bg-white dark:bg-[#0e2722] px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>One secure workspace for growing teams</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.06] text-balance">
            One CRM for Sales, Clients, Teams &amp; Call Center Operations.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Manage leads, customers, deals, calls, support, tasks and reporting from one focused operating system—built to give your team a complete picture of every relationship.
          </p>

          {/* Primary Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300 shadow-lg shadow-emerald-950/15"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Start Free
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/demo')}
              className="w-full sm:w-auto border-slate-300 bg-white dark:bg-[#0e2722] text-slate-700 dark:text-slate-200 hover:border-emerald-400 hover:text-emerald-800 dark:hover:border-emerald-500"
            >
              Book a Demo
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={openExploreDemo}
              className="w-full sm:w-auto bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80 hover:bg-emerald-100"
            >
              Explore Live CRM App
            </Button>
          </div>

          {/* Trust reassurance text */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            <span>No credit card required</span>
            <span aria-hidden="true" className="text-emerald-600">·</span>
            <span>Set up in minutes</span>
            <span aria-hidden="true" className="text-emerald-600">·</span>
            <span>Built for growing teams</span>
          </div>
        </div>

        {/* Hero Interactive Dashboard Container with subtle floating indicator cards */}
        <div className="relative mt-12 lg:mt-16">
          {/* Subtle floating card 1: New Qualified Lead (Top Left) */}
          <div className="hidden lg:flex absolute -top-5 -left-4 z-20 items-center gap-3 px-3.5 py-2.5 bg-white/95 dark:bg-[#0e2722]/95 backdrop-blur-md rounded-xl border border-emerald-200 dark:border-emerald-800/80 shadow-lg text-xs animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">New qualified lead</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Ahmed Khan · Score 92/100</div>
            </div>
          </div>

          {/* Subtle floating card 2: Deal Won (Top Right) */}
          <div className="hidden lg:flex absolute -top-5 -right-4 z-20 items-center gap-3 px-3.5 py-2.5 bg-white/95 dark:bg-[#0e2722]/95 backdrop-blur-md rounded-xl border border-emerald-200 dark:border-emerald-800/80 shadow-lg text-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">+$8,500 Deal won</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">ABC Technologies · Signed</div>
            </div>
          </div>

          {/* Subtle floating card 3: Follow-up due (Bottom Left) */}
          <div className="hidden lg:flex absolute -bottom-4 -left-4 z-20 items-center gap-3 px-3.5 py-2.5 bg-white/95 dark:bg-[#0e2722]/95 backdrop-blur-md rounded-xl border border-emerald-200 dark:border-emerald-800/80 shadow-lg text-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Follow-up due in 20 min</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Nova Labs proposal call</div>
            </div>
          </div>

          {/* Subtle floating card 4: AI High Intent (Bottom Right) */}
          <div className="hidden lg:flex absolute -bottom-4 -right-4 z-20 items-center gap-3 px-3.5 py-2.5 bg-white/95 dark:bg-[#0e2722]/95 backdrop-blur-md rounded-xl border border-emerald-200 dark:border-emerald-800/80 shadow-lg text-xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">AI high-intent detected</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">92% purchase probability</div>
            </div>
          </div>

          {/* Main Interactive Product Preview */}
          <HeroDashboardPreview />
        </div>
      </div>
    </section>
  );
};
