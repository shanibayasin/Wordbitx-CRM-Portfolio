import React, { useState } from 'react';
import {
  UserCheck,
  Building,
  Mail,
  Phone,
  Sparkles,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  FileText,
  TrendingUp,
  Tag,
  ArrowRight,
  X,
  MessageSquare
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const LeadManagementSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'view' | 'note' | 'task' | 'convert' | null>(null);
  const [notesList, setNotesList] = useState<string[]>([
    'Inbound inquiry via website redesign calculator.',
    'Ahmed confirmed $8,500 budget and requested custom proposal by Friday.'
  ]);
  const [newNote, setNewNote] = useState('');
  const [dealConverted, setDealConverted] = useState(false);
  const [tasksList, setTasksList] = useState<string[]>([
    'Send draft pricing schedule (Due Tomorrow, 10:30 AM)',
    'Review technical integration requirements with engineering'
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotesList([newNote, ...notesList]);
    setNewNote('');
    setActiveModal(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasksList([...tasksList, newTask]);
    setNewTask('');
    setActiveModal(null);
  };

  const handleConvert = () => {
    setDealConverted(true);
    setActiveModal(null);
  };

  return (
    <section id="lead-management" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Intelligent Lead Acquisition
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Turn every lead into an opportunity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Capture, qualify, assign, and nurture inbound leads from one unified screen. Score leads automatically using predictive intent signals so reps focus on high-yield conversations.
          </p>
        </div>

        {/* Lead Showcase Interactive Container */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-[#183932] flex flex-wrap items-center justify-between gap-4 bg-slate-50/80 dark:bg-[#0b1f1b]/80">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#0b1f1b] text-emerald-300 dark:bg-emerald-400 dark:text-[#0b1f1b] font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                AK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">Ahmed Khan</h3>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-500">VP of Technology</span>
                  {dealConverted && (
                    <Badge variant="success" size="sm">
                      Converted to Deal ($8,500)
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">ABC Technologies</span>
                  <span>·</span>
                  <span>Source: Website Form</span>
                </div>
              </div>
            </div>

            {/* Score & Status */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">AI Intent Score</div>
                <div className="text-xl font-bold font-display text-emerald-700 dark:text-emerald-400 tabular-nums">
                  92 <span className="text-xs font-normal text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-[#183932]"></div>

              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Qualified
                </span>
              </div>
            </div>
          </div>

          {/* Body: Key fields grid */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722] text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Assigned Owner</span>
              <div className="font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                  SA
                </span>
                Sarah Ahmed
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Last Activity</span>
              <span className="font-bold text-slate-900 dark:text-white mt-1 block">
                Proposal requested (Today)
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Next Follow-up</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 mt-1 block">
                Tomorrow, 10:30 AM
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">Est. Value</span>
              <span className="font-bold text-slate-900 dark:text-white mt-1 block tabular-nums">
                $8,500 USD
              </span>
            </div>
          </div>

          {/* Tags & notes preview */}
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-xs mr-1 font-semibold">Tags:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-[#12352e] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#183932] font-semibold">
                #Enterprise
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-[#12352e] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#183932] font-semibold">
                #WebsiteRedesign
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-[#12352e] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#183932] font-semibold">
                #HighBudget
              </span>
            </div>

            {/* Notes List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Recent Internal Notes ({notesList.length})</span>
                <span className="text-[11px] text-slate-400 font-normal">Encrypted & synced</span>
              </div>
              {notesList.map((n, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#f5f8f6] dark:bg-[#071714] border border-slate-200/80 dark:border-[#183932] text-xs text-slate-700 dark:text-slate-300">
                  {n}
                </div>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Scheduled Next Actions ({tasksList.length})</span>
              </div>
              {tasksList.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Actions Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#0b1f1b]/90 border-t border-slate-200 dark:border-[#183932] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Interactive controls: click any action to test live behavior
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModal('view')}
              >
                View Full Lead
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveModal('note')}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Note
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveModal('task')}
                icon={<Calendar className="w-3.5 h-3.5" />}
              >
                Create Task
              </Button>
              {!dealConverted ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveModal('convert')}
                  className="bg-[#0b1f1b] hover:bg-[#12352e] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]"
                  icon={<TrendingUp className="w-3.5 h-3.5" />}
                >
                  Convert to Deal
                </Button>
              ) : (
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  ✓ Deal Active in Pipeline
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal: View Full Lead */}
        {activeModal === 'view' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ahmed Khan — Complete Lead Record</h3>
              <p className="text-xs text-slate-500 mt-1">ID: #LD-8842 · Ingested via Landing Page UTM: organic_search</p>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-[#071714] rounded-lg border border-slate-200 dark:border-[#183932]">
                  <strong className="block text-slate-900 dark:text-white mb-1">Contact Intelligence:</strong>
                  <div>Email: ahmed@abctech.com</div>
                  <div>Phone: +1 (555) 019-2834</div>
                  <div>Location: Chicago, IL (Central Time)</div>
                  <div>Company Domain: abctech.com (50–100 employees)</div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-[#071714] rounded-lg border border-slate-200 dark:border-[#183932]">
                  <strong className="block text-slate-900 dark:text-white mb-1">Automated Scoring Breakdown:</strong>
                  <div>Company Size Fit: +30 pts</div>
                  <div>Budget &gt; $5k: +25 pts</div>
                  <div>Proposal Download Signal: +20 pts</div>
                  <div>Decision Maker Title: +17 pts</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold mt-1">Total: 92 / 100 (Tier 1 Priority)</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="primary" size="sm" onClick={() => setActiveModal(null)} className="bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]">
                  Close Record
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Note */}
        {activeModal === 'note' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <form onSubmit={handleAddNote} className="bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] max-w-md w-full p-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Internal Note</h3>
              <p className="text-xs text-slate-500 mt-1">Notes are visible to all assigned collaborators and sales managers.</p>

              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type note details (e.g. Discussed SLA terms on discovery call)..."
                rows={4}
                required
                className="mt-4 w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-500"
              />

              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]">
                  Save Note
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Create Task */}
        {activeModal === 'task' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <form onSubmit={handleAddTask} className="bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] max-w-md w-full p-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule Follow-up Task</h3>
              <p className="text-xs text-slate-500 mt-1">Sets an automated reminder with browser notification and calendar sync.</p>

              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Task description (e.g. Send revised contract draft)..."
                required
                className="mt-4 w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-500"
              />

              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-[#0b1f1b] text-white dark:bg-emerald-400 dark:text-[#0b1f1b]">
                  Add Task
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Convert to Deal */}
        {activeModal === 'convert' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Convert Lead to Active Deal?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will instantiate a new Opportunity in the <strong>Negotiation</strong> stage of your sales pipeline with an initial estimated value of <strong>$8,500 USD</strong>.
              </p>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConvert}
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white"
                >
                  Confirm Conversion
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
