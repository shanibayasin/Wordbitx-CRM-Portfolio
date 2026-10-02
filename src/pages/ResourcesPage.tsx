import React from 'react';
import { BookOpen, FileText, ArrowRight, ShieldCheck, Sparkles, Terminal, Headphones, GitPullRequest } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const ResourcesPage: React.FC = () => {
  const { navigate } = useNavigation();

  const guides = [
    { title: 'CRM Implementation Playbook', category: 'Playbook', desc: 'A step-by-step framework for transitioning your revenue team from disconnected spreadsheets to a unified pipeline without deal leakage.', icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'Sales Velocity & Qualification Guide', category: 'Sales Strategy', desc: 'How to structure multi-factor lead scoring, qualification checklists, and weighted forecasting stages that reflect true purchase intent.', icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'Omnichannel Call Center Architecture', category: 'Telephony', desc: 'Best practices for bridging SIP trunks, Twilio WebRTC, and PBX systems with native CRM caller screen-pops.', icon: <Headphones className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'Automation Blueprints Library', category: 'Automation', desc: '10 essential workflows for automated round-robin lead routing, SLA breach notifications, and post-sale onboarding tickets.', icon: <GitPullRequest className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'AI-Assisted Sales Operations', category: 'AI Intelligence', desc: 'Leveraging contextual LLMs for deal summaries, objection-handling follow-up drafts, and stalled negotiation detection.', icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'Enterprise Data Isolation & RBAC', category: 'Security & Tech', desc: 'Designing multi-tenant workspace partitions, permission matrices, and audit logging for holding companies and agencies.', icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'REST API & Webhooks Developer Docs', category: 'Engineering', desc: 'Complete endpoint references, payload schemas, HMAC verification examples, and SDK quickstarts for custom builds.', icon: <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { title: 'Customer Support SLA Playbook', category: 'Customer Success', desc: 'Techniques for commercial support desks that prioritize high-value contract accounts while maintaining rapid response times.', icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
  ];

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            WordbitX Knowledge & Playbooks
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Operational guides, playbooks, and architecture blueprints.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Explore industry best practices on pipeline hygiene, telephony setups, SLA enforcement, and workflow automation.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {guides.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-[#122e28] border border-emerald-100 dark:border-[#1e483e]">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#122e28] text-slate-600 dark:text-slate-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#183932]">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline cursor-pointer inline-flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
