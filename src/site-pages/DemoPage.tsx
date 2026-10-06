'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const DemoPage: React.FC = () => {
  const [formData, setFormData] = useState(() => {
    const preferredDate = new Date();
    preferredDate.setDate(preferredDate.getDate() + 7);

    return {
      name: '',
      email: '',
      company: '',
      phone: '',
      teamSize: '5-20',
      role: 'Head of Sales',
      features: ['Sales Pipeline & Kanban', 'AI Follow-up Assistant'],
      preferredDate: formatLocalDate(preferredDate),
      preferredTime: '10:00',
      message: '',
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState('');

  const handleFeatureToggle = (featureName: string) => {
    if (formData.features.includes(featureName)) {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f !== featureName)
      });
    } else {
      setFormData({
        ...formData,
        features: [...formData.features, featureName]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/public/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          teamSize: formData.teamSize,
          role: formData.role,
          features: formData.features,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
        }),
      });
      const result = await response.json().catch(() => null) as { success?: boolean; error?: string } | null;

      if (!response.ok || !result?.success) {
        setError(result?.error || 'We could not send your demo request. Please try again.');
        return;
      }

      setIsBooked(true);
    } catch (submitError) {
      console.error('Demo request submission failed', submitError);
      setError('Unable to reach the demo request service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Guided Platform Tour
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Book a 1-on-1 personalized WordbitX demo.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Walk through custom sales pipelines, telephony queue configurations, and AI workflows configured specifically for your team&apos;s industry.
          </p>
        </div>

        <div className="bg-white dark:bg-[#0b1f1b] rounded-2xl border border-slate-200/80 dark:border-[#183932] shadow-xl p-6 sm:p-8">
          {isBooked ? (
            <div className="py-12 text-center space-y-5 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-[#122e28] text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs border border-emerald-100 dark:border-[#1e483e]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Demo request sent
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Thanks, {formData.name}. Your request has been sent to our team. We&apos;ll follow up about your preferred date.
                </p>
              </div>

              <div className="p-4 max-w-md mx-auto rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] text-xs text-left space-y-1">
                <div><strong>Preferred date and time:</strong> {formData.preferredDate} at {formData.preferredTime}</div>
                <div><strong>Focus areas:</strong> {formData.features.join(', ') || 'None selected'}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="outline" size="md" onClick={() => setIsBooked(false)}>
                  Send another request
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {error && (
                <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  {error}
                </p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send us your details and our team will follow up about your demo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    aria-label="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    maxLength={120}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    aria-label="Work email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    maxLength={254}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    aria-label="Company name"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Inc."
                    maxLength={120}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    aria-label="Phone number"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 010 1234"
                    maxLength={40}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Team Size
                  </label>
                  <select
                    aria-label="Team size"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  >
                    <option value="1-5">1 – 5 Users</option>
                    <option value="5-20">5 – 20 Users</option>
                    <option value="20-50">20 – 50 Users</option>
                    <option value="50+">50+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Role
                  </label>
                  <input
                    type="text"
                    aria-label="Your role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Sales Director"
                    maxLength={120}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Feature Interests Selection */}
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Select Focus Areas for the Demo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Sales Pipeline & Kanban',
                    'Call Center & SIP Telephony',
                    'AI Follow-up Assistant',
                    'Customer Support SLA Desk',
                    'Multi-Workspace Agency Model',
                    'REST API & Webhooks'
                  ].map((feat) => {
                    const isChecked = formData.features.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => handleFeatureToggle(feat)}
                        disabled={isSubmitting}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-[#122e28] border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold'
                            : 'bg-slate-50 dark:bg-[#0e2722] border-slate-200 dark:border-[#183932] text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{feat}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Preferred Demo Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={formatLocalDate(new Date())}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Preferred Demo Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    What would you like us to cover? *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your goals, questions, or anything you'd like to see..."
                    maxLength={2000}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600 resize-y"
                  />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full justify-center bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                >
                  {isSubmitting ? 'Sending demo request…' : 'Send Demo Request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
