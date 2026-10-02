'use client';

import React from 'react';
import { ArrowRight, ExternalLink, Check, Sparkles, Layers } from 'lucide-react';
import { INTEGRATIONS_DATA } from '../../data/integrationsData';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const IntegrationsSection: React.FC = () => {
  const { navigate } = useNavigation();

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
            Connect WordbitX to the tools your team already uses.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Whether you run on Google Workspace, Microsoft Exchange, Twilio WebRTC, or custom on-premises SIP telecom switches, WordbitX connects smoothly.
          </p>
        </div>

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
                      item.status === 'Available'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : item.status === 'Connect'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : item.status === 'Enterprise'
                        ? 'bg-slate-100 dark:bg-[#12352e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#183932]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
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
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/integrations')}
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Integrations Directory (12+)
          </Button>
        </div>
      </div>
    </section>
  );
};
