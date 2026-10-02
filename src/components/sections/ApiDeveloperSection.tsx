import React, { useState } from 'react';
import { Terminal, Key, Webhook, Code2, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const ApiDeveloperSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const snippet = `curl -X POST https://api.wordbitx.com/v1/leads \\
  -H "Authorization: Bearer wbx_live_sec_9942a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Ahmed Khan",
    "email": "ahmed@abctech.com",
    "company": "ABC Technologies",
    "estimated_value": 8500,
    "tags": ["Enterprise", "WebsiteRedesign"]
  }'`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Developer Architecture
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.15] text-balance">
              Built to fit your workflow.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Integrate WordbitX programmatically with your internal stack. Ingest leads via authenticated webhooks, sync closed revenue with finance ERPs, or trigger automated SMS sequences via REST.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>REST API v1 with JSON responses & OpenAPI specifications</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Webhook className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Real-time webhook events with HMAC signature verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Scoped API tokens with read/write granularity per workspace</span>
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
                  <span className="text-[11px] text-emerald-400 font-mono ml-2">POST /api/v1/leads</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#12352e] hover:bg-[#183932] text-emerald-200 transition-colors text-[11px] border border-emerald-800 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code */}
              <div className="p-5 overflow-x-auto text-[11px] sm:text-xs leading-relaxed">
                <pre className="text-slate-300">
                  <span className="text-emerald-500/70"># Ingest lead programmatically</span>{'\n'}
                  <span className="text-emerald-300 font-bold">curl</span> -X POST https://api.wordbitx.com/v1/leads \{'\n'}
                  {'  '}-H <span className="text-emerald-400">"Authorization: Bearer wbx_live_sec_9942a"</span> \{'\n'}
                  {'  '}-H <span className="text-emerald-400">"Content-Type: application/json"</span> \{'\n'}
                  {'  '}-d <span className="text-amber-300">{`'{`}</span>{'\n'}
                  {'    '}<span className="text-emerald-300">"name"</span>: <span className="text-emerald-200">"Ahmed Khan"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"email"</span>: <span className="text-emerald-200">"ahmed@abctech.com"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"company"</span>: <span className="text-emerald-200">"ABC Technologies"</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"estimated_value"</span>: <span className="text-amber-400">8500</span>,{'\n'}
                  {'    '}<span className="text-emerald-300">"tags"</span>: [<span className="text-emerald-200">"Enterprise"</span>, <span className="text-emerald-200">"WebsiteRedesign"</span>]{'\n'}
                  {'  '}<span className="text-amber-300">{`}'`}</span>
                </pre>
              </div>

              {/* Response status */}
              <div className="px-5 py-2.5 bg-[#071714] border-t border-emerald-900/50 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Response: 201 Created (42ms)</span>
                <span className="text-emerald-400 font-bold">id: "ld_9942817x"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
