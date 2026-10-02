import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const demoTestimonials = [
    {
      quote:
        'Consolidating our sales pipeline and customer call logs into one system cut our weekly rep update meetings in half. Everyone has live context before dialing.',
      author: 'Product Demo Profile',
      role: 'VP of Sales',
      company: 'ABC Technologies (Demo Organization)',
      note: 'Example Portfolio Persona'
    },
    {
      quote:
        'The ability to isolate client pipelines while letting our central team manage retainers from a single login solved our biggest agency operational headache.',
      author: 'Operations Director',
      role: 'Agency Founder',
      company: 'Bright Agency (Demo Organization)',
      note: 'Example Portfolio Persona'
    },
    {
      quote:
        'Customer support seeing active deal negotiation values next to open tickets prevented multiple accidental renewals from slipping away.',
      author: 'Support Team Lead',
      role: 'Customer Success',
      company: 'Nova Labs (Demo Organization)',
      note: 'Example Portfolio Persona'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f4f8f6] dark:bg-[#071714] border-b border-slate-200/80 dark:border-[#183932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Portfolio Feedback Demonstration
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white tracking-tight text-balance">
            Designed for real operational impact.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
            Realistic example feedback demonstrating how cross-functional teams leverage WordbitX to streamline revenue and support operations.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demoTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0e2722] border border-slate-200 dark:border-[#183932] shadow-xs flex flex-col justify-between space-y-6 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-emerald-600 dark:text-emerald-400 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#183932]">
                <div className="font-bold text-xs text-slate-950 dark:text-white">{t.author}</div>
                <div className="text-[11px] text-slate-500">{t.role} · {t.company}</div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono mt-1 font-bold">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
