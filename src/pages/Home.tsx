import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { ItemCard } from '../components/ItemCard';
import { StatsStrip } from '../components/StatsStrip';
import { ScriptNote } from '../components/ScriptNote';
import { StatusPill } from '../components/StatusPill';
import { EmptyState } from '../components/EmptyState';
import { FileText, ArrowRight, Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const { items, loading, error, refresh } = useItems();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Lost' | 'Found'>('All');

  // Filter items for Recent Listings
  const filteredItems = items.filter(item => {
    if (statusFilter === 'All') return true;
    return item.type === statusFilter.toLowerCase();
  });

  // Recent 8 items
  const recentItems = filteredItems.slice(0, 8);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-white/80 shadow-lg shadow-blue-500/5 bg-gradient-to-r from-white/80 via-white/60 to-blue-50/50 backdrop-blur-xl">
        {/* Soft background ambient shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F2A5C] tracking-tight text-balance">
              Lost something? Found something?
            </h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Help your campus community get back what matters.
            </p>
          </div>

          <div className="shrink-0 flex items-center md:justify-end">
            <ScriptNote text="Small things make a big difference" rotation="-rotate-3" />
          </div>
        </div>

        {/* Status Chips and Stats Strip */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-brand-gradient text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60 shadow-xs'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setStatusFilter('Lost')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                statusFilter === 'Lost'
                  ? 'bg-brand-gradient text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60 shadow-xs'
              }`}
            >
              <StatusPill type="lost" dotOnly />
              <span>Lost</span>
            </button>

            <button
              onClick={() => setStatusFilter('Found')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                statusFilter === 'Found'
                  ? 'bg-brand-gradient text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60 shadow-xs'
              }`}
            >
              <StatusPill type="found" dotOnly />
              <span>Found</span>
            </button>
          </div>

          {/* Stats pills */}
          <StatsStrip />
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100/70 flex items-center justify-center text-[#5B7BFA]">
              <FileText className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F2A5C] tracking-tight">
              Recent Listings
            </h2>
          </div>

          <Link
            to="/search"
            className="text-xs sm:text-sm font-semibold text-[#5B7BFA] hover:text-[#4A6BEB] flex items-center gap-1 group transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="glass rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#5B7BFA] animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Loading campus listings...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-3xl p-8 text-center text-rose-600 border border-rose-200">
            <p className="text-sm font-semibold mb-3">{error}</p>
            <button
              onClick={() => refresh()}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-gradient rounded-xl shadow-xs"
            >
              Retry
            </button>
          </div>
        ) : recentItems.length === 0 ? (
          <EmptyState
            title="No listings yet in this category"
            description="Be the first to report a lost or found item to help fellow campus students!"
            actionText="Report an Item"
            actionTo="/report"
            onReset={() => setStatusFilter('All')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {recentItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
