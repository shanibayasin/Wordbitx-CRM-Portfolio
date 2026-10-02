'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  Clock,
  User,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const CustomerSupportSection: React.FC = () => {
  return (
    <section id="customer-support" className="py-20 md:py-28 bg-white dark:bg-[#0e2722] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Commercial Support Desk
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Support customers without losing context.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            When customer support agents see active sales deals and VIP status alongside tickets, issues get solved faster and customer expansion opportunities never get overlooked.
          </p>
        </div>

        {/* Support Desk Dual Panel Showcase */}
        <div className="max-w-5xl mx-auto bg-[#f5f8f6] dark:bg-[#071714] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: The Ticket (7 cols) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60">
                  #WB-1042
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-500">Intake: Webhook API</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                <Clock className="w-3.5 h-3.5" />
                <span>SLA: 01:42 remaining</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                Payment webhook retry issue on subscription renewal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reported by Ahmed Khan (VP of Technology, ABC Technologies)
              </p>
            </div>

            {/* Ticket status pills */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932] text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Priority</span>
                <span className="font-bold text-rose-700 dark:text-rose-400 mt-0.5 block">High</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">Open</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Agent</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">Sarah Ahmed</span>
              </div>
            </div>

            {/* Conversation exchange preview */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932] space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Ahmed Khan (Customer)</span>
                  <span className="text-[11px] text-slate-400 font-normal">10:14 AM</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  "Our automated billing webhook failed to receive the 200 OK acknowledgment on the test invoice. Can your engineering team verify if the HMAC signature secret matches the v2 endpoint?"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950 dark:text-emerald-200">
                  <span>Sarah Ahmed (Agent Note)</span>
                  <span className="text-[11px] text-slate-400 font-normal">10:20 AM</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Customer has an active $8,500 contract in final negotiation. Escalated to Tier-2 Dev Support with priority queue tag."
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Side-by-side Customer Context (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-[#f5f8f6]/80 dark:bg-[#071714]/80 space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#183932]">
              <div className="font-bold text-slate-900 dark:text-white">
                Customer 360° Context
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                ● Live Linked
              </span>
            </div>

            {/* Profile summary */}
            <div className="space-y-1.5">
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Ahmed Khan
              </div>
              <div className="text-slate-500">ABC Technologies · 50–100 Employees</div>
              <div className="text-slate-500">Customer since: 2025 · Account Tier: Enterprise</div>
            </div>

            {/* Commercial Context Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Active Commercial Deal
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">$8,500 USD</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Deal: <strong>Website Redesign & CRM Migration</strong> currently in Negotiation stage. Expected close October 12.
              </p>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                Tip: Rapid resolution on this ticket directly protects contract signature.
              </div>
            </div>

            {/* Previous touchpoints */}
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider">
                Recent Interactions
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
                  <span>Outbound discovery call (18m)</span>
                  <span className="text-slate-400">Yesterday</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932]">
                  <span>Proposal #PR-102 opened 4x</span>
                  <span className="text-slate-400">Oct 02</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
