'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Kanban, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button.tsx';
import { Input } from '../../../components/ui/Input.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/Card.tsx';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 12) {
      setError('Password must be at least 12 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json().catch(() => null) as
        | { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> }
        | null;

      if (!response.ok || !result?.success) {
        const fieldErrors = Object.values(result?.fieldErrors ?? {}).flat();
        setError(fieldErrors.join(' ') || result?.error || 'Registration failed.');
        return;
      }

      setIsCreated(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? 'Unable to reach the registration service. Please try again.' : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-950/90 text-white shadow-2xl backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Kanban className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {isCreated ? 'Administrator account created' : 'Set Up WordbitX Admin'}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isCreated
              ? 'Your account is ready. Sign in to manage the WordbitX workspace.'
              : 'Create the first administrator account for the WordbitX workspace. This one-time setup closes after registration.'}
          </CardDescription>
        </CardHeader>

        {isCreated ? (
          <CardFooter className="flex flex-col space-y-3 pt-2">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2">
                <span>Continue to Sign In</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </CardFooter>
        ) : <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                  placeholder="e.g. Marcus Wright"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Work Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                  placeholder="marcus@apex.io"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                  placeholder="At least 12 characters"
                  minLength={12}
                  maxLength={128}
                  required
                />
              </div>
            </div>

          </CardContent>

          <CardFooter className="flex flex-col space-y-3 pt-2">
            <Button type="submit" isLoading={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2">
              <span>Create Admin Account</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <p className="text-xs text-center text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>}
      </Card>
    </div>
  );
}
