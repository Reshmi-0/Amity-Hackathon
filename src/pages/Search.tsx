import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import { useFilters } from '../hooks/useFilters';
import { ItemCard } from '../components/ItemCard';
import { ScriptNote } from '../components/ScriptNote';
import { EmptyState } from '../components/EmptyState';
import { Category, PriorityLevel, DateRange, SortOption } from '../types';
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
  Filter,
  RotateCcw,
  Check,
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'Electronics',
  'Documents',
  'Accessories',
  'Books',
  'Bags',
  'Other',
];

export const Search: React.FC = () => {
  const { items } = useItems();
  const {
    filters,
    updateFilters,
    clearFilters,
    availableLocations,
    filteredItems,
  } = useFilters(items);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-[#5B7BFA] flex items-center justify-center shrink-0 shadow-xs">
            <SearchIcon className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A5C] tracking-tight">
              Search & Filters
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Find lost items or help someone get their belongings back.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <ScriptNote text="Search. Filter. Reunite." rotation="-rotate-3" />
        </div>
      </div>

      {/* Main Grid: Left Results + Right Filter Panel */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Area: Controls + Results */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {/* Top Control Bar in Glass Container */}
          <div className="glass rounded-2xl p-3 sm:p-4 shadow-sm border border-white/90">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Query Input */}
              <div className="relative flex-1 min-w-[200px]">
                <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.q}
                  onChange={e => updateFilters({ q: e.target.value })}
                  placeholder="Search keywords (e.g. wallet, phone, card)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
                />
                {filters.q && (
                  <button
                    onClick={() => updateFilters({ q: '' })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Select */}
              <select
                value={filters.status}
                onChange={e => updateFilters({ status: e.target.value as 'All' | 'Lost' | 'Found' })}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>

              {/* Category Select */}
              <select
                value={filters.category}
                onChange={e => updateFilters({ category: e.target.value as 'All' | Category })}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Mobile Filter Drawer Button */}
              <button
                onClick={() => setMobileDrawerOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                title="Toggle Filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Summary Row */}
          <div className="flex items-center justify-between px-1 text-xs">
            <div className="font-bold text-[#0F2A5C] text-sm sm:text-base">
              Search Results{' '}
              <span className="text-slate-500 font-normal">({filteredItems.length} items)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={filters.sort}
                onChange={e => updateFilters({ sort: e.target.value as SortOption })}
                className="bg-white/80 border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                {filters.q && <option value="match">Best Match</option>}
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {filteredItems.length === 0 ? (
            <EmptyState
              title={`No items found matching "${filters.q || 'your filters'}"`}
              description="Try adjusting your keywords, expanding date range, or resetting filters."
              onReset={clearFilters}
              actionText="Report an Item"
              actionTo="/report"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Right Area: Dedicated Filters Card (matching Mockup 3) */}
        <div
          className={`w-full lg:w-80 shrink-0 lg:block ${
            mobileDrawerOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="glass rounded-3xl p-6 shadow-sm border border-white/90 space-y-6 sticky top-24">
            {/* Header with Clear All */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#5B7BFA]" />
                <h3 className="text-base font-bold text-[#0F2A5C]">Filters</h3>
              </div>
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-[#5B7BFA] hover:text-[#4A6BEB] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Filter 1: Status Segmented Control */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-2">Status</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-blue-50/60 rounded-xl border border-blue-100">
                {(['All', 'Lost', 'Found'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateFilters({ status: s })}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      filters.status === s
                        ? 'bg-brand-gradient text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Category Select */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">Category</label>
              <select
                value={filters.category}
                onChange={e => updateFilters({ category: e.target.value as 'All' | Category })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 3: Priority (derived from Category) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#0F2A5C]">Priority</label>
                <span className="text-[10px] text-slate-400">derived</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['All', 'High', 'Medium', 'Low'] as PriorityLevel[]).map(p => (
                  <label
                    key={p}
                    className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                      filters.priority === p
                        ? 'bg-blue-50/80 border-[#5B7BFA] text-[#0F2A5C] font-bold'
                        : 'bg-white/60 border-slate-200/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      checked={filters.priority === p}
                      onChange={() => updateFilters({ priority: p })}
                      className="text-[#5B7BFA] focus:ring-[#5B7BFA]"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 4: Location */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">Location</label>
              <select
                value={filters.location}
                onChange={e => updateFilters({ location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
              >
                <option value="">All Locations</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 5: Date Range */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">Date Range</label>
              <select
                value={filters.range}
                onChange={e => updateFilters({ range: e.target.value as DateRange })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
              >
                <option value="any">Any Date</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
