import React from 'react';
import { Shield, Check, Minus, Lock } from 'lucide-react';

interface MatrixRow {
  module: string;
  admin: string;
  manager: string;
  sales: string;
  support: string;
  viewer: string;
}

export const RbacMatrixSection: React.FC = () => {
  const rows: MatrixRow[] = [
    { module: 'Leads & Inbound Ingestion', admin: 'Full Control', manager: 'Manage & Assign', sales: 'Own Leads', support: 'Read Only', viewer: 'Read Only' },
    { module: 'Customer & Contact Profiles', admin: 'Full Control', manager: 'Full Control', sales: 'Full Control', support: 'Full Control', viewer: 'Read Only' },
    { module: 'Sales Pipelines & Deals', admin: 'Full Control', manager: 'Full Control', sales: 'Assigned Deals', support: 'Read Only', viewer: 'Read Only' },
    { module: 'Analytics & ARR Reports', admin: 'Full Control', manager: 'Full Control', sales: 'Personal Stats', support: 'Ticket Stats', viewer: 'Aggregate' },
    { module: 'Team Members & Seats', admin: 'Full Control', manager: 'View Team', sales: 'No Access', support: 'No Access', viewer: 'No Access' },
    { module: 'Workflow Automation Engine', admin: 'Full Control', manager: 'View & Test', sales: 'No Access', support: 'No Access', viewer: 'No Access' },
    { module: 'Workspace & Security Settings', admin: 'Full Control', manager: 'No Access', sales: 'No Access', support: 'No Access', viewer: 'No Access' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Governance & Compliance
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Role-based access, finely tuned.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Maintain strict security boundaries with pre-configured operational roles or define custom permission matrices across your organization.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#0e2722] rounded-2xl border border-slate-200 dark:border-[#183932] shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#183932] bg-[#f5f8f6] dark:bg-[#12352e]/50">
                  <th className="py-3.5 px-4 font-bold text-slate-950 dark:text-white">Workspace Module</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400">Super Admin / Admin</th>
                  <th className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Manager</th>
                  <th className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Sales Agent</th>
                  <th className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">Support Agent</th>
                  <th className="py-3.5 px-4 font-semibold text-slate-500">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#183932]">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white">{row.module}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        {row.admin}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                      {row.manager === 'No Access' ? (
                        <span className="text-neutral-400 flex items-center gap-1"><Minus className="w-3.5 h-3.5" /> No Access</span>
                      ) : (
                        <span className="font-medium">{row.manager}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                      {row.sales === 'No Access' ? (
                        <span className="text-neutral-400 flex items-center gap-1"><Minus className="w-3.5 h-3.5" /> No Access</span>
                      ) : (
                        <span className="font-medium">{row.sales}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                      {row.support === 'No Access' ? (
                        <span className="text-neutral-400 flex items-center gap-1"><Minus className="w-3.5 h-3.5" /> No Access</span>
                      ) : (
                        <span className="font-medium">{row.support}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">
                      {row.viewer === 'No Access' ? (
                        <span className="text-neutral-400 flex items-center gap-1"><Minus className="w-3.5 h-3.5" /> None</span>
                      ) : (
                        <span>{row.viewer}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
