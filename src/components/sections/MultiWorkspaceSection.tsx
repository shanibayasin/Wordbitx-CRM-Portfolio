import React, { useState } from 'react';
import { Building2, Users, LayoutDashboard, Headphones, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const MultiWorkspaceSection: React.FC = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<'sales' | 'support' | 'operations'>('sales');
  const { navigate } = useNavigation();

  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Multi-Tenant Isolation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            One platform. Separate workspaces.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Run multiple brands, independent subsidiaries, or client agencies under one primary organization with zero risk of cross-tenant data leakage.
          </p>
        </div>

        {/* Workspace Visual Architecture */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          {/* Organization Top Level */}
          <div className="p-6 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0b1f1b] text-emerald-300 font-black flex items-center justify-center shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Organization Hierarchy
                </span>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  ABC Technologies Group
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">3 Isolated Sub-Workspaces Provisioned</span>
            </div>
          </div>

          {/* Sub-Workspace Selector Buttons */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-slate-200 dark:border-[#183932] bg-slate-50 dark:bg-[#12352e]/40">
            <button
              onClick={() => setSelectedWorkspace('sales')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedWorkspace === 'sales'
                  ? 'bg-white dark:bg-[#0e2722] border-emerald-500 shadow-sm'
                  : 'bg-white/60 dark:bg-[#071714]/60 border-slate-200 dark:border-[#183932] text-slate-600 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-950 dark:text-white">Sales & Revenue</span>
                {selectedWorkspace === 'sales' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
              </div>
              <p className="text-[11px] text-slate-500">Pipelines, deals, lead routing & quotas</p>
            </button>

            <button
              onClick={() => setSelectedWorkspace('support')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedWorkspace === 'support'
                  ? 'bg-white dark:bg-[#0e2722] border-emerald-500 shadow-sm'
                  : 'bg-white/60 dark:bg-[#071714]/60 border-slate-200 dark:border-[#183932] text-slate-600 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-950 dark:text-white">Customer Support</span>
                {selectedWorkspace === 'support' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
              </div>
              <p className="text-[11px] text-slate-500">SLA tickets, macros & live telephony</p>
            </button>

            <button
              onClick={() => setSelectedWorkspace('operations')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedWorkspace === 'operations'
                  ? 'bg-white dark:bg-[#0e2722] border-emerald-500 shadow-sm'
                  : 'bg-white/60 dark:bg-[#071714]/60 border-slate-200 dark:border-[#183932] text-slate-600 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-950 dark:text-white">Operations & Legal</span>
                {selectedWorkspace === 'operations' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
              </div>
              <p className="text-[11px] text-slate-500">Billing, MSA contracts & audit logs</p>
            </button>
          </div>

          {/* Active Workspace Details */}
          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-950 dark:text-white text-sm">
                  Active Workspace Scope: {selectedWorkspace === 'sales' ? 'Sales & Revenue' : selectedWorkspace === 'support' ? 'Customer Support' : 'Operations & Legal'}
                </h4>
                <p className="text-slate-500 mt-0.5">
                  Records, custom properties, and automated workflows are scoped exclusively to this container.
                </p>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/80 dark:border-emerald-800/60">
                Data Isolated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
                <span className="text-[11px] text-slate-400 block font-medium">Assigned Members</span>
                <span className="font-bold text-sm text-slate-950 dark:text-white mt-0.5 block">
                  {selectedWorkspace === 'sales' ? '8 Sales Reps' : selectedWorkspace === 'support' ? '6 Support Agents' : '3 Operations Leads'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
                <span className="text-[11px] text-slate-400 block font-medium">Custom Pipelines</span>
                <span className="font-bold text-sm text-slate-950 dark:text-white mt-0.5 block">
                  {selectedWorkspace === 'sales' ? 'Enterprise & Mid-Market' : selectedWorkspace === 'support' ? 'Tier-1 & Bug Escalation' : 'Vendor Approvals'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/30">
                <span className="text-[11px] text-slate-400 block font-medium">Security Guardrails</span>
                <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                  Strict Scoped RBAC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
