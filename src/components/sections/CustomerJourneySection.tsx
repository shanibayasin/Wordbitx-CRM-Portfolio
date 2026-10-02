import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles, Check } from 'lucide-react';

interface JourneyStep {
  id: string;
  name: string;
  phase: 'Acquisition' | 'Conversion' | 'Fulfillment & Success';
  action: string;
  automatedBy: string;
  metric: string;
}

export const CustomerJourneySection: React.FC = () => {
  const steps: JourneyStep[] = [
    { id: 'lead', name: 'Lead', phase: 'Acquisition', action: 'Inbound capture via web form, ads, or API', automatedBy: 'Instant enrichment & duplicate check', metric: '0s delay' },
    { id: 'qualify', name: 'Qualification', phase: 'Acquisition', action: 'AI intent scoring based on company fit', automatedBy: 'Auto-scoring model (0-100)', metric: '92% accuracy' },
    { id: 'contact', name: 'Contact', phase: 'Acquisition', action: 'Direct phone dial or personalized email', automatedBy: 'Round-robin territory assignment', metric: '<14 min latency' },
    { id: 'deal', name: 'Deal Created', phase: 'Conversion', action: 'Kanban pipeline card generated with initial value', automatedBy: 'Opportunity stage automation', metric: '$8.5k avg value' },
    { id: 'followup', name: 'Follow-up', phase: 'Conversion', action: 'Automated task reminder with AI message prompt', automatedBy: 'SLA countdown task trigger', metric: '100% adherence' },
    { id: 'proposal', name: 'Proposal', phase: 'Conversion', action: 'Quote & scope of work shared with stakeholders', automatedBy: 'Dynamic PDF quote generator', metric: '2.4x speed' },
    { id: 'negotiation', name: 'Negotiation', phase: 'Conversion', action: 'Contract adjustments and stakeholder alignment', automatedBy: 'Executive deal alerts', metric: '42.8% win rate' },
    { id: 'won', name: 'Won Deal', phase: 'Conversion', action: 'Contract executed & payment received', automatedBy: 'Finance webhook trigger', metric: 'Zero manual entry' },
    { id: 'customer', name: 'Customer 360', phase: 'Fulfillment & Success', action: 'Unified account history and onboarding portal', automatedBy: 'Automatic workspace provisioning', metric: 'Instant kick-off' },
    { id: 'support', name: 'Support', phase: 'Fulfillment & Success', action: 'Context-rich ticket tracking and telephony calls', automatedBy: 'Caller ID screen-pop with deal history', metric: '04m avg resolve' },
    { id: 'retention', name: 'Retention', phase: 'Fulfillment & Success', action: 'Proactive health monitoring & renewal alerts', automatedBy: 'Usage & churn anomaly detection', metric: '94% net retention' },
  ];

  const [selectedStep, setSelectedStep] = useState<JourneyStep>(steps[3]); // Default to Deal

  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            End-to-End Operational Flow
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Your entire customer journey. One intelligent workspace.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Stop losing leads in fragmented point solutions. From first website click to ongoing contract renewals, every state transition happens in one living record.
          </p>
        </div>

        {/* Visual Interactive Pipeline Journey Ribbon */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="min-w-[960px] flex items-center justify-between gap-1 p-2 bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-sm">
            {steps.map((step, idx) => {
              const isSelected = selectedStep.id === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all text-center relative group cursor-pointer ${
                    isSelected
                      ? 'bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b] shadow-sm'
                      : 'hover:bg-emerald-50/70 dark:hover:bg-[#12352e] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`text-[10px] font-mono mb-1 ${isSelected ? 'text-emerald-300 dark:text-[#0b1f1b]' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold whitespace-nowrap">{step.name}</span>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-[#0b1f1b] mt-1"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Phase: {selectedStep.phase}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-500">Stage: {selectedStep.name}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                {selectedStep.action}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Automated mechanism: <strong className="text-slate-900 dark:text-white font-semibold">{selectedStep.automatedBy}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932] text-center md:text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">Benchmarked Impact</div>
              <div className="text-2xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                {selectedStep.metric}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Unified across sales & support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
