import React, { useState } from 'react';
import {
  DollarSign,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  FileText,
  Activity,
  ArrowRight,
  TrendingUp,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DealManagementSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Granular Deal Control
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Manage every deal down to the finest detail.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Inspect milestones, historical notes, stakeholder buying signals, and probability progressions without switching context.
          </p>
        </div>

        {/* Detailed Deal Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-[#183932] bg-slate-50/80 dark:bg-[#0b1f1b]/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Deal #DL-4819</span>
                <span>·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Software & Service Tier</span>
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                Website Redesign & CRM Migration
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-bold">Deal Amount</span>
                <span className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                  $8,500 <span className="text-xs font-normal text-slate-500">USD</span>
                </span>
              </div>
              <Badge variant="success" size="md">
                80% Win Prob.
              </Badge>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="p-6 border-b border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Pipeline Stage Progression</span>
              <span className="text-slate-500 font-semibold">Stage 4 of 5: Negotiation</span>
            </div>
            {/* Visual stage bars in emerald */}
            <div className="grid grid-cols-5 gap-2">
              <div className="h-2 rounded-full bg-emerald-600"></div>
              <div className="h-2 rounded-full bg-emerald-600"></div>
              <div className="h-2 rounded-full bg-emerald-600"></div>
              <div className="h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-[#12352e]"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1">
              <span>New Lead (✓)</span>
              <span>Qualified (✓)</span>
              <span>Proposal (✓)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Negotiation (Current)</span>
              <span>Closed Won</span>
            </div>
          </div>

          {/* Deal Metadata Grid */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-5 border-b border-slate-200 dark:border-[#183932] text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Primary Contact</span>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Ahmed Khan</div>
              <div className="text-[11px] text-slate-500">VP of Technology</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Company Account</span>
              <div className="font-bold text-slate-900 dark:text-white mt-1">ABC Technologies</div>
              <div className="text-[11px] text-slate-500">Enterprise · Chicago, IL</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Deal Owner</span>
              <div className="font-bold text-slate-900 dark:text-white mt-1">Sarah Ahmed</div>
              <div className="text-[11px] text-slate-500">Senior Account Executive</div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Target Close Date</span>
              <div className="font-bold text-slate-900 dark:text-white mt-1">October 12</div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">On Track (High Velocity)</div>
            </div>
          </div>

          {/* Activities & Notes Split */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Recent Milestone Activity</span>
                <span className="text-[11px] text-slate-400 font-normal">Audit Log</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Legal reviewed MSA & DPA</span>
                    <p className="text-[11px] text-slate-500">Standard confidentiality provisions accepted with no redlines.</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Yesterday at 4:15 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Proposal #PR-102 dispatched</span>
                    <p className="text-[11px] text-slate-500">Scope includes 15 user seats and SIP telephony bridge.</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Oct 02 at 11:20 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Open Next Tasks</span>
                <span className="text-[11px] text-slate-400 font-normal">Assigned</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-[#183932] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Call Ahmed for final signing</span>
                    <span className="text-[11px] text-amber-600 font-bold">Tomorrow</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Confirm payment method and kick off technical onboarding.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-[#183932] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Invite engineering to kickoff</span>
                    <span className="text-[11px] text-slate-400">Oct 14</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Provide API sandbox credentials and webhook keys.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
