import React from 'react';
import { History, TrendingUp, PhoneCall, Mail, UserPlus, Clock, CheckCircle } from 'lucide-react';

export const ActivityTimelineSection: React.FC = () => {
  const events = [
    {
      group: 'Today',
      time: '10:42 AM',
      title: 'Deal Stage Advanced',
      desc: 'Opportunity "Website Redesign & CRM Migration" moved from Qualified → Proposal ($8,500).',
      actor: 'Sarah Ahmed',
      badge: 'Pipeline',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
    },
    {
      group: 'Today',
      time: '09:30 AM',
      title: 'Automated Follow-up Task Created',
      desc: 'System generated 15-minute follow-up task triggered by website proposal download.',
      actor: 'Workflow Engine',
      badge: 'Automation',
      icon: <Clock className="w-3.5 h-3.5 text-amber-500" />
    },
    {
      group: 'Yesterday',
      time: '04:15 PM',
      title: 'Outbound Call Completed (18m 42s)',
      desc: 'Telephone call with Ahmed Khan (+1 555-019-2834). Disposition: Proposal Requested.',
      actor: 'Sarah Ahmed',
      badge: 'Telephony',
      icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
    },
    {
      group: 'Sep 30',
      time: '02:14 PM',
      title: 'New Lead Ingested & Qualified',
      desc: 'Inbound submission received from Ahmed Khan (ABC Technologies). Intent score calculated at 92/100.',
      actor: 'Lead Capture',
      badge: 'Inbound',
      icon: <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Immutable Audit Trail
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Every action, timestamped and clear.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Never wonder who spoke with a client, when a contract was modified, or which automated rule executed.
          </p>
        </div>

        {/* Timeline Visual Container */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-md p-6 sm:p-8">
          <div className="relative border-l-2 border-slate-200 dark:border-[#183932] ml-4 space-y-8 pl-6">
            {events.map((evt, idx) => (
              <div key={idx} className="relative group">
                {/* Node marker */}
                <div className="absolute -left-[33px] top-1 w-6 h-6 rounded-full bg-white dark:bg-[#0e2722] border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        {evt.icon}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {evt.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {evt.group} · {evt.time}
                      </span>
                      <span>·</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {evt.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                    {evt.desc}
                  </p>

                  <div className="text-[11px] text-slate-400 pl-7">
                    Initiated by: <span className="text-slate-700 dark:text-slate-300 font-medium">{evt.actor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
