import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigation } from '../context/NavigationContext';

export const DemoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '5-20',
    role: 'Head of Sales',
    features: ['Sales Pipeline & Kanban', 'AI Follow-up Assistant'],
    date: '2026-10-15',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const { openExploreDemo } = useNavigation();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 700);
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
            Walk through custom sales pipelines, telephony queue configurations, and AI workflows configured specifically for your team's industry.
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
                  Demo Session Scheduled!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  A calendar invitation and Google Meet link have been prepared for <strong>{formData.email}</strong> on <strong>{formData.date}</strong>.
                </p>
              </div>

              <div className="p-4 max-w-md mx-auto rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] text-xs text-left space-y-1">
                <div><strong>Host:</strong> Senior Solutions Architect</div>
                <div><strong>Attendee:</strong> {formData.name} ({formData.company})</div>
                <div><strong>Focus Areas:</strong> {formData.features.join(', ')}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="primary" size="md" onClick={openExploreDemo} className="bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white">
                  Explore Live App While Waiting
                </Button>
                <Button variant="outline" size="md" onClick={() => setIsBooked(false)}>
                  Modify Booking
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
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
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Inc."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Team Size
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

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Sales Director"
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
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Additional notes / questions
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specific questions about phone systems or migrations..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full justify-center bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                >
                  Confirm & Schedule Demo
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
