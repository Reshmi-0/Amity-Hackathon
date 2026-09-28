import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { BellMenu } from './BellMenu';
import { Search, Plus, X } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with URL query on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      setSearchTerm(searchParams.get('q') || '');
    }
  }, [location.pathname, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname === '/search') {
      const next = new URLSearchParams(searchParams);
      if (searchTerm.trim()) next.set('q', searchTerm.trim());
      else next.delete('q');
      navigate(`/search?${next.toString()}`, { replace: true });
    } else {
      navigate(searchTerm.trim() ? `/search?q=${encodeURIComponent(searchTerm.trim())}` : '/search');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (location.pathname === '/search') {
      const next = new URLSearchParams(searchParams);
      next.delete('q');
      navigate(`/search?${next.toString()}`, { replace: true });
    }
  };

  const isReportPage = location.pathname === '/report';

  return (
    <header className="sticky top-4 z-40 w-full mb-6">
      <div className="glass rounded-2xl h-18 px-4 sm:px-6 flex items-center justify-between gap-3 shadow-lg shadow-blue-500/5 border border-white/90">
        {/* Left: Brand Identity with Backpack */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform p-1.5">
            <svg viewBox="0 0 64 64" className="w-full h-full text-white">
              <path d="M22 16a10 10 0 0 1 20 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <rect x="12" y="16" width="40" height="42" rx="14" fill="currentColor" />
              <rect x="21" y="22" width="22" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.4" />
              <rect x="20" y="34" width="24" height="16" rx="6" fill="#ffffff" fillOpacity="0.9" />
              <path d="M26 42h12" stroke="#2E4FBF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-extrabold text-[#0F2A5C] tracking-tight whitespace-nowrap">
            Campus Lost & Found
          </span>
        </Link>

        {/* Center: Search Input Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for items (e.g. wallet, book, keys...)"
              className="w-full pl-10 pr-9 py-2 rounded-full border border-slate-200/80 bg-white/70 focus:bg-white text-xs sm:text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] focus:border-transparent transition-all shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!isReportPage && (
            <Link
              to="/report"
              className="py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline whitespace-nowrap">Report Item</span>
            </Link>
          )}

          {/* Bell Match Alerts */}
          <BellMenu />

          {/* User Avatar */}
          <Link
            to="/my-reports"
            className="w-10 h-10 rounded-full bg-[#E2E8F8] text-[#0F2A5C] border border-[#CBD5E1] flex items-center justify-center font-bold text-sm hover:ring-2 hover:ring-[#5B7BFA] transition-all"
            title="My Reports (User Profile)"
          >
            R
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar below header */}
      <div className="mt-2.5 sm:hidden px-1">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search items (wallet, book, keys...)"
            className="w-full pl-10 pr-9 py-2 rounded-full border border-slate-200/80 bg-white/80 focus:bg-white text-xs text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] shadow-xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>
    </header>
  );
};
