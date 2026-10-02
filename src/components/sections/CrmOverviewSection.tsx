'use client';

import React from 'react';
import { Eye, TrendingUp, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const CrmOverviewSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section id="crm-overview" className="py-20 md:py-28 bg-white dark:bg-[#0e2722] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Value propositions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Centralized Operational Cockpit
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12] text-balance">
              See the business clearly.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              When sales pipelines, customer tickets, call logs, and team tasks are scattered across disconnected platforms, executives and team leads fly blind. WordbitX establishes single-source-of-truth clarity across every customer interaction.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real-Time Pipeline Velocity</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Monitor deal movements across stages with live weighted forecasting.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Centralized Lead & Deal Provenance</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Know which marketing campaign or outbound agent originated every dollar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Automated Follow-Up Tracking</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Zero dropped balls with automated SLA countdowns and task escalations.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/features')}
                className="bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Explore Architecture
              </Button>
            </div>
          </div>

          {/* Right Column: Advanced CRM Dashboard Live Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714] p-5 sm:p-6 shadow-xl space-y-5">
              {/* Header inside preview */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#183932] pb-4">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Executive Sales & Operations Summary</div>
                  <div className="text-[11px] text-slate-500">Workspace: ABC Technologies · Live Telemetry</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Sync: 12s ago</span>
                </div>
              </div>

              {/* 3 Metric counters */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                  <div className="text-[11px] text-slate-500">Total ARR Tracked</div>
                  <div className="text-lg font-bold font-display text-slate-950 dark:text-white tabular-nums mt-0.5">$324,800</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 font-bold">+22.4% vs last Q</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                  <div className="text-[11px] text-slate-500">Lead Conversion</div>
                  <div className="text-lg font-bold font-display text-slate-950 dark:text-white tabular-nums mt-0.5">38.6%</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1 font-bold">+5.2% lift via AI</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                  <div className="text-[11px] text-slate-500">Active Reps</div>
                  <div className="text-lg font-bold font-display text-slate-950 dark:text-white tabular-nums mt-0.5">14 Online</div>
                  <div className="text-[10px] text-slate-400 mt-1">94% task completion</div>
                </div>
              </div>

              {/* Visual simulated revenue & conversion progression */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Quarterly Revenue Attainment ($250k Target)</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">$214,000 (85.6%)</span>
                </div>
                {/* Visual bar */}
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#12352e] overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '52%' }} title="Closed Won: $130,000"></div>
                  <div className="h-full bg-emerald-400 dark:bg-emerald-300" style={{ width: '33.6%' }} title="Weighted Pipeline: $84,000"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Closed Won: $130k</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Weighted Deals: $84k</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span>Remaining: $36k</span>
                  </div>
                </div>
              </div>

              {/* Real-time team presence indicator */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-xs">
                    SA
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Sarah Ahmed (Sales Lead)</div>
                    <div className="text-[11px] text-slate-500">Currently presenting proposal to ABC Technologies</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  In Call
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
