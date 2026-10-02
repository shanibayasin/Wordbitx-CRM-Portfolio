'use client';

import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const CRM_APP_URL = 'https://wordbitx-iota.vercel.app/';

export const Footer: React.FC = () => {
  const { navigate, openExploreDemo } = useNavigation();

  return (
    <footer className="bg-[#0b1f1b] text-slate-300 border-t border-[#183932] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl text-base font-black bg-emerald-400 text-[#0b1f1b] shadow-sm">
                W
              </span>
              <span>
                <span className="block text-base font-bold tracking-tight text-white leading-tight">
                  Wordbit<span className="text-emerald-400">X</span>
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                  CRM
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The unified CRM and business operations platform for modern sales pipelines, customer 360 histories, call center operations, intelligent automations, and team performance.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <button
                onClick={openExploreDemo}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:underline font-bold cursor-pointer"
              >
                <span>Live CRM Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <span className="text-[#183932]">·</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Operational</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/features')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  All Features
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/#sales-pipeline')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Sales Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/#call-center')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Call Center
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/#customer-support')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/#automation')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Workflow Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/#ai-crm')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  AI CRM Assistant
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/integrations')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Integrations Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/solutions#sales-teams')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Sales Teams
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions#call-centers')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Call Centers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions#customer-support')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Support Desks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions#agencies')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Digital Agencies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions#real-estate')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Real Estate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions#enterprise')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Enterprise
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/resources')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Guides & Playbooks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Contact Team
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/demo')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Book a Demo
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400">
                  Client Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#183932] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} WordbitX Inc. All rights reserved. Built for modern high-performance revenue operations.
          </div>
          <div className="flex items-center gap-5">
            <span className="hover:text-emerald-400 cursor-pointer">
              Privacy Policy
            </span>
            <span>·</span>
            <span className="hover:text-emerald-400 cursor-pointer">
              Terms of Service
            </span>
            <span>·</span>
            <span className="hover:text-emerald-400 cursor-pointer">
              Security Governance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
