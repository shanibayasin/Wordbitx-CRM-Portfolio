'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building, Mail, User, CircleCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
        }),
      });
      const result = await response.json().catch(() => null) as
        | { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> }
        | null;

      if (!response.ok || !result?.success) {
        const fieldErrors = Object.values(result?.fieldErrors ?? {}).flat();
        setError(fieldErrors.join(' ') || result?.error || 'Unable to submit your workspace request. Please try again.');
        return;
      }

      setRequestSubmitted(true);
    } catch (signupError) {
      console.error('Workspace request submission failed', signupError);
      setError('Unable to reach the request service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0b1f1b] text-white font-bold text-2xl shadow-md border border-emerald-900/40">
            W
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Request a WordbitX Workspace
          </h1>
          <p className="text-xs text-slate-500">
            Submit your workspace details for administrator approval.
          </p>
        </div>

        {requestSubmitted ? (
          <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-emerald-200 dark:border-emerald-900 shadow-xl p-6 sm:p-8 text-center space-y-4">
            <CircleCheck className="mx-auto h-10 w-10 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Request sent for review</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              If approved, we’ll email {formData.email} a secure one-time link to set your password and activate your workspace.
            </p>
            <Link href="/" className="inline-flex text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              Back to home
            </Link>
          </div>
        ) : (
        <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {error}
              </p>
            )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      aria-label="Full name"
                      required
                      minLength={2}
                      maxLength={120}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alex Morgan"
                      disabled={isLoading}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      aria-label="Work email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      disabled={isLoading}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      aria-label="Company name"
                      required
                      minLength={2}
                      maxLength={120}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="ABC Technologies"
                      disabled={isLoading}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>
                </div>
              </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              No account or workspace is created until an administrator approves your request.
            </p>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="w-full justify-center bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Sending Request…' : 'Send Workspace Request'}
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#183932] text-center text-xs text-slate-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Sign in
                </Link>
              </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};
