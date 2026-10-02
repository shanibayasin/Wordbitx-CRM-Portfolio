import React from 'react';
import { Users, Shield, Award, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TeamManagementSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Ahmed',
      role: 'Sales Lead',
      badge: 'Admin',
      avatarText: 'SA',
      activeLeads: 18,
      deals: '$68,500',
      tasksCompleted: 42,
      perf: '112% Quota'
    },
    {
      name: 'Marcus Vance',
      role: 'Enterprise AE',
      badge: 'Sales Agent',
      avatarText: 'MV',
      activeLeads: 12,
      deals: '$42,200',
      tasksCompleted: 38,
      perf: '104% Quota'
    },
    {
      name: 'Elena Rostova',
      role: 'Senior Support Desk',
      badge: 'Support Agent',
      avatarText: 'ER',
      activeLeads: 4,
      deals: '$34,800',
      tasksCompleted: 56,
      perf: '99.4% SLA'
    },
    {
      name: 'David Chen',
      role: 'Operations & Strategy',
      badge: 'Manager',
      avatarText: 'DC',
      activeLeads: 8,
      deals: '$24,000',
      tasksCompleted: 29,
      perf: 'Team Lead'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f4f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Collaborative Team Operations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Give every team member the right context.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Foster transparent accountability across account executives, customer support specialists, and executive managers with real-time performance visibility.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0b1f1b] text-emerald-300 font-black text-sm flex items-center justify-center shadow-xs">
                  {member.avatarText}
                </div>
                <Badge variant={member.badge === 'Admin' ? 'success' : member.badge === 'Manager' ? 'info' : 'neutral'}>
                  {member.badge}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-950 dark:text-white">{member.name}</h3>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#183932] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Active Leads</span>
                  <span className="font-bold text-slate-950 dark:text-white tabular-nums">{member.activeLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pipeline In Motion</span>
                  <span className="font-bold text-slate-950 dark:text-white tabular-nums">{member.deals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Performance</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{member.perf}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
