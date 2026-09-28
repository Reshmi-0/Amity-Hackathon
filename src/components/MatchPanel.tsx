import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Match, Item } from '../types';
import { ItemThumb } from './ItemThumb';
import { StatusPill } from './StatusPill';
import { MatchRing } from './MatchRing';
import { fmtShort } from '../lib/format';
import { Sparkles, MapPin, Calendar, ArrowRight, X } from 'lucide-react';

interface MatchPanelProps {
  reportedItem: Item;
  matches: Match[];
  isOpen: boolean;
  onClose: () => void;
}

export const MatchPanel: React.FC<MatchPanelProps> = ({
  reportedItem,
  matches,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen || matches.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-modal w-full max-w-xl rounded-3xl p-6 sm:p-8 relative shadow-2xl border border-white/95 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Match Detection</span>
          </div>

          <h3 className="text-2xl font-extrabold text-[#0F2A5C] tracking-tight">
            We found {matches.length} possible match{matches.length > 1 ? 'es' : ''}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Based on your reported {reportedItem.type} item "{reportedItem.name}", someone may have already reported the matching listing.
          </p>
        </div>

        {/* Matches list */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {matches.slice(0, 3).map(({ item, score }) => (
            <div
              key={item.id}
              className="glass p-4 rounded-2xl border border-slate-200/60 hover:border-[#5B7BFA]/50 transition-all flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <ItemThumb item={item} size="sm" />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-[#0F2A5C] truncate">{item.name}</h4>
                    <StatusPill type={item.type} />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#5B7BFA] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3 text-[#5B7BFA] shrink-0" />
                      <span>{fmtShort(item.date)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Match ring & View button */}
              <div className="flex items-center gap-3 shrink-0">
                <MatchRing score={score} size={48} strokeWidth={4} />

                <button
                  onClick={() => {
                    onClose();
                    navigate(`/item/${item.id}`);
                  }}
                  className="py-2 px-3 rounded-xl text-xs font-semibold text-white bg-brand-gradient hover:opacity-95 flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Smart Match computes text, category, location, and dates.
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-[#0F2A5C] transition-colors cursor-pointer"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};
