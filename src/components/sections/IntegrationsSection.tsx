import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { INTEGRATIONS_DATA } from '../../data/integrationsData';

export const IntegrationsSection: React.FC = () => {
  // Show first 8 integrations on homepage
  const featured = INTEGRATIONS_DATA.slice(0, 8);

  return (
    <section id="integrations" className="py-20 md:py-28 bg-[#f4f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Ecosystem Connectivity
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Explore concepts for connecting WordbitX to your team&apos;s tools.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Browse illustrative concepts for email, telephony, messaging, and developer workflows.
          </p>
        </div>

        <p className="mb-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Concept catalog only · No integrations are verified as live or available from this public-site preview
        </p>

        {/* 8 Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {featured.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${item.iconColor}`}>
                    {item.name.split(' ')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      item.status === 'Planned concept'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#183932]'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                  {item.tagline}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-[#183932]">
                Category: <span className="text-slate-700 dark:text-slate-300 font-medium">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Directory CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/integrations"
            className="inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-sm px-4.5 py-2.5 rounded-lg gap-2 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-800 dark:bg-[#0e2722] dark:text-slate-200 dark:hover:border-emerald-500 border border-slate-300 dark:border-[#183932] shadow-xs"
          >
            Explore Complete Integrations Directory (12+)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
