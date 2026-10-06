'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

export function WorkspaceInviteForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/complete-workspace-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
            ? payload.error
            : 'Unable to activate this workspace.';
        throw new Error(message);
      }
      setCompleted(true);
    } catch (activationError) {
      setError(activationError instanceof Error ? activationError.message : 'Unable to activate this workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workspace activated</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Your workspace is ready. Sign in using your email and the password you just set.
        </p>
        <Link href="/login" className="inline-flex font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
      {error && (
        <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="workspace-password" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Create password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            id="workspace-password"
            type="password"
            autoComplete="new-password"
            minLength={16}
            maxLength={128}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-slate-900 focus:outline-emerald-600 dark:border-[#183932] dark:bg-[#071714] dark:text-white"
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">Use a unique password of at least 16 characters.</p>
      </div>
      <div>
        <label htmlFor="workspace-password-confirm" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Confirm password
        </label>
        <input
          id="workspace-password-confirm"
          type="password"
          autoComplete="new-password"
          minLength={16}
          maxLength={128}
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-emerald-600 dark:border-[#183932] dark:bg-[#071714] dark:text-white"
        />
      </div>
      <Button type="submit" isLoading={isLoading} disabled={isLoading} className="w-full">
        {isLoading ? 'Activating workspace…' : 'Set password & activate'}
        {!isLoading && <ArrowRight className="ml-1.5 h-4 w-4" />}
      </Button>
    </form>
  );
}
