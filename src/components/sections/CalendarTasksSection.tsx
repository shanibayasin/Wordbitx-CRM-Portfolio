'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckSquare, Clock, Phone, Video } from 'lucide-react';

export const CalendarTasksSection: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Ahmed Khan (ABC Technologies)', time: '10:30 AM', category: 'Phone Call', done: true },
    { id: 2, text: 'Send revised SOW proposal to Nova Labs', time: '02:00 PM', category: 'Proposal', done: false },
    { id: 3, text: 'Follow-up with Vertex Solutions stakeholder', time: '04:15 PM', category: 'Follow-up', done: false },
    { id: 4, text: 'Resolve payment webhook ticket #WB-1042', time: '05:00 PM', category: 'Support Ticket', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <section className="py-20 md:py-28 bg-[#f4f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Execution & Agenda Sync
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Tasks and calendar in perfect lockstep.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Never drop a follow-up or miss a scheduled demo. Meetings, outbound dialing queues, and contract tasks integrate directly with Google Calendar and Outlook.
          </p>
        </div>

        {/* Dual Panel Grid: Tasks on left, Calendar Agenda on right */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#183932]">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Today&apos;s Priority Tasks</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {tasks.filter((t) => t.done).length} / {tasks.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    task.done
                      ? 'bg-slate-50 dark:bg-[#071714]/60 border-slate-200 dark:border-[#183932] opacity-60'
                      : 'bg-white dark:bg-[#12352e]/40 border-slate-200 dark:border-[#183932] shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                    />
                    <div>
                      <span className={`font-semibold ${task.done ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {task.text}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-0.5">{task.category}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 shrink-0">{task.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Agenda */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#183932]">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Live Calendar Schedule</h3>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                Google & Outlook Synced
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#12352e]/30 border border-slate-200 dark:border-[#183932] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Call Ahmed Khan (Closing Review)</div>
                    <div className="text-[11px] text-slate-500">10:30 AM – 11:00 AM · Google Meet auto-generated</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40">
                  Confirmed
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#12352e]/30 border border-slate-200 dark:border-[#183932] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Nova Labs Telephony Architecture Demo</div>
                    <div className="text-[11px] text-slate-500">01:00 PM – 01:45 PM · 4 Attendees</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40">
                  Meeting
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#12352e]/30 border border-slate-200 dark:border-[#183932] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Weekly Pipeline & Forecast Review</div>
                    <div className="text-[11px] text-slate-500">04:30 PM – 05:00 PM · Sales Team</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  Internal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
