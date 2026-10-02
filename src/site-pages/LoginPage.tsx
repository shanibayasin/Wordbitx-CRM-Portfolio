'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

const CRM_APP_URL = 'https://wordbitx-iota.vercel.app/';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { navigate, openExploreDemo } = useNavigation();

  const handleFillDemo = () => {
    setEmail('sarah.ahmed@abctech.com');
    setPassword('demo-wordbitx-2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Open modal or transition to live app
      window.open(CRM_APP_URL, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-md w-full space-y-8">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0b1f1b] text-white font-bold text-2xl shadow-md border border-emerald-900/40">
            W
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Sign in to WordbitX
          </h1>
          <p className="text-xs text-slate-500">
            Enter your workspace credentials or use the demo shortcut below
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8 space-y-6">
          {/* Quick Demo Autofill Banner */}
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-[#122e28] border border-emerald-200/80 dark:border-[#1e483e] flex items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-emerald-950 dark:text-emerald-200">
                Testing the Platform?
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Autofill demo sales lead credentials</div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0b1f1b] text-white hover:bg-[#12332c] dark:bg-emerald-500 dark:text-[#0b1f1b] transition-colors shrink-0"
            >
              Fill Demo
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-0"
                />
                <span className="text-slate-600 dark:text-slate-400">Remember workspace</span>
              </label>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full justify-center bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Workspace
              </Button>
            </div>
          </form>

          {/* Connects to live CRM */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#183932] text-center space-y-2">
            <p className="text-xs text-slate-500">
              Don't have a workspace yet?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Create a workspace
              </button>
            </p>
            <div>
              <a
                href={CRM_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 inline-flex items-center gap-1"
              >
                <span>Direct link to live CRM application</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
