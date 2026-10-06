'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Building,
  Clock,
  PhoneIncoming,
  FileText,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ContactManagementSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'deals' | 'tickets' | 'notes'>('timeline');

  const timelineEvents = [
    {
      date: 'Today · 10:45 AM',
      title: 'Deal Moved to Negotiation',
      description: 'Stage updated from Proposal to Negotiation ($8,500). Legal confirmed MSA acceptance.',
      icon: <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />,
      badge: 'Revenue Pipeline'
    },
    {
      date: 'Yesterday · 04:15 PM',
      title: 'Outbound Call Completed (18m 42s)',
      description: 'Sarah Ahmed spoke with Ahmed Khan regarding custom webhook integration and multi-agent telephony.',
      icon: <PhoneIncoming className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      badge: 'Telephony PBX'
    },
    {
      date: 'Oct 02 · 11:20 AM',
      title: 'Proposal #PR-102 Sent via Email',
      description: 'Delivered to ahmed@abctech.com. Viewed 4 times by stakeholders.',
      icon: <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
      badge: 'Email Sync'
    },
    {
      date: 'Oct 01 · 09:30 AM',
      title: 'Follow-up Scheduled & Task Assigned',
      description: 'Automated task generated: Review pricing questions with sales engineer.',
      icon: <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      badge: 'Automation'
    },
    {
      date: 'Sep 30 · 02:14 PM',
      title: 'Lead Ingested & Scored (92/100)',
      description: 'Contact created from inbound enterprise inquiry form on WordbitX website.',
      icon: <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      badge: 'Lead Intake'
    }
  ];

  return (
    <section id="customer-management" className="py-20 md:py-28 bg-white dark:bg-[#0e2722] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Unified Customer 360
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Every customer. Every interaction. One complete history.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Replace disconnected spreadsheets and siloed inboxes with a living contact timeline. When everyone shares the same customer memory, trust increases and deals close faster.
          </p>
        </div>

        {/* 360 Contact Profile Container */}
        <div className="max-w-5xl mx-auto bg-[#f5f8f6] dark:bg-[#071714] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 bg-white dark:bg-[#0e2722] border-b border-slate-200 dark:border-[#183932] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0b1f1b] text-emerald-300 dark:bg-emerald-400 dark:text-[#0b1f1b] font-bold text-xl flex items-center justify-center shadow-xs">
                AK
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">Ahmed Khan</h3>
                  <Badge variant="success">Customer (Tier 1)</Badge>
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    ABC Technologies
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    ahmed@abctech.com
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    +1 (555) 019-2834
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Active Deal</span>
                <span className="text-base font-bold text-slate-950 dark:text-white tabular-nums">$8,500</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-[#183932]"></div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Support SLA</span>
                <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">100% On-Time</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar inside Profile */}
          <div className="flex items-center px-6 border-b border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722] gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Activity Timeline (5)
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'deals'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deals & Revenue (1)
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'tickets'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Support Tickets (1)
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="relative border-l-2 border-slate-200 dark:border-[#183932] ml-3 space-y-6 pl-6">
                  {timelineEvents.map((evt, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Node Dot */}
                      <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#0e2722] border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-1.5 hover:border-emerald-300 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                              {evt.icon}
                            </span>
                            <span className="font-bold text-xs text-slate-950 dark:text-white">
                              {evt.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60">
                              {evt.badge}
                            </span>
                            <span>{evt.date}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deals' && (
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      Website & CRM Redesign
                    </span>
                    <p className="text-slate-500 mt-0.5">Stage: Negotiation · Probability: 80% · Expected: Oct 12</p>
                  </div>
                  <span className="text-base font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
                    $8,500 USD
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">#WB-1042</span>
                      <span className="font-bold text-slate-900 dark:text-white">Webhook retry failure</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">Assigned: Sarah Ahmed · Priority: High · Status: Open</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    SLA: 01:42 remaining
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
