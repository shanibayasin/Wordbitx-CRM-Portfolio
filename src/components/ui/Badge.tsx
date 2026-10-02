import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'info' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-semibold tracking-tight',
    md: 'text-xs px-2.5 py-1 rounded-md font-semibold tracking-tight'
  };

  const variantStyles = {
    neutral: 'bg-slate-100 dark:bg-[#12352e]/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#183932]',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-800/60',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/90 dark:border-amber-800/60',
    info: 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200/90 dark:border-sky-800/60',
    purple: 'bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300/80 dark:border-emerald-700/60'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
