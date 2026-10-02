import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4.5 py-2.5 rounded-lg gap-2',
    lg: 'text-sm font-bold px-5.5 py-3 rounded-xl gap-2.5'
  };

  const variantStyles = {
    primary:
      'bg-[#0b1f1b] text-white hover:bg-[#12352e] active:bg-[#071714] dark:bg-emerald-400 dark:text-[#0b1f1b] dark:hover:bg-emerald-300 dark:active:bg-emerald-500 shadow-md shadow-emerald-950/10 border border-[#0b1f1b] dark:border-emerald-400',
    secondary:
      'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 active:bg-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/60 dark:active:bg-emerald-900 border border-emerald-200/80 dark:border-emerald-800/80',
    outline:
      'bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-800 dark:bg-[#0e2722] dark:text-slate-200 dark:hover:border-emerald-500 border border-slate-300 dark:border-[#183932] shadow-xs active:bg-slate-50 dark:active:bg-[#12352e]',
    ghost:
      'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-emerald-50/70 hover:text-emerald-800 dark:hover:bg-[#12352e]/50 dark:hover:text-emerald-300 border border-transparent',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 border border-rose-600 shadow-sm'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && !isLoading ? <span className="shrink-0">{iconRight}</span> : null}
    </button>
  );
};
