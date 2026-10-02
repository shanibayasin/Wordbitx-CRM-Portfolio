'use client';

import React from 'react';
import { ArrowRight, Check, Target, Headphones, Users, Building, Shield, Sparkles } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutionsData';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const SolutionsPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Tailored Industry Architectures
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Built for how your specific team sells and supports.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Whether closing high-ticket B2B deals, managing hundreds of daily customer calls, or scaling an agency with isolated client spaces, WordbitX eliminates operational friction.
          </p>
        </div>

        {/* Deep Dive Solution Cards */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {SOLUTIONS_DATA.map((sol) => (
            <div
              key={sol.id}
              id={sol.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-sm space-y-8 scroll-mt-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-[#183932]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {sol.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
                    {sol.title}
                  </h2>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/demo')}>
                  Schedule Solution Walkthrough
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 cols: Benefits and Description */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Operational Advantages:
                    </span>
                    {sol.keyBenefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 cols: Metrics & Workflow Steps */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Metrics row */}
                  <div className="grid grid-cols-2 gap-3">
                    {sol.metrics.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932] text-center">
                        <div className="text-[11px] text-slate-500">{m.label}</div>
                        <div className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Workflow steps */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932] space-y-2.5 text-xs">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Automated Operational Cycle:
                    </span>
                    {sol.workflowSteps.map((ws, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                          0{i + 1}.
                        </span>
                        <div>
                          <strong className="text-slate-900 dark:text-white">{ws.title}:</strong>{' '}
                          <span className="text-slate-600 dark:text-slate-400">{ws.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0b1f1b] text-white max-w-5xl mx-auto text-center space-y-4 shadow-xl border border-emerald-950/60">
          <h3 className="text-2xl sm:text-3xl font-bold font-display">Need a tailored implementation plan?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our solution architects can configure custom pipelines, telephone bridges, and automations for your exact team size.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/demo')}
              className="bg-white text-[#0b1f1b] hover:bg-emerald-50 border-transparent font-semibold shadow-xs"
            >
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
