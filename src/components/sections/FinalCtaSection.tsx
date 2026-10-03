'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const FinalCtaSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="px-4 py-12 sm:px-5 sm:py-16 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#0b1f1b] px-5 py-8 text-white shadow-xl sm:px-10 sm:py-14 relative">
        {/* Subtle emerald aura */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            WordbitX product preview
          </span>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Bring your entire customer operation into focus.
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl leading-relaxed">
            Explore the WordbitX CRM concept, preview its key workflows, and see how the product experience is organized.
          </p>

          {/* Action Buttons matching template */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-emerald-400 text-[#0b1f1b] hover:bg-emerald-300 border-emerald-400 font-bold shadow-lg shadow-emerald-950/30"
              iconRight={<ArrowRight className="w-4 h-4 text-[#0b1f1b]" />}
            >
              Preview signup flow
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/demo')}
              className="border-emerald-800 bg-[#12352e] text-white hover:bg-[#183932] hover:border-emerald-600 shadow-none"
            >
              Request a demo
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="text-emerald-300 hover:text-white hover:bg-emerald-950/40"
            >
              Explore CRM preview
            </Button>
          </div>

          <p className="pt-2 text-xs text-emerald-200/70">
            Portfolio preview only · Account creation and demo requests are not connected to a backend.
          </p>
        </div>
      </div>
    </section>
  );
};
