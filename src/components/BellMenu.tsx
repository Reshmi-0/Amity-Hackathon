import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { getMyReportedIds } from '../lib/storage';
import { Bell, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export const BellMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { items, matchesFor } = useItems();

  const myReportedIds = getMyReportedIds();
  const myItemsWithMatches = items
    .filter(i => myReportedIds.includes(i.id))
    .map(i => ({
      item: i,
      matches: matchesFor(i.id)
    }))
    .filter(entry => entry.matches.length > 0);

  const totalMatchAlerts = myItemsWithMatches.reduce((acc, curr) => acc + curr.matches.length, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 hover:text-[#5B7BFA] hover:bg-white transition-colors relative cursor-pointer"
        aria-label="Match Notifications"
      >
        <Bell className="w-5 h-5" />
        {totalMatchAlerts > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            {totalMatchAlerts}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-modal rounded-2xl shadow-2xl border border-white/90 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-[#0F2A5C]">Smart Match Alerts</h4>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {totalMatchAlerts} alert{totalMatchAlerts !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5">
            {myItemsWithMatches.length === 0 ? (
              <div className="text-center py-6 px-4">
                <p className="text-xs text-slate-500">
                  No new matches for your reports yet.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  When someone reports a matching item, you'll see it here!
                </p>
              </div>
            ) : (
              myItemsWithMatches.map(({ item, matches }) => (
                <div key={item.id} className="p-3 bg-blue-50/50 hover:bg-blue-50/90 rounded-xl transition-colors border border-blue-100/60">
                  <div className="text-xs font-semibold text-[#0F2A5C] mb-1 flex items-center justify-between">
                    <span>Your {item.type}: {item.name}</span>
                    <span className="text-[10px] text-[#5B7BFA] bg-blue-100/80 px-2 py-0.5 rounded-full">
                      {matches.length} match{matches.length > 1 ? 'es' : ''}
                    </span>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    {matches.slice(0, 2).map(m => (
                      <button
                        key={m.item.id}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(`/item/${m.item.id}`);
                        }}
                        className="w-full text-left text-xs bg-white/80 hover:bg-white p-2 rounded-lg border border-slate-200/60 flex items-center justify-between group transition-all cursor-pointer"
                      >
                        <div className="truncate mr-2">
                          <span className="font-medium text-slate-800">{m.item.name}</span>
                          <span className="text-slate-400 text-[11px] ml-1.5">({m.item.location})</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 text-amber-600 font-bold text-[11px]">
                          <span>{m.score}%</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#5B7BFA] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/my-reports');
              }}
              className="text-[#5B7BFA] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View My Reports</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <span className="text-[11px] text-slate-400">Auto-checked</span>
          </div>
        </div>
      )}
    </div>
  );
};
