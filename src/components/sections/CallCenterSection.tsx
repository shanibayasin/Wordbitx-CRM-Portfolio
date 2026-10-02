'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  Headphones,
  Users,
  Activity,
  Play,
  CheckCircle2,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const CallCenterSection: React.FC = () => {
  const [activeQueueTab, setActiveQueueTab] = useState<'agents' | 'live_calls' | 'telephony'>('agents');

  const agents = [
    {
      id: 'ag-1',
      name: 'Sarah Ahmed',
      role: 'Senior Sales Executive',
      status: 'Online',
      statusColor: 'bg-emerald-500',
      calls: 24,
      resolved: 21,
      avgDuration: '04:32',
      csat: '4.9/5'
    },
    {
      id: 'ag-2',
      name: 'Marcus Vance',
      role: 'Solutions Architect',
      status: 'In Call',
      statusColor: 'bg-emerald-700 dark:bg-emerald-400',
      calls: 19,
      resolved: 18,
      avgDuration: '06:15',
      csat: '4.8/5'
    },
    {
      id: 'ag-3',
      name: 'Elena Rostova',
      role: 'Support Specialist',
      status: 'Online',
      statusColor: 'bg-emerald-500',
      calls: 31,
      resolved: 29,
      avgDuration: '03:45',
      csat: '5.0/5'
    },
    {
      id: 'ag-4',
      name: 'David Chen',
      role: 'Inbound SDR',
      status: 'Wrap-up',
      statusColor: 'bg-amber-500',
      calls: 22,
      resolved: 20,
      avgDuration: '04:10',
      csat: '4.7/5'
    }
  ];

  return (
    <section id="call-center" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Unified Telephony Operations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Connect conversations to the customer context.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Never answer a call unprepared. WordbitX surfaces caller deal value, previous tickets, and relationship history before the first ring is answered.
          </p>
        </div>

        {/* Call Center Console Preview */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          {/* Top Real-time Telemetry Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#183932] bg-slate-50/80 dark:bg-[#0b1f1b]/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-2">
              <span className="text-[11px] text-slate-500 font-bold block">Agents Online</span>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">6 Available</span>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 font-bold block">Calls Waiting</span>
              <span className="text-lg font-bold text-amber-700 dark:text-amber-400 tabular-nums">2 in Queue</span>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 font-bold block">Active Calls</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">4 Ongoing</span>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 font-bold block">Missed / Abandon</span>
              <span className="text-lg font-bold text-slate-500 tabular-nums">0 (0.0%)</span>
            </div>
            <div className="p-2 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 font-bold block">Avg Duration</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">04:32</span>
            </div>
          </div>

          {/* Screen-pop Demonstration Strip */}
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-200/80 dark:border-emerald-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-950 dark:text-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold">Live Screen-Pop:</span>
              <span>Incoming call from <strong>Ahmed Khan (+1 555-019-2834)</strong></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">· Active Deal: $8,500</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Auto-routed to Sarah Ahmed</span>
            </div>
          </div>

          {/* Navigation inside Console */}
          <div className="flex items-center px-6 border-b border-slate-200 dark:border-[#183932] gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveQueueTab('agents')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeQueueTab === 'agents'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Agent Presence & Performance (4)
            </button>
            <button
              onClick={() => setActiveQueueTab('live_calls')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeQueueTab === 'live_calls'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Call Log & Recordings
            </button>
            <button
              onClick={() => setActiveQueueTab('telephony')}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeQueueTab === 'telephony'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Telephony Integrations Stack
            </button>
          </div>

          {/* Console Content */}
          <div className="p-6">
            {activeQueueTab === 'agents' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-[#183932] text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-bold">Agent Name</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Calls Today</th>
                      <th className="pb-3 font-bold">Resolved</th>
                      <th className="pb-3 font-bold">Avg Duration</th>
                      <th className="pb-3 font-bold text-right">CSAT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#183932]">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-emerald-50/40 dark:hover:bg-[#12352e]/30 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{agent.name}</div>
                          <div className="text-[11px] text-slate-400">{agent.role}</div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${agent.statusColor}`}></span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{agent.status}</span>
                          </div>
                        </td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white tabular-nums">{agent.calls}</td>
                        <td className="py-3 text-emerald-700 dark:text-emerald-400 font-bold tabular-nums">{agent.resolved}</td>
                        <td className="py-3 text-slate-600 dark:text-slate-300 tabular-nums">{agent.avgDuration}</td>
                        <td className="py-3 text-right font-bold text-slate-900 dark:text-white tabular-nums">{agent.csat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeQueueTab === 'live_calls' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-[#183932] flex items-center justify-between bg-white dark:bg-[#0e2722]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <PhoneIncoming className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Ahmed Khan (ABC Technologies)</div>
                      <div className="text-[11px] text-slate-500">Agent: Sarah Ahmed · 18m 42s · Disposition: Proposal Requested</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Recording stored</span>
                    <button className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer" title="Play recording">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-[#183932] flex items-center justify-between bg-white dark:bg-[#0e2722]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <PhoneOutgoing className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Rachel Vance (Nova Labs)</div>
                      <div className="text-[11px] text-slate-500">Agent: Marcus Vance · 12m 10s · Disposition: Technical Review</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Recording stored</span>
                    <button className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer" title="Play recording">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeQueueTab === 'telephony' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200 dark:border-[#183932]">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    Connect your existing telephony stack
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    WordbitX bridges to your telecom infrastructure using standard SIP trunks and APIs. Keep your existing phone numbers, contracts, and carrier rates while unlocking native CRM screen-pops.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722]">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Twilio Voice API</strong>
                    <span className="text-[11px] text-slate-500">Cloud WebRTC & auto-dialer support</span>
                    <span className="block mt-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Available</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722]">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Vonage API</strong>
                    <span className="text-[11px] text-slate-500">Global SIP trunking & IVR integration</span>
                    <span className="block mt-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Connect Ready</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722]">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Custom SIP / PBX</strong>
                    <span className="text-[11px] text-slate-500">Asterisk, FreePBX, Cisco & Avaya bridges</span>
                    <span className="block mt-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Enterprise</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
