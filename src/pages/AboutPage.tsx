import React from 'react';
import { Target, Shield, Compass, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            About WordbitX
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Rebuilding the commercial workspace from first principles.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            WordbitX was conceived around a simple truth: modern revenue operations break down when customer history, phone calls, deals, and support live in separate software silos.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] w-fit text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-[#1e483e]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Unified Memory</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every customer touchpoint — email threads, telephone recordings, support tickets, and signed proposals — lives in a single chronological account record.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] w-fit text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-[#1e483e]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Grounded Intelligence</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI shouldn't be an isolated gimmick. WordbitX AI reads actual pipeline state and meeting notes to formulate real, high-intent next actions for your team.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] w-fit text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-[#1e483e]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Modular Isolation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Strict multi-workspace segregation ensures agencies, subsidiaries, and departments maintain data isolation while benefiting from central management.
            </p>
          </div>
        </div>

        {/* Philosophy Deep Dive */}
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-6">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Why WordbitX? The Problem with Modern Tool Sprawl
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Growing organizations typically start with a lightweight spreadsheet, adopt an expensive legacy CRM, purchase a separate cloud telephony dialer, set up a third-party ticketing desk, and then struggle to keep them synced through brittle Zapier connections.
            </p>
            <p>
              When a customer calls, the support rep doesn't know there's an active $50,000 renewal in final negotiation. When a sales rep sends a contract, they don't know the client has three critical unresolved bug tickets.
            </p>
            <p>
              <strong>WordbitX unifies these operations.</strong> By treating sales pipelines, telephone communications, support desks, and workflow automations as first-class citizens of a single database, your entire team acts with complete operational awareness.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#183932] flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Interested in experiencing the platform?</span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/demo')}
              className="bg-[#0b1f1b] hover:bg-[#12332c] text-white border-transparent"
            >
              Book a Platform Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
