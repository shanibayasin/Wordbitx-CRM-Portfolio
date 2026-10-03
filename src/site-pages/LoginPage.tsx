import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
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
            Sign in securely through the WordbitX CRM application.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            This public site does not process login credentials. Continue to the CRM application to sign in or reset your password.
          </p>

          <Link
            href="/dashboard/login"
            className="inline-flex w-full items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-sm px-5.5 py-3 rounded-xl gap-2.5 bg-[#0b1f1b] hover:bg-[#12332c] text-white border border-transparent"
          >
            Sign in to WordbitX CRM
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Connects to live CRM */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#183932] text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have a workspace yet?{' '}
              <Link
                href="/signup"
                className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Create a workspace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
