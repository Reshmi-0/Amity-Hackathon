import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Item } from '../types';
import { ItemThumb } from './ItemThumb';
import { StatusPill } from './StatusPill';
import { ClaimModal } from './ClaimModal';
import { fmtShort } from '../lib/format';
import { useItems } from '../context/ItemsContext';
import { Tag, MapPin, Calendar, Phone, Sparkles } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  showMatchBadge?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, showMatchBadge = true }) => {
  const navigate = useNavigate();
  const { matchesFor, newReportId, unlockedContacts } = useItems();
  const [showClaimModal, setShowClaimModal] = useState(false);

  const isNewlyAdded = newReportId === item.id;
  const matches = matchesFor(item.id);
  const matchCount = matches.length;
  const isUnlocked = Boolean(unlockedContacts[item.id]);

  const isLost = item.type === 'lost';
  const buttonLabel = item.returned
    ? 'Recovered'
    : isLost
    ? 'I Found This'
    : 'Contact Finder';

  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };

  const handleActionButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.returned) return;

    if (isUnlocked) {
      navigate(`/item/${item.id}`);
    } else {
      setShowClaimModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`glass rounded-[22px] p-4 flex flex-col justify-between cursor-pointer card-hover border border-white/90 relative group transition-all ${
          isNewlyAdded ? 'ring-2 ring-[#5B7BFA] animate-pulse-subtle' : ''
        }`}
      >
        <div>
          {/* Top Row: Thumbnail + Info */}
          <div className="flex gap-3.5 items-start">
            <ItemThumb item={item} size="md" />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1.5 mb-1.5">
                <h3 className="text-base font-bold text-[#0F2A5C] truncate tracking-tight group-hover:text-[#5B7BFA] transition-colors">
                  {item.name}
                </h3>
                <StatusPill type={item.type} returned={item.returned} />
              </div>

              {/* 3 Meta rows */}
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <Tag className="w-3.5 h-3.5 text-[#5B7BFA] shrink-0" />
                  <span className="truncate">{item.category}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#5B7BFA] shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar className="w-3.5 h-3.5 text-[#5B7BFA] shrink-0" />
                  <span>{fmtShort(item.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {item.description || 'No description provided.'}
          </p>

          {/* Match badge if available */}
          {showMatchBadge && matchCount > 0 && !item.returned && (
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{matchCount} potential match{matchCount > 1 ? 'es' : ''}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-2">
          <button
            onClick={handleActionButtonClick}
            disabled={item.returned}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              item.returned
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'border border-[#5B7BFA]/60 text-[#5B7BFA] bg-white/70 hover:bg-[#5B7BFA] hover:text-white shadow-xs active:scale-[0.98]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{buttonLabel}</span>
          </button>
        </div>
      </div>

      <ClaimModal
        item={item}
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        onSuccess={() => {
          navigate(`/item/${item.id}`);
        }}
      />
    </>
  );
};
