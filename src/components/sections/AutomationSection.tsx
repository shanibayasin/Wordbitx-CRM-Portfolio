import React, { useState } from 'react';
import {
  GitPullRequest,
  Check,
  Play,
  ArrowDown,
  Sparkles,
  Zap,
  Users,
  Bell,
  Clock,
  RotateCcw,
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AutomationSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 700);
    setTimeout(() => setActiveStep(3), 1400);
    setTimeout(() => setActiveStep(4), 2100);
    setTimeout(() => setActiveStep(5), 2800);
    setTimeout(() => {
      setIsRunning(false);
    }, 3200);
  };

  const resetSimulation = () => {
    setActiveStep(0);
    setIsRunning(false);
  };

  const automationTemplates = [
    { title: 'Assign Qualified Leads', desc: 'Route score > 80 leads to senior reps within 12 seconds.', icon: <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
    { title: 'Automated Follow-Up Tasks', desc: 'Create calendar reminders and pre-drafted emails when deals move.', icon: <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" /> },
    { title: 'Manager Escalation Alerts', desc: 'Notify team lead whenever an enterprise deal negotiation stalls.', icon: <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" /> },
    { title: 'Support SLA Auto-Escalation', desc: 'Reassign open tickets approaching SLA breach to on-call engineers.', icon: <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> },
  ];

  return (
    <section id="automation" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Intelligent Process Orchestration
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Automate the work between the work.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Design branch-aware workflows that trigger assignments, follow-up deadlines, and multi-channel notifications without code.
          </p>
        </div>

        {/* Visual Workflow Builder Showcase */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#183932]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">Rule #WF-109</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Enterprise Inbound Fast-Track</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Trigger: On Inbound Lead Creation · Status: Active</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetSimulation}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                disabled={isRunning}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={runSimulation}
                isLoading={isRunning}
                className="bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]"
                icon={<Play className="w-3.5 h-3.5" />}
              >
                {isRunning ? 'Executing Logic...' : 'Run Test Execution'}
              </Button>
            </div>
          </div>

          {/* Flowchart Visual Nodes */}
          <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
            {/* Step 1: Trigger */}
            <div
              className={`w-full p-4 rounded-xl border text-center transition-all ${
                activeStep >= 1
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Event Trigger
              </span>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                New Lead Created (Ahmed Khan · ABC Technologies)
              </div>
            </div>

            <div className={`transition-colors ${activeStep >= 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'}`}>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* Step 2: Evaluation */}
            <div
              className={`w-full p-4 rounded-xl border text-center transition-all ${
                activeStep >= 2
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Condition Check
              </span>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                Is Lead Score &gt; 80? (Actual Score: 92/100)
              </div>
            </div>

            <div className={`transition-colors ${activeStep >= 2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'}`}>
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 3: Branch Decision (Yes branch active) */}
            <div
              className={`w-full p-4 rounded-xl border text-center transition-all ${
                activeStep >= 3
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>Condition Met: YES (High Priority Route)</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                Assign to VIP Senior Rep (Sarah Ahmed)
              </div>
            </div>

            <div className={`transition-colors ${activeStep >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'}`}>
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 4: Secondary Action */}
            <div
              className={`w-full p-4 rounded-xl border text-center transition-all ${
                activeStep >= 4
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Scheduled Task
              </span>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                Create 15-Minute SLA Follow-up Task on Sarah's Calendar
              </div>
            </div>

            <div className={`transition-colors ${activeStep >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'}`}>
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 5: Final Notification */}
            <div
              className={`w-full p-4 rounded-xl border text-center transition-all ${
                activeStep >= 5
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                  : 'border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#071714]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Dispatch Notification
              </span>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                Dispatch Slack Alert to #sales-leads & Notify Sales Director
              </div>
              {activeStep >= 5 && (
                <div className="mt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  ✓ Workflow execution completed successfully in 0.42 seconds
                </div>
              )}
            </div>
          </div>

          {/* Ready-made automation blueprints */}
          <div className="pt-6 border-t border-slate-200 dark:border-[#183932]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Pre-Configured Automation Blueprints
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {automationTemplates.map((t, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-[#183932] bg-[#f5f8f6]/80 dark:bg-[#071714]/60">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
                    {t.icon}
                    <span>{t.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
