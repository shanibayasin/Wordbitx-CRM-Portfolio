import React from 'react';
import { Lock, FileText, Database, UserCheck } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Tenant-Level Data Isolation',
      desc: 'Workspaces operate with strict tenant isolation barriers, preventing cross-organization record access.',
      icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Role-Based Access Control',
      desc: 'Enforce minimal necessary privilege with granular permission matrices down to field-level access.',
      icon: <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Audit Logging & Activity Trails',
      desc: 'Every record creation, export, and status mutation is recorded with immutable actor timestamps.',
      icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Secure Authentication & Sessions',
      desc: 'Centralized session revocation, multi-factor token verification, and environment secret handling.',
      icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Security Design Concepts
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Security belongs at the foundation of a customer workspace.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            The product concept prioritizes confidentiality, workspace isolation, permission boundaries, and auditable activity. This preview does not verify deployed controls, audits, or certifications.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#f5f8f6] dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#12352e] w-fit border border-slate-200/80 dark:border-[#183932]">
                {p.icon}
              </div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
