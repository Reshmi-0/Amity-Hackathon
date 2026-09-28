import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Plus, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionTo?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'Try adjusting your search keywords or clearing filters.',
  actionText = 'Report an Item',
  actionTo = '/report',
  onReset,
}) => {
  return (
    <div className="glass rounded-3xl p-10 text-center my-6 flex flex-col items-center justify-center border border-white/80">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#5B7BFA] mb-4 shadow-inner">
        <SearchX className="w-8 h-8 stroke-[1.75]" />
      </div>

      <h3 className="text-lg font-bold text-[#0F2A5C] mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
        {description}
      </p>

      <div className="flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="py-2 px-4 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}

        {actionTo && (
          <Link
            to={actionTo}
            className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
