import React from 'react';
import { Building2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-14 pb-8 w-full border-t border-blue-100/60 pt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        {/* Left: Building icon and script note */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100/60 flex items-center justify-center text-[#5B7BFA]">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-script text-lg text-slate-600">Lost something? Found something?</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-500">Help your campus community!</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-100" />
          </div>
        </div>

        {/* Right: Branding and tagline */}
        <div className="flex items-center gap-2 text-right">
          <span className="font-semibold text-[#0F2A5C]">Campus Lost & Found</span>
          <span className="text-slate-300">·</span>
          <span className="font-script text-base text-slate-500">Small things. Big stories.</span>
          <span className="text-rose-400">♡</span>
        </div>
      </div>
    </footer>
  );
};
