'use client';

import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '../../data/pricingData';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { navigate } = useNavigation();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Transparent Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Predictable plans that scale with your team.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Every plan includes unified contact histories and sales pipelines. Upgrade as your team adds call center telephony and automated workflows.
          </p>

          {/* Billing Toggle (Monthly / Yearly) */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>
              Monthly Billing
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label="Use annual billing rates"
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 rounded-full bg-[#0b1f1b] dark:bg-emerald-950 p-0.5 transition-colors cursor-pointer border border-emerald-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div
                className={`w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <span className={isYearly ? 'text-slate-900 dark:text-white flex items-center gap-1.5' : 'text-slate-500'}>
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/80">
                Annual rate
              </span>
            </span>
          </div>
        </div>

        <p className="-mt-8 mb-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Illustrative portfolio pricing · Plan details and rates are examples for this preview, not a purchase offer.
        </p>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  tier.popular
                    ? 'bg-white dark:bg-[#0e2722] border-2 border-emerald-500 shadow-xl ring-1 ring-emerald-500/20'
                    : 'bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs hover:border-slate-300'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-[#0b1f1b] border border-emerald-500/40 px-3 py-1 rounded-full shadow-xs">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-display text-slate-950 dark:text-white tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500">/ user / month</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isYearly ? 'Billed annually' : 'Billed monthly'}
                    </span>
                  </div>

                  {/* Feature list */}
                  <div className="pt-4 border-t border-slate-100 dark:border-[#183932] space-y-2.5 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Included capabilities:
                    </span>
                    {tier.features.slice(0, 7).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    variant={tier.popular ? 'primary' : 'outline'}
                    size="md"
                    onClick={() => {
                      if (tier.id === 'enterprise') navigate('/contact');
                      else navigate('/signup');
                    }}
                    className={`w-full justify-center ${
                      tier.popular
                        ? 'bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300 border-none font-bold'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-[#12352e]/60 dark:text-slate-200 border-none'
                    }`}
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/pricing')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View complete 36-feature comparison matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
