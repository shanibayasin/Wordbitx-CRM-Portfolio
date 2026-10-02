import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { navigate } = useNavigation();

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#0b1f1b] text-white border-b border-emerald-950/60 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-slate-300">
          <span className="font-bold text-white">WordbitX 2.0</span>
          <span className="hidden sm:inline text-emerald-800">·</span>
          <span className="hidden sm:inline">Unified CRM, Telephony Call Center & Intelligent Operations</span>
          <button
            onClick={() => navigate('/demo')}
            className="inline-flex items-center gap-1 font-bold text-emerald-300 hover:text-emerald-200 transition-colors ml-1 underline underline-offset-2 cursor-pointer"
          >
            <span>Book a live demo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-emerald-400 hover:text-white p-1 -mr-1 transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
