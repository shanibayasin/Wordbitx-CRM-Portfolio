'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    companySize: '11-50',
    interest: 'Full CRM & Telephony Suite',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="w-full py-12 md:py-20 bg-[#f5f8f6] dark:bg-[#071714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Get in Touch
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Talk to our product & revenue specialists.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Have questions about telephone hardware compatibility, custom API integrations, or volume pricing? We're here to help.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Direct Operational Inquiries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with our dedicated teams based on your immediate need.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932]">
                  <div className="font-semibold text-slate-900 dark:text-white">Enterprise Sales</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">Custom volume pricing, PBX setups & pilot trials</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] mt-1">sales@wordbitx.com</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932]">
                  <div className="font-semibold text-slate-900 dark:text-white">Technical Support</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">API documentation, webhooks & developer sandbox</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] mt-1">support@wordbitx.com</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e2722] border border-slate-200/80 dark:border-[#183932]">
                  <div className="font-semibold text-slate-900 dark:text-white">Agency & Technology Partnerships</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">SIP telecom providers & agency multi-workspace programs</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] mt-1">partners@wordbitx.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0b1f1b] border border-slate-200/80 dark:border-[#183932] shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-[#122e28] text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-100 dark:border-[#1e483e]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Thank you! Your message has been received.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    A WordbitX specialist will review your request and get back to you within 2 business hours.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
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
                        placeholder="sarah@company.com"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Global"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Company Size
                      </label>
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                      >
                        <option value="1-10">1 – 10 Employees</option>
                        <option value="11-50">11 – 50 Employees</option>
                        <option value="51-200">51 – 200 Employees</option>
                        <option value="201+">201+ Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Primary Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                      >
                        <option>Full CRM & Telephony Suite</option>
                        <option>Sales Pipeline & Leads Only</option>
                        <option>Call Center Queue Operations</option>
                        <option>Agency Multi-Workspace</option>
                        <option>Custom API & On-Premises SIP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      How can our team help you? *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your team size, current pain points, or specific telephony needs..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-[#183932] bg-white dark:bg-[#071714] text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                      className="w-full justify-center bg-[#0b1f1b] hover:bg-[#12332c] border-transparent text-white"
                    >
                      Talk to our team
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
