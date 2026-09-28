import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Search, FileText, Heart } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/report', label: 'Report Item', icon: PlusCircle },
    { to: '/search', label: 'Browse Listings', icon: Search },
    { to: '/my-reports', label: 'My Reports', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between">
      {/* Navigation Links */}
      <div className="glass rounded-3xl p-3 sm:p-4 space-y-1.5 shadow-sm">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#5B7BFA]/15 text-[#5B7BFA] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F2A5C] hover:bg-white/60'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Decorative Script Note at Sidebar Bottom */}
      <div className="hidden lg:block mt-8 p-4 text-center">
        <Heart className="w-5 h-5 text-rose-400 mx-auto mb-2 fill-rose-100" />
        <p className="font-script text-xl text-slate-500 leading-tight -rotate-2">
          Lost something?
          <br />
          Found something?
          <br />
          <span className="text-[#5B7BFA]">Help your campus community!</span>
        </p>
      </div>
    </aside>
  );
};
