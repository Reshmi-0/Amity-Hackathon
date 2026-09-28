import React from 'react';
import { useItems } from '../context/ItemsContext';
import { Sparkles, CheckCircle2, PackageSearch } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const { items, totalMatches } = useItems();

  const totalReported = items.length;
  const totalRecovered = items.filter(i => i.returned).length;

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      <div className="glass px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-slate-600 shadow-xs">
        <PackageSearch className="w-3.5 h-3.5 text-[#5B7BFA]" />
        <span><strong className="text-[#0F2A5C] font-semibold">{totalReported}</strong> Reported</span>
      </div>

      <div className="glass px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50/50 border-amber-200/40 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span><strong className="text-amber-900 font-semibold">{totalMatches}</strong> Potential Matches</span>
      </div>

      <div className="glass px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50/50 border-emerald-200/40 shadow-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span><strong className="text-emerald-900 font-semibold">{totalRecovered}</strong> Recovered</span>
      </div>
    </div>
  );
};
