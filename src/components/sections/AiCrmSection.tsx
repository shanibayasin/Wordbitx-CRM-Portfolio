'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  TrendingUp,
  FileText,
  Mail,
  RefreshCw,
  Lightbulb,
  Check,
  Copy
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AiCrmSection: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFollowUp, setGeneratedFollowUp] = useState<string>(
    "Hi Ahmed,\n\nThank you for sharing your website redesign and CRM migration goals yesterday. I've attached our customized proposal outlining the 15-seat deployment and SIP telephony integration ($8,500 total).\n\nAre you free for 10 minutes tomorrow at 10:30 AM Central to review the rollout timeline?\n\nBest regards,\nSarah"
  );
  const [copied, setCopied] = useState(false);

  const [assistantQuery, setAssistantQuery] = useState('Which leads need follow-up today?');
  const [assistantResponse, setAssistantResponse] = useState({
    title: '8 High-Priority Leads Require Follow-up',
    details: '3 have not been contacted in more than 48 hours. Top recommendation: Ahmed Khan (ABC Technologies, Score: 92) requested final pricing review.'
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedFollowUp(
        "Hi Ahmed,\n\nFollowing our call regarding the ABC Technologies platform migration, I've confirmed that our engineering team can support your custom webhook retries out of the box. Our proposal remains locked at $8,500 with zero setup fees.\n\nLet me know if tomorrow at 10:30 AM still works for our final sign-off call!\n\nBest,\nSarah"
      );
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedFollowUp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setQuerySample = (query: string, respTitle: string, respDetails: string) => {
    setAssistantQuery(query);
    setAssistantResponse({ title: respTitle, details: respDetails });
  };

  return (
    <section id="ai-crm" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Context-Grounded Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Your CRM, with intelligence built in.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Explore AI CRM concepts for summarizing customer context, drafting follow-ups, scoring leads, and surfacing deal signals. This interactive preview uses sample content only; it does not run AI processing or access CRM data.
          </p>
        </div>

        <p className="mx-auto -mt-8 mb-8 w-fit rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-center text-xs font-medium text-slate-600 dark:border-[#183932] dark:bg-[#0e2722] dark:text-slate-300">
          Product concept preview · Sample output only · No AI service connected
        </p>

        {/* 4 AI Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Card 1: AI Lead Summary & Deal Insights */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#183932]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">AI Lead Summary</h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded">
                High Intent — 92%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f8f6] dark:bg-[#12352e]/40 border border-slate-200 dark:border-[#183932] text-xs text-slate-700 dark:text-slate-200 leading-relaxed italic">
              &quot;Ahmed is highly interested in the website package. He requested a proposal and has an estimated budget of $8,000–$10,000. Decision timeline is early next week.&quot;
            </div>

            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-950 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                AI Deal Health Signal
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                &quot;Deal activity has increased over the last 7 days. The customer requested pricing details, indicating strong purchase intent. Close probability upgraded from 60% to 80%.&quot;
              </p>
            </div>
          </div>

          {/* Card 2: Interactive AI Follow-up Generator */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#183932]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white">AI Follow-up Generator</h3>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  className="bg-[#0b1f1b] hover:bg-[#12352e] dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300 border-none text-xs"
                  icon={<RefreshCw className="w-3 h-3" />}
                >
                  Generate Follow-up
                </Button>
              </div>

              <div className="relative mt-3">
                <textarea
                  readOnly
                  aria-label="Illustrative AI follow-up draft"
                  value={generatedFollowUp}
                  rows={6}
                  className="w-full p-3.5 rounded-xl bg-[#f5f8f6] dark:bg-[#12352e]/30 border border-slate-200 dark:border-[#183932] text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed resize-none focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  aria-label={copied ? 'Sample draft copied' : 'Copy sample draft'}
                  className="absolute bottom-3 right-3 p-1.5 rounded-md bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Illustrative draft for this preview. No AI request was sent.
            </p>
          </div>
        </div>

        {/* Card 3: Interactive AI Sales Assistant Console */}
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI Sales Assistant Concept · Sample Responses</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              aria-label="Ask the sample AI sales assistant"
              value={assistantQuery}
              onChange={(e) => setAssistantQuery(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f5f8f6] dark:bg-[#12352e]/40 border border-slate-200 dark:border-[#183932] text-xs text-slate-900 dark:text-white focus:outline-emerald-500"
            />
            <Button
              variant="primary"
              size="md"
              onClick={() => setAssistantResponse({
                title: 'Sample response only',
                details: `This preview does not run AI processing or access CRM data. Your prompt (“${assistantQuery || 'No prompt entered'}”) was not sent.`,
              })}
              className="w-full sm:w-auto bg-[#0b1f1b] hover:bg-[#12352e] dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300"
            >
              Preview response
            </Button>
          </div>

          {/* Quick sample prompt chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] text-slate-500">Suggested queries:</span>
            <button
              type="button"
              onClick={() =>
                setQuerySample(
                  'Which leads need follow-up today?',
                  '8 High-Priority Leads Require Follow-up',
                  '3 have not been contacted in more than 48 hours. Top recommendation: Ahmed Khan (ABC Technologies, Score: 92) requested final pricing review.'
                )
              }
              className="px-2.5 py-1 rounded-lg bg-emerald-50/80 dark:bg-[#12352e]/50 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 hover:border-emerald-400 transition-colors text-xs cursor-pointer"
            >
              Which leads need follow-up today?
            </button>
            <button
              type="button"
              onClick={() =>
                setQuerySample(
                  'Which deals have stalled in negotiation over 14 days?',
                  '2 Stalled Deals Detected',
                  'Apex Retail ($7,800) and FinFlow Corp ($11,400) have had zero activity for 16 days. Recommend scheduling a check-in.'
                )
              }
              className="px-2.5 py-1 rounded-lg bg-emerald-50/80 dark:bg-[#12352e]/50 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 hover:border-emerald-400 transition-colors text-xs cursor-pointer"
            >
              Which deals are stalled &gt; 14 days?
            </button>
          </div>

          {/* AI Response Output */}
          <div className="p-4 rounded-xl bg-[#f5f8f6] dark:bg-[#12352e]/30 border border-slate-200 dark:border-[#183932] text-xs space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{assistantResponse.title}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {assistantResponse.details}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
