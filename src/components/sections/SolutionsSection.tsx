'use client';

import React from 'react';
import { ArrowRight, Sparkles, Target, Headphones, Users, Building, ShoppingBag, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const SolutionsSection: React.FC = () => {
  const { navigate } = useNavigation();

  const solutions = [
    { title: 'Sales Teams', desc: 'Manage leads, deals and multi-stage visual pipelines with weighted revenue forecasting.', icon: <Target className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#sales-teams' },
    { title: 'Call Centers', desc: 'Track agents, inbound queues, screen-pops and customer call dispositions in real time.', icon: <Headphones className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#call-centers' },
    { title: 'Customer Support', desc: 'Manage tickets and SLA countdowns with full commercial deal context.', icon: <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#customer-support' },
    { title: 'Agencies', desc: 'Manage multiple client pipelines and retainers with clean workspace isolation.', icon: <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#agencies' },
    { title: 'Real Estate', desc: 'Manage property buyers, viewing schedules, and commission closing milestones.', icon: <Building className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#real-estate' },
    { title: 'E-commerce & Retail', desc: 'Manage high-value customer accounts and omnichannel sales opportunities.', icon: <ShoppingBag className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#ecommerce' },
    { title: 'Growing Businesses', desc: 'Centralize fragmented business operations into one reliable operating system.', icon: <TrendingUp className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#growing-businesses' },
    { title: 'Enterprise Operations', desc: 'Customize workflows, enforce strict RBAC, and integrate through REST/Webhooks.', icon: <Shield className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />, href: '/solutions#enterprise' },
  ];

  return (
    <section id="solutions" className="py-20 md:py-28 bg-[#f5f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Tailored Industry & Team Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Engineered for every revenue team.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Whether you operate an outbound sales floor, an omnichannel support desk, or a multi-client agency, WordbitX adapts to your workflow.
          </p>
        </div>

        {/* 8 Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.href)}
              className="p-5 rounded-xl border border-slate-200 dark:border-[#183932] bg-white dark:bg-[#0e2722] shadow-xs flex flex-col justify-between space-y-4 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all cursor-pointer group"
            >
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-3 group-hover:scale-105 transition-transform">
                  {item.icon}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 pt-2">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
