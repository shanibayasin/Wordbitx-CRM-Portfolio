import React from 'react';
import { Target, Users2, Headphones, Activity, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const capabilities = [
    { name: 'Sales Pipeline & Revenue', icon: <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
    { name: 'Inbound & Outbound Marketing', icon: <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
    { name: 'Customer Success & Retention', icon: <Users2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
    { name: 'Support & Telephony Operations', icon: <Headphones className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
    { name: 'Operations & Workflow Rules', icon: <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
  ];

  return (
    <section className="py-12 border-y border-slate-200 dark:border-[#183932] bg-white dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            A unified view of customer operations
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Product concepts for collaboration across revenue, call-center, and service teams
          </p>
        </div>

        {/* 5 Capability pillars */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6]/80 dark:bg-[#0e2722]/50 flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors shadow-2xs"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-[#12352e] shadow-xs shrink-0">
                {cap.icon}
              </div>
              <span className="leading-snug">{cap.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
