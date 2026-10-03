'use client';

import React from 'react';
import { X, ArrowRight, LayoutDashboard, PhoneCall, Bot, GitPullRequest, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { useNavigation } from '../../context/NavigationContext';

export const ExploreDemoModal: React.FC = () => {
  const { isExploreDemoOpen, closeExploreDemo, navigate } = useNavigation();

  if (!isExploreDemoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                WordbitX Ecosystem
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500">Interactive Preview</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">
              Explore the WordbitX CRM Application
            </h3>
          </div>
          <button
            onClick={closeExploreDemo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#12352e] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore the migrated WordbitX CRM dashboard using illustrative sample data. Changes in this preview are stored only in this browser.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1">
                <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Revenue & Pipeline Preview
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review illustrative deals, pipeline stages, and conversion metrics.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1">
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Call Center Concept
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore a sample layout for agent queues, call records, and dispositions.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1">
                <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                AI Assistant Concepts
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Preview proposed lead summaries, reply proposals, and scoring workflows.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1">
                <GitPullRequest className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Workflow Automation Concepts
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review example assignment, follow-up, and stage-trigger workflows.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-[#12352e]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Want a guided walkthrough instead?
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Contact the WordbitX team about a product walkthrough.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                closeExploreDemo();
                navigate('/demo');
              }}
              className="bg-white dark:bg-[#0e2722] border-slate-300 dark:border-[#183932]"
            >
              Book a Demo
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#071714] border-t border-slate-200 dark:border-[#183932] gap-3">
          <button
            onClick={closeExploreDemo}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Stay on Public Site
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                closeExploreDemo();
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300 font-bold"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Open CRM Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
