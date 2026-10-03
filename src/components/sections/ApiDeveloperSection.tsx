'use client';

import React, { useState } from 'react';
import { Key, Webhook, Code2, Copy, Check } from 'lucide-react';

export const ApiDeveloperSection: React.FC = () => {
  const [copyMessage, setCopyMessage] = useState('');

  const snippet = `curl -X POST https://api.example.test/v1/leads \\
  -H "Authorization: Bearer wbx_live_sec_9942a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Example Lead",
    "email": "lead@example.test",
    "company": "Example Organization",
    "estimated_value": 0,
    "tags": ["example"]
  }'`;

  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyMessage('Clipboard copy is unavailable in this browser.');
      return;
    }

    try {
      await navigator.clipboard.writeText(snippet);
      setCopyMessage('Example request copied.');
    } catch {
      setCopyMessage('Copy failed. Select the example request to copy it manually.');
    }

    setTimeout(() => setCopyMessage(''), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Developer Integration Concepts
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.15] text-balance">
              Built to fit your workflow.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              This illustrative API request shows one possible lead-ingestion workflow. The public-site preview does not expose or verify a live endpoint.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Example REST request and JSON payload</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Webhook className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Webhook event design concept</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Workspace-scoped token model concept</span>
              </div>
            </div>
          </div>

          {/* Right code snippet (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-emerald-900/60 bg-[#0b1f1b] text-slate-200 shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-900/50 bg-[#071714]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-900/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-800/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-700/80"></span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono ml-2">Example · POST /v1/leads</span>
                </div>

                <button
                  type="button"
                  aria-label="Copy example API request"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#12352e] hover:bg-[#183932] text-emerald-200 transition-colors text-[11px] border border-emerald-800 cursor-pointer"
                >
                  {copyMessage === 'Example request copied.' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copyMessage === 'Example request copied.' ? 'Copied' : 'Copy example'}</span>
                </button>
              </div>
              <p role="status" aria-live="polite" className="sr-only">{copyMessage}</p>

              {/* Code */}
              <div className="p-5 overflow-x-auto text-[11px] sm:text-xs leading-relaxed">
                <pre className="text-slate-300 whitespace-pre-wrap">{snippet}</pre>
              </div>

              {/* Response status */}
              <div className="px-5 py-2.5 bg-[#071714] border-t border-emerald-900/50 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Illustrative response format · no request is sent</span>
                <span className="text-emerald-400 font-bold">Example response · not from a live endpoint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
