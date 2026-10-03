import Link from 'next/link';
import React from 'react';
import { Target, Shield, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Product vision and capabilities on this portfolio site describe concepts; they do not verify deployed services or integrations.
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
              Product concept: bring customer touchpoints such as email, calls, support tickets, and proposals together in one account history.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] w-fit text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-[#1e483e]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Grounded Intelligence</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI concepts could summarize illustrative pipeline context and help teams draft or prioritize next actions. No AI processing is represented by this site preview.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] w-fit text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-[#1e483e]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Modular Isolation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A modular workspace model is envisioned for agencies, subsidiaries, and departments that need separate work areas with central administration.
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
              When a customer calls, the support rep doesn&apos;t know there&apos;s an active $50,000 renewal in final negotiation. When a sales rep sends a contract, they don&apos;t know the client has three critical unresolved bug tickets.
            </p>
            <p>
              <strong>WordbitX is envisioned as a unified workspace.</strong> The product concept brings sales pipelines, communications, support, and workflow automation into one coherent operating experience.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#183932] flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Interested in experiencing the platform?</span>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-xs px-3 py-1.5 rounded-lg gap-1.5 bg-[#0b1f1b] hover:bg-[#12332c] text-white border border-transparent whitespace-nowrap"
            >
              Book a Platform Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
