import React from 'react';
import { ItemType } from '../types';

interface StatusPillProps {
  type: ItemType;
  returned?: boolean;
  className?: string;
  dotOnly?: boolean;
}

export const StatusPill: React.FC<StatusPillProps> = ({ type, returned, className = '', dotOnly = false }) => {
  if (returned) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Recovered
      </span>
    );
  }

  const isLost = type === 'lost';

  if (dotOnly) {
    return (
      <span className={`w-2 h-2 rounded-full ${isLost ? 'bg-rose-500' : 'bg-emerald-500'} ${className}`} />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
        isLost
          ? 'bg-[#FDE8EC] text-[#E5484D] border border-rose-200/50'
          : 'bg-[#E3F7EC] text-[#16A34A] border border-emerald-200/50'
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLost ? 'bg-[#E5484D]' : 'bg-[#16A34A]'}`}></span>
      {isLost ? 'Lost' : 'Found'}
    </span>
  );
};
