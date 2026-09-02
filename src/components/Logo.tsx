import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showCaption?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'emerald';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showCaption = true,
  className = '',
  variant = 'light'
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Icon Graphic */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 p-0.5 shadow-md shadow-emerald-900/20 flex items-center justify-center`}>
        <div className="w-full h-full bg-slate-950/20 rounded-[14px] flex items-center justify-center backdrop-blur-[1px]">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4/5 h-4/5">
            {/* Outer Circular Leaf */}
            <path
              d="M24 4C13 4 4 13 4 24C4 35 13 44 24 44C35 44 44 35 44 24C44 13 35 4 24 4Z"
              stroke="#A7F3D0"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.6"
            />
            {/* Recycle arrows and leaf shape */}
            <path
              d="M24 8C17 8 11.5 13 10.2 19.5L14 18.5"
              stroke="#34D399"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M37.8 28.5C36.5 35 31 40 24 40L25 36"
              stroke="#34D399"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M38 18C35 12 29 9 22 10"
              stroke="#6EE7B7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Tech circuit node & leaf core */}
            <circle cx="24" cy="24" r="5" fill="#10B981" />
            <path d="M24 19V29M19 24H29" stroke="#ECFDF5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="34" cy="16" r="2" fill="#34D399" />
            <path d="M30 20L34 16" stroke="#34D399" strokeWidth="1.5" />
            <circle cx="14" cy="32" r="2" fill="#34D399" />
            <path d="M18 28L14 32" stroke="#34D399" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${titleSizes[size]} ${variant === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-emerald-600 dark:text-emerald-400">E</span>WASTE
          </span>
          <span className="hidden xs:inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-md border border-emerald-300/50">
            Official
          </span>
        </div>
        {showCaption && (
          <div className="flex flex-col">
            <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase ${variant === 'dark' ? 'text-emerald-300/90' : 'text-emerald-700'}`}>
              E-Waste Classification
            </span>
            <span className={`hidden sm:inline-block text-[8px] tracking-normal font-medium ${variant === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Pickup & Recycling Management
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
