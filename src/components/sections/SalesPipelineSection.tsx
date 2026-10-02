import React, { useState } from 'react';
import { ArrowRight, ChevronRight, DollarSign, GripVertical, Check, Plus, AlertCircle, ArrowUpDown } from 'lucide-react';
import { Deal } from '../../types';

interface PipelineColumn {
  id: Deal['stage'];
  label: string;
  weight: number; // probability weight
}

const COLUMNS: PipelineColumn[] = [
  { id: 'new_lead', label: 'New Lead', weight: 0.1 },
  { id: 'qualified', label: 'Qualified', weight: 0.3 },
  { id: 'proposal', label: 'Proposal', weight: 0.5 },
  { id: 'negotiation', label: 'Negotiation', weight: 0.8 },
  { id: 'won', label: 'Won', weight: 1.0 },
  { id: 'lost', label: 'Lost', weight: 0.0 }
];

export const SalesPipelineSection: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'd1',
      title: 'Website & CRM Redesign',
      company: 'ABC Technologies',
      contact: 'Ahmed Khan',
      value: 8500,
      stage: 'negotiation',
      owner: 'Sarah Ahmed',
      priority: 'high',
      expectedClose: 'Oct 12',
      probability: 80,
      tags: ['Enterprise', 'High Priority']
    },
    {
      id: 'd2',
      title: 'Call Center Telephony Rollout',
      company: 'Nova Labs',
      contact: 'Rachel Vance',
      value: 14200,
      stage: 'proposal',
      owner: 'Marcus Vance',
      priority: 'high',
      expectedClose: 'Oct 18',
      probability: 50,
      tags: ['SIP Bridge', 'Multi-agent']
    },
    {
      id: 'd3',
      title: 'Support Desk Consolidation',
      company: 'Vertex Solutions',
      contact: 'Julian Meyer',
      value: 6800,
      stage: 'qualified',
      owner: 'Elena Rostova',
      priority: 'medium',
      expectedClose: 'Oct 24',
      probability: 30,
      tags: ['SLA Desk']
    },
    {
      id: 'd4',
      title: 'Inbound Portal Automation',
      company: 'Bright Agency',
      contact: 'Chloe Taylor',
      value: 5400,
      stage: 'new_lead',
      owner: 'Sarah Ahmed',
      priority: 'low',
      expectedClose: 'Nov 02',
      probability: 10,
      tags: ['Webhooks']
    },
    {
      id: 'd5',
      title: 'Global Omnichannel Suite',
      company: 'Meridian Group',
      contact: 'Liam O’Connor',
      value: 24000,
      stage: 'won',
      owner: 'Marcus Vance',
      priority: 'high',
      expectedClose: 'Sep 28',
      probability: 100,
      tags: ['Closed Won']
    },
    {
      id: 'd6',
      title: 'Legacy Database Sync',
      company: 'OldTech Inc.',
      contact: 'Dan Miller',
      value: 3200,
      stage: 'lost',
      owner: 'Elena Rostova',
      priority: 'low',
      expectedClose: 'Sep 15',
      probability: 0,
      tags: ['Competitor Price']
    }
  ]);

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Computed metrics
  const totalPipeline = deals
    .filter((d) => d.stage !== 'lost')
    .reduce((acc, d) => acc + d.value, 0);

  const weightedPipeline = deals
    .filter((d) => d.stage !== 'lost' && d.stage !== 'won')
    .reduce((acc, d) => {
      const col = COLUMNS.find((c) => c.id === d.stage);
      return acc + d.value * (col?.weight || 0.5);
    }, 0);

  const wonTotal = deals
    .filter((d) => d.stage === 'won')
    .reduce((acc, d) => acc + d.value, 0);

  const lostTotal = deals
    .filter((d) => d.stage === 'lost')
    .reduce((acc, d) => acc + d.value, 0);

  const wonDealsCount = deals.filter((d) => d.stage === 'won').length;
  const closedTotalCount = wonDealsCount + deals.filter((d) => d.stage === 'lost').length;
  const conversionRate = closedTotalCount > 0 ? Math.round((wonDealsCount / closedTotalCount) * 100) : 0;

  const moveDeal = (dealId: string, newStage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          return { ...d, stage: newStage };
        }
        return d;
      })
    );
  };

  return (
    <section id="sales-pipeline" className="py-20 md:py-28 bg-white dark:bg-[#0e2722] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Pipeline Control & Forecasting
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Know exactly where every deal stands.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Visual Kanban boards with real-time deal stage tracking, probability weightings, and stage conversion calculations. Move deals between columns to inspect live metric recalculations.
          </p>
        </div>

        {/* Live Pipeline Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 mb-8 bg-[#f5f8f6] dark:bg-[#071714] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xs">
          <div className="p-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Total Pipeline</span>
            <span className="text-xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
              ${totalPipeline.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Active & won deals</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Weighted Pipeline</span>
            <span className="text-xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
              ${Math.round(weightedPipeline).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Probability-adjusted</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Closed Won</span>
            <span className="text-xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
              ${wonTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5 font-bold">{wonDealsCount} contracts</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] font-semibold text-slate-500 block">Closed Lost</span>
            <span className="text-xl font-bold font-display text-slate-500 tabular-nums">
              ${lostTotal.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Disqualified deals</span>
          </div>

          <div className="p-3 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-slate-500 block">Win Rate</span>
            <span className="text-xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
              {conversionRate}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">Closed conversion</span>
          </div>
        </div>

        {/* Interactive Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[1020px] grid grid-cols-6 gap-3.5">
            {COLUMNS.map((col) => {
              const colDeals = deals.filter((d) => d.stage === col.id);
              const colSum = colDeals.reduce((acc, d) => acc + d.value, 0);

              return (
                <div
                  key={col.id}
                  className={`rounded-xl border p-3 flex flex-col min-h-[380px] ${
                    col.id === 'won'
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-[#f5f8f6]/80 dark:bg-[#071714]/60 border-slate-200 dark:border-[#183932]'
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 dark:border-[#183932]">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {col.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {colDeals.length} deals · ${(colSum / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                      {Math.round(col.weight * 100)}%
                    </span>
                  </div>

                  {/* Deals Stack */}
                  <div className="space-y-2.5 flex-1">
                    {colDeals.length === 0 ? (
                      <div className="h-24 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-[#183932] rounded-lg">
                        Empty stage
                      </div>
                    ) : (
                      colDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedDeal(deal)}
                          className="group p-3 rounded-lg bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer relative"
                        >
                          {/* Priority Indicator */}
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span className="font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[100px]">
                              {deal.company}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                deal.priority === 'high'
                                  ? 'text-rose-700 bg-rose-50 dark:bg-rose-950/40'
                                  : deal.priority === 'medium'
                                  ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/40'
                                  : 'text-slate-500 bg-slate-100 dark:bg-[#12352e]'
                              }`}
                            >
                              {deal.priority}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {deal.title}
                          </div>

                          {/* Value & Date */}
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-[#183932] flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-950 dark:text-white tabular-nums">
                              ${deal.value.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {deal.expectedClose}
                            </span>
                          </div>

                          {/* Quick stage mover dropdown inside card */}
                          <div
                            className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Move to:</span>
                            <select
                              value={deal.stage}
                              onChange={(e) => moveDeal(deal.id, e.target.value as Deal['stage'])}
                              className="text-[10px] font-semibold bg-slate-100 dark:bg-[#12352e] rounded px-1.5 py-0.5 border border-slate-200 dark:border-[#183932] text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
                            >
                              {COLUMNS.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Deal Preview Drawer/Modal */}
        {selectedDeal && (
          <div className="mt-6 p-4 rounded-xl bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200 dark:border-[#183932] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedDeal.title}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">
                  {selectedDeal.company} ({selectedDeal.contact})
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  ${selectedDeal.value.toLocaleString()} USD
                </span>
              </div>
              <div className="text-slate-500 mt-0.5">
                Owner: {selectedDeal.owner} · Expected Close: {selectedDeal.expectedClose} · Stage: {selectedDeal.stage.toUpperCase()}
              </div>
            </div>

            <button
              onClick={() => setSelectedDeal(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
            >
              Dismiss inspector
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
