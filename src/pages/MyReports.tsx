import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { getMyReportedIds } from '../lib/storage';
import { Sidebar } from '../components/Sidebar';
import { ItemCard } from '../components/ItemCard';
import { EmptyState } from '../components/EmptyState';
import { FileText, Plus, ShieldCheck } from 'lucide-react';

export const MyReports: React.FC = () => {
  const { items } = useItems();
  const [filterType, setFilterType] = useState<'All' | 'Lost' | 'Found'>('All');

  const myReportedIds = getMyReportedIds();
  const myItems = items.filter(item => myReportedIds.includes(item.id));

  const filteredMyItems = myItems.filter(item => {
    if (filterType === 'All') return true;
    return item.type === filterType.toLowerCase();
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Top Header Card */}
        <div className="glass rounded-3xl p-6 sm:p-7 shadow-sm border border-white/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-100/70 text-[#5B7BFA] flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F2A5C] tracking-tight">
                My Reported Items
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage the items you reported from this device and track their matches.
              </p>
            </div>
          </div>

          <Link
            to="/report"
            className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Report New Item</span>
          </Link>
        </div>

        {/* Info banner */}
        <div className="glass-subtle rounded-2xl p-4 border border-blue-100/80 flex items-center gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-[#5B7BFA] shrink-0" />
          <span>
            Listings reported from this browser session are securely remembered here without requiring an account or password.
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          {(['All', 'Lost', 'Found'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterType === tab
                  ? 'bg-brand-gradient text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
              }`}
            >
              {tab} ({tab === 'All' ? myItems.length : myItems.filter(i => i.type === tab.toLowerCase()).length})
            </button>
          ))}
        </div>

        {/* Listing Grid */}
        {filteredMyItems.length === 0 ? (
          <EmptyState
            title={myItems.length === 0 ? "You haven't reported anything on this device yet" : "No items in this category"}
            description={myItems.length === 0 ? "When you report lost or found items, you can view and track them here." : "Switch status tabs to view your other listings."}
            actionText="Report an Item"
            actionTo="/report"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMyItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
