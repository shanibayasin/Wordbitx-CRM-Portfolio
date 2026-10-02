import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Clock,
  ArrowUpRight,
  Filter,
  PieChart,
  ArrowDownRight
} from 'lucide-react';

type TimeRange = 'today' | '7d' | '30d' | '90d' | 'custom';

export const AnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Realistic data sets based on range
  const metricsData = {
    today: { rev: '$12,400', leads: '18', conv: '41.2%', won: '$8,500', lost: '$0', pipe: '$148,500', avgDeal: '$8,500', cycle: '14 Days' },
    '7d': { rev: '$48,200', leads: '64', conv: '43.5%', won: '$32,400', lost: '$4,200', pipe: '$148,500', avgDeal: '$8,100', cycle: '16 Days' },
    '30d': { rev: '$184,500', leads: '248', conv: '42.8%', won: '$124,000', lost: '$18,500', pipe: '$148,500', avgDeal: '$8,650', cycle: '18 Days' },
    '90d': { rev: '$542,000', leads: '740', conv: '44.1%', won: '$382,000', lost: '$46,000', pipe: '$148,500', avgDeal: '$8,900', cycle: '17 Days' },
    custom: { rev: '$210,000', leads: '290', conv: '43.0%', won: '$145,000', lost: '$21,000', pipe: '$148,500', avgDeal: '$8,400', cycle: '18 Days' },
  }[timeRange];

  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with time filter buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Executive Revenue Intelligence
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
              Turn CRM activity into decisions.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Measure sales velocity, customer support SLAs, and marketing channel attribution without exporting raw data to external spreadsheets.
            </p>
          </div>

          {/* Segmented Filter Bar */}
          <div className="flex items-center p-1 bg-white dark:bg-[#0e2722] rounded-xl border border-slate-200 dark:border-[#183932] text-xs font-medium self-start md:self-auto shadow-xs">
            {(['today', '7d', '30d', '90d', 'custom'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-colors capitalize cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Total Closed ARR</span>
            <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums mt-1">
              {metricsData.won}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+18.4% vs prev period</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Lead-to-Win Conversion</span>
            <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums mt-1">
              {metricsData.conv}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+4.2% lift with AI scoring</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Average Deal Size</span>
            <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums mt-1">
              {metricsData.avgDeal}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Enterprise B2B target</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs">
            <span className="text-[11px] font-medium text-slate-500 block">Sales Cycle Velocity</span>
            <div className="text-2xl font-bold font-display text-slate-950 dark:text-white tabular-nums mt-1">
              {metricsData.cycle}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>-3 days faster via auto follow-ups</span>
            </div>
          </div>
        </div>

        {/* Charts & Channel Attribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Revenue Velocity Chart Preview (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Monthly Deal Ingestion & Closures</h3>
                <p className="text-xs text-slate-500">Pipeline progression across last 6 months</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#0b1f1b] dark:bg-emerald-400"></span>
                  <span>Pipeline Added</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></span>
                  <span>Closed Won</span>
                </div>
              </div>
            </div>

            {/* Visual Simulated Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 dark:border-[#183932] px-2">
              {[
                { month: 'May', added: 65, won: 42, addedVal: '$65k', wonVal: '$42k' },
                { month: 'Jun', added: 80, won: 55, addedVal: '$80k', wonVal: '$55k' },
                { month: 'Jul', added: 95, won: 68, addedVal: '$95k', wonVal: '$68k' },
                { month: 'Aug', added: 110, won: 82, addedVal: '$110k', wonVal: '$82k' },
                { month: 'Sep', added: 130, won: 98, addedVal: '$130k', wonVal: '$98k' },
                { month: 'Oct', added: 148, won: 124, addedVal: '$148k', wonVal: '$124k' },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    <div
                      className="w-1/2 max-w-[28px] bg-[#0b1f1b] dark:bg-emerald-400 rounded-t-sm group-hover:brightness-110 transition-all"
                      style={{ height: `${item.added * 1.1}px` }}
                      title={`Pipeline Added: ${item.addedVal}`}
                    ></div>
                    <div
                      className="w-1/2 max-w-[28px] bg-emerald-600 rounded-t-sm group-hover:brightness-110 transition-all"
                      style={{ height: `${item.won * 1.1}px` }}
                      title={`Closed Won: ${item.wonVal}`}
                    ></div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{item.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Overall Stage Velocity: 18.2 Days Average</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Quarterly Target: 104% Attained</span>
            </div>
          </div>

          {/* Lead Source ROI & Team Leaderboard (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-4 text-xs">
              <h3 className="font-semibold text-slate-950 dark:text-white">Lead Source ROI Attribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Inbound Website Calculator</span>
                    <span className="font-bold text-slate-950 dark:text-white">46% ($68k)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-700" style={{ width: '46%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Outbound Telephony Dialing</span>
                    <span className="font-bold text-slate-950 dark:text-white">28% ($41k)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Partner & Customer Referrals</span>
                    <span className="font-bold text-slate-950 dark:text-white">18% ($26k)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-3 text-xs">
              <h3 className="font-semibold text-slate-950 dark:text-white">Team Revenue Leaderboard</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#183932]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">1</span>
                    <span className="font-medium text-slate-900 dark:text-white">Sarah Ahmed</span>
                  </div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">$68,500</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#183932]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">2</span>
                    <span className="font-medium text-slate-900 dark:text-white">Marcus Vance</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">$42,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">3</span>
                    <span className="font-medium text-slate-900 dark:text-white">Elena Rostova</span>
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white tabular-nums">$34,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
