import React, { useState } from 'react';
import { ArrowRight, Building, CheckCircle2, Lock, Mail, Shield, User, Globe, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

const CRM_APP_URL = 'https://wordbitx-iota.vercel.app/';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    workspaceSlug: '',
    teamSize: '5-20',
    role: 'Founder / Executive'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { navigate } = useNavigation();

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    setFormData({
      ...formData,
      companyName: val,
      workspaceSlug: slug
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCreated(true);
    }, 800);
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
            Create your WordbitX Workspace
          </h1>
          <p className="text-xs text-slate-500">
            Start your 14-day free trial · No credit card required · Instant setup
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8">
          {isCreated ? (
            <div className="py-8 text-center space-y-5 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#122e28] text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs border border-emerald-100 dark:border-[#1e483e]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Workspace Initialized!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Your dedicated tenant at <code className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-[#122e28] font-mono text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-[#1e483e]">app.wordbitx.com/{formData.workspaceSlug || 'my-workspace'}</code> is ready.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={CRM_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                    iconRight={<ExternalLink className="w-4 h-4" />}
                  >
                    Enter Live WordbitX CRM
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alex Morgan"
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
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
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
                      required
                      value={formData.companyName}
                      onChange={handleCompanyChange}
                      placeholder="ABC Technologies"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  >
                    <option>Founder / Executive</option>
                    <option>Head of Sales</option>
                    <option>Call Center Lead</option>
                    <option>Customer Support Manager</option>
                    <option>Agency Account Lead</option>
                  </select>
                </div>
              </div>

              {/* Workspace URL Slug Preview */}
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Workspace URL Domain (Tenant Identifier)
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 dark:border-[#183932] bg-slate-50 dark:bg-[#0e2722] px-3 py-2 text-xs font-mono">
                  <span className="text-slate-400">app.wordbitx.com/</span>
                  <input
                    type="text"
                    value={formData.workspaceSlug}
                    onChange={(e) => setFormData({ ...formData, workspaceSlug: e.target.value })}
                    placeholder="my-workspace"
                    className="bg-transparent text-emerald-700 dark:text-emerald-400 font-semibold focus:outline-none flex-1 ml-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Estimated Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                >
                  <option value="1-5">1 – 5 Users</option>
                  <option value="5-20">5 – 20 Users</option>
                  <option value="20-50">20 – 50 Users</option>
                  <option value="50+">50+ Enterprise</option>
                </select>
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
                  Create Workspace & Start Free
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#183932] text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
