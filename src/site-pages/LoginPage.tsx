'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowRight } from 'lucide-react';
import { getSignInErrorMessage } from '../../wordbitx/lib/authErrors';

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (!result?.ok) {
        setError(getSignInErrorMessage(result?.error));
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    } catch (signInError) {
      console.error('Sign-in request failed', signInError);
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Sign in securely to your WordbitX workspace.
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8 space-y-6"
        >
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
            >
              {error}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-[#25463f] dark:bg-[#071714] dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-[#25463f] dark:bg-[#071714] dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-transparent bg-[#0b1f1b] px-5.5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#12332c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in…' : 'Sign in to WordbitX CRM'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>

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
        </form>
      </div>
    </div>
  );
};
