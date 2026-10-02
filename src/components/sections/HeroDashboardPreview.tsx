'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  MoreVertical,
  PhoneCall,
  Sparkles,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
  Headphones,
  CheckSquare
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

type TabKey = 'overview' | 'sales' | 'leads' | 'support';

export const HeroDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const { openExploreDemo, navigate } = useNavigation();

  return (
    <div className="w-full bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200/90 dark:border-[#183932] shadow-2xl overflow-hidden">
      {/* Top Application Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-[#183932] bg-slate-50/90 dark:bg-[#0b1f1b]/90 gap-3">
        {/* Left: Window controls and Workspace selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#183932] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#183932] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#183932] inline-block"></span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-[#183932] hidden sm:block"></div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">ABC Technologies</span>
            <span className="text-slate-400">/</span>
            <span className="text-emerald-700 dark:text-emerald-400">Sales & Operations</span>
          </div>
        </div>

        {/* Center: Segmented Filter Tabs (Overview, Sales, Leads, Support) */}
        <div className="flex items-center p-1 bg-slate-200/80 dark:bg-[#071714] rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-[#0e2722] text-slate-950 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'sales'
                ? 'bg-white dark:bg-[#0e2722] text-slate-950 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Sales Pipeline
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-white dark:bg-[#0e2722] text-slate-950 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Lead Intake
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'support'
                ? 'bg-white dark:bg-[#0e2722] text-slate-950 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Support & Calls
          </button>
        </div>

        {/* Right: Quick Action to open live CRM app */}
        <button
          onClick={openExploreDemo}
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 hover:underline cursor-pointer"
        >
          <span>Launch full app</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main View Area based on Active Tab */}
      <div className="p-4 sm:p-6 lg:p-7 min-h-[460px] bg-[#f5f8f6]/50 dark:bg-[#071714]/60">
        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 4 Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Total Pipeline</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center">
                    +18.4%
                  </span>
                </div>
                <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
                  $148,500
                </div>
                <div className="text-[11px] text-slate-400 mt-1">32 active deals in motion</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Won This Month</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center">
                    +12.1%
                  </span>
                </div>
                <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
                  $64,200
                </div>
                <div className="text-[11px] text-slate-400 mt-1">11 deals closed won</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Qualified Inbound</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center">
                    Score &gt; 80
                  </span>
                </div>
                <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
                  84 Leads
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Avg 14 min first response</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Support SLA Health</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    99.4%
                  </span>
                </div>
                <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
                  04m 12s
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Average queue resolution</div>
              </div>
            </div>

            {/* Split row: Active Deals table + Live Activity / AI Insight */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Active Deals in negotiation */}
              <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Active Priority Deals
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deals requiring closing action this week</p>
                  </div>
                  <button
                    onClick={() => navigate('/#sales-pipeline')}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Kanban</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-[#183932] text-slate-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-2.5 font-bold">Deal / Company</th>
                        <th className="pb-2.5 font-bold">Stage</th>
                        <th className="pb-2.5 font-bold">Value</th>
                        <th className="pb-2.5 font-bold">Owner</th>
                        <th className="pb-2.5 font-bold text-right">Close Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#183932]">
                      <tr>
                        <td className="py-3">
                          <div className="font-bold text-slate-900 dark:text-white">Enterprise CRM Migration</div>
                          <div className="text-[11px] text-slate-400">ABC Technologies</div>
                        </td>
                        <td className="py-3">
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">Negotiation</span>
                        </td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white tabular-nums">$8,500</td>
                        <td className="py-3 text-slate-600 dark:text-slate-300">Sarah A.</td>
                        <td className="py-3 text-right text-slate-500 tabular-nums">Oct 12</td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <div className="font-bold text-slate-900 dark:text-white">Call Center Telephony Rollout</div>
                          <div className="text-[11px] text-slate-400">Nova Labs</div>
                        </td>
                        <td className="py-3">
                          <span className="text-amber-700 dark:text-amber-400 font-bold">Proposal Sent</span>
                        </td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white tabular-nums">$14,200</td>
                        <td className="py-3 text-slate-600 dark:text-slate-300">Marcus V.</td>
                        <td className="py-3 text-right text-slate-500 tabular-nums">Oct 18</td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <div className="font-bold text-slate-900 dark:text-white">Support Desk Consolidation</div>
                          <div className="text-[11px] text-slate-400">Vertex Solutions</div>
                        </td>
                        <td className="py-3">
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">Qualified</span>
                        </td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white tabular-nums">$6,800</td>
                        <td className="py-3 text-slate-600 dark:text-slate-300">Elena K.</td>
                        <td className="py-3 text-right text-slate-500 tabular-nums">Oct 24</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Col: AI Intelligence Box & Recent Timeline */}
              <div className="space-y-4">
                {/* AI Insight Box in Emerald */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>AI Deal Insight</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Deal activity on <strong>ABC Technologies</strong> surged 34% this week. Contract viewed 4 times by the finance lead. Suggest closing follow-up today before 4 PM.
                  </p>
                </div>

                {/* Follow-up reminder */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Follow-ups Due Today
                    </span>
                    <span className="text-[11px] text-slate-400">3 tasks</span>
                  </div>
                  <div className="text-xs space-y-2">
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-[#183932]">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">Call Ahmed Khan</div>
                        <div className="text-[11px] text-slate-400">Review final pricing terms</div>
                      </div>
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">10:30 AM</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">Send Nova Labs SOW</div>
                        <div className="text-[11px] text-slate-400">Twilio SIP configuration</div>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">02:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SALES TAB ================= */}
        {activeTab === 'sales' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-[#183932]">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Q4 Enterprise Revenue Pipeline
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">6 Stages · $148,500 Total Value · $94,800 Weighted</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500">Win Rate: <strong className="text-emerald-700 dark:text-emerald-400">42.8%</strong></span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">Avg Cycle: <strong className="text-slate-900 dark:text-white">18 Days</strong></span>
              </div>
            </div>

            {/* Kanban Columns Preview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Col 1 */}
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-[#12352e]/50 border border-slate-200/70 dark:border-[#183932]">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  <span>Qualified (4)</span>
                  <span className="text-slate-400 tabular-nums">$32,000</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Cloud Database Migration</div>
                    <div className="text-[11px] text-slate-500">Apex Retail</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">$7,800</span>
                      <span className="text-slate-400">Oct 28</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Support Automation</div>
                    <div className="text-[11px] text-slate-500">FinFlow Corp</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">$11,400</span>
                      <span className="text-slate-400">Nov 04</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 2 */}
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-[#12352e]/50 border border-slate-200/70 dark:border-[#183932]">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  <span>Proposal (3)</span>
                  <span className="text-slate-400 tabular-nums">$41,500</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Call Center Telephony</div>
                    <div className="text-[11px] text-slate-500">Nova Labs</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">$14,200</span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">Reviewing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3 */}
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-2.5">
                  <span>Negotiation (2)</span>
                  <span className="text-emerald-700 dark:text-emerald-400 tabular-nums">$32,500</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-emerald-300/80 dark:border-emerald-800 shadow-xs ring-1 ring-emerald-500/20">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Website & CRM Redesign</div>
                    <div className="text-[11px] text-slate-500">ABC Technologies</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-[11px]">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">$8,500</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">90% prob</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 4 */}
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-2.5">
                  <span>Won This Month</span>
                  <span className="text-emerald-700 dark:text-emerald-400 tabular-nums">$64,200</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-emerald-200 dark:border-emerald-800 shadow-xs">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Omnichannel Desk</div>
                    <div className="text-[11px] text-slate-500">Global Logistics Co.</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">$24,000</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Closed Won</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= LEADS TAB ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#183932]">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Real-Time Inbound Lead Stream
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Auto-scored by AI intent models and routed via territory rules</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Live sync active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#183932] text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-2 font-bold">Lead Contact</th>
                    <th className="pb-2 font-bold">Company</th>
                    <th className="pb-2 font-bold">Source</th>
                    <th className="pb-2 font-bold">Intent Score</th>
                    <th className="pb-2 font-bold">Assigned Rep</th>
                    <th className="pb-2 font-bold">Next Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#183932]">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-[#12352e]/40 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-slate-900 dark:text-white">Ahmed Khan</div>
                      <div className="text-[11px] text-slate-500">ahmed@abctech.com</div>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">ABC Technologies</td>
                    <td className="py-3 text-slate-500">Website Form</td>
                    <td className="py-3">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">92 / 100</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">(High Intent)</span>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">Sarah Ahmed</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">Tomorrow 10:30 AM · Follow-up call</td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-[#12352e]/40 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-slate-900 dark:text-white">Rachel Vance</div>
                      <div className="text-[11px] text-slate-500">rachel@novalabs.io</div>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">Nova Labs</td>
                    <td className="py-3 text-slate-500">LinkedIn Inbound</td>
                    <td className="py-3">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">85 / 100</span>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">Marcus Vance</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">Proposal draft in review</td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-[#12352e]/40 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-slate-900 dark:text-white">Julian Meyer</div>
                      <div className="text-[11px] text-slate-500">j.meyer@vertex.de</div>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">Vertex Solutions</td>
                    <td className="py-3 text-slate-500">Telephony Call In</td>
                    <td className="py-3">
                      <span className="font-bold text-amber-700 dark:text-amber-400 tabular-nums">78 / 100</span>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">Elena Rostova</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">Discovery meeting scheduled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= SUPPORT TAB ================= */}
        {activeTab === 'support' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
                <div className="text-xs text-slate-500">Active Queue Calls</div>
                <div className="text-xl font-bold font-display text-slate-900 dark:text-white tabular-nums mt-0.5">
                  2 Waiting · 4 In Progress
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
                <div className="text-xs text-slate-500">Agents Online</div>
                <div className="text-xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                  6 Available
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
                <div className="text-xs text-slate-500">Open Tickets</div>
                <div className="text-xl font-bold font-display text-slate-900 dark:text-white tabular-nums mt-0.5">
                  8 Tickets (0 SLA Breach)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-3">
                <span>Recent Customer Support Tickets</span>
                <span className="text-slate-400">Contextual Link to Sales Accounts</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg border border-slate-100 dark:border-[#183932] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400">#WB-1042</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">Payment gateway webhook retry issue</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Customer: Ahmed Khan · ABC Technologies ($8,500 active deal)</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">01:42 remaining</span>
                    <div className="text-[10px] text-slate-400">Assigned: Sarah A.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-100 dark:border-[#183932] flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400">#WB-1039</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">SIP PBX caller ID custom formatting</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Customer: Nova Labs · Telephony deployment tier</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">Resolved</span>
                    <div className="text-[10px] text-slate-400">CSAT: 5/5 ⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="px-6 py-3.5 border-t border-slate-200 dark:border-[#183932] bg-slate-50/90 dark:bg-[#0b1f1b]/90 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Workspace Isolation Active
          </span>
          <span>·</span>
          <span>Role: Super Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Connected: Gmail, Twilio Voice, WhatsApp API</span>
          <button
            onClick={() => navigate('/features')}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
          >
            Explore all capabilities →
          </button>
        </div>
      </div>
    </div>
  );
};
