'use client';

import React, { useState } from 'react';
import { Check, Minus, ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { PRICING_TIERS, PRICING_COMPARISON } from '../data/pricingData';
import { FAQ_DATA } from '../data/faqData';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { navigate } = useNavigation();

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Simple & Transparent Plans
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Choose the right foundation for your revenue team.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Start with our 14-day free trial on any plan. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-[#122e28] p-0.5 transition-colors cursor-pointer"
              aria-label="Toggle billing frequency"
            >
              <div
                className={`w-5 h-5 rounded-full bg-emerald-600 transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
            <span className={isYearly ? 'text-slate-900 dark:text-white flex items-center gap-1.5' : 'text-slate-500'}>
              <span>Annual Billing</span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  tier.popular
                    ? 'bg-white dark:bg-[#0b1f1b] border-2 border-emerald-600 dark:border-emerald-500 shadow-xl ring-1 ring-emerald-500/20'
                    : 'bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#0b1f1b] dark:bg-emerald-500 dark:text-[#071714] px-3 py-1 rounded-full shadow-xs">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500">/ user / mo</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isYearly ? 'Billed annually' : 'Billed monthly'}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#183932] space-y-2 text-xs">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Included capabilities:
                    </span>
                    {tier.features.map((feat, i) => (
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
                      tier.popular ? 'bg-[#0b1f1b] hover:bg-[#12332c] text-white border-transparent' : ''
                    }`}
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 35: Full Comparison Table Across 6 Categories */}
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Comprehensive Feature Comparison
            </h2>
            <p className="text-xs text-slate-500">Compare specifications across Starter, Business, and Enterprise tiers</p>
          </div>

          <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-[#183932] bg-slate-50 dark:bg-[#0e2722]">
                    <th className="py-4 px-6 font-bold text-slate-900 dark:text-white w-2/5">Capabilities</th>
                    <th className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300 text-center w-1/5">Starter</th>
                    <th className="py-4 px-4 font-semibold text-emerald-700 dark:text-emerald-400 text-center w-1/5">Business</th>
                    <th className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300 text-center w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#183932]">
                  {PRICING_COMPARISON.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr className="bg-slate-50/70 dark:bg-[#0d231e]">
                        <td colSpan={4} className="py-2.5 px-6 font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400">
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((f, fIdx) => (
                        <tr key={fIdx} className="hover:bg-slate-50/50 dark:hover:bg-[#122e28] transition-colors">
                          <td className="py-3 px-6 text-slate-800 dark:text-slate-200 font-medium">
                            {f.name}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">
                            {typeof f.starter === 'boolean' ? (
                              f.starter ? <Check className="w-4 h-4 text-emerald-600 inline" /> : <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 inline" />
                            ) : (
                              <span>{f.starter}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-medium text-slate-900 dark:text-white">
                            {typeof f.business === 'boolean' ? (
                              f.business ? <Check className="w-4 h-4 text-emerald-600 inline" /> : <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 inline" />
                            ) : (
                              <span>{f.business}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-medium text-slate-900 dark:text-white">
                            {typeof f.enterprise === 'boolean' ? (
                              f.enterprise ? <Check className="w-4 h-4 text-emerald-600 inline" /> : <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 inline" />
                            ) : (
                              <span>{f.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pricing FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-6 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Pricing & Billing FAQ
            </h2>
            <p className="text-xs text-slate-500">Common questions about plans, billing, and trial transitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ_DATA.slice(0, 4).map((faq) => (
              <div key={faq.id} className="p-5 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] space-y-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{faq.question}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
