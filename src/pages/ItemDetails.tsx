import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import { StatusPill } from '../components/StatusPill';
import { ClaimModal } from '../components/ClaimModal';
import { MatchRing } from '../components/MatchRing';
import { ItemCard } from '../components/ItemCard';
import { fmtLong, fmtShort } from '../lib/format';
import { getItemImage, getItemGallery } from '../lib/images';
import { parseContact, maskPhone, maskEmail, telHref, mailHref } from '../lib/contact';
import { isMyReport, getSavedIds, toggleSavedId } from '../lib/storage';
import {
  ArrowLeft,
  Heart,
  Tag,
  MapPin,
  Calendar,
  FileText,
  Info,
  Phone,
  Mail,
  Send,
  Lock,
  Unlock,
  CheckCircle2,
  Flag,
  Sparkles,
  Zap,
} from 'lucide-react';

export const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, matchesFor, markReturnedLocal, unlockedContacts, unlockContact } = useItems();
  const { showToast } = useToast();

  const item = items.find(i => i.id === id);

  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [isSaved, setIsSaved] = useState(() => (id ? getSavedIds().includes(id) : false));

  const isLost = item?.type === 'lost';
  const matches = useMemo(() => (item ? matchesFor(item.id) : []), [item, matchesFor]);

  // Check if contact is unlocked for this session
  const storedContact = item ? unlockedContacts[item.id] : null;
  const isUnlocked = Boolean(storedContact);
  const activeContactRaw = storedContact || item?.contact || '';
  const parsedContact = useMemo(() => parseContact(activeContactRaw), [activeContactRaw]);

  // Fallback contacts for display if raw contact is structured
  const displayPhone = parsedContact.phones[0] || '+91 98765 43210';
  const displayEmail = parsedContact.emails[0] || 'contact@college.edu';

  // Check if user is the poster of this report
  const isOwnerOrFinder = item ? isMyReport(item.id) : false;
  const canMarkRecovered = isOwnerOrFinder || isUnlocked;

  if (!item) {
    return (
      <div className="glass rounded-3xl p-12 text-center my-8 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-[#0F2A5C] mb-2">Listing Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The item listing you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </Link>
      </div>
    );
  }

  const galleryImages = getItemGallery(item);
  const currentImage = galleryImages[selectedGalleryIdx] || getItemImage(item);

  const handleHeartToggle = () => {
    const updated = toggleSavedId(item.id);
    setIsSaved(updated);
    showToast(updated ? 'Saved to your favorites' : 'Removed from favorites');
  };

  const handleMarkAsFound = async () => {
    if (item.returned) return;
    try {
      await markReturnedLocal(item.id);
      showToast(
        isLost ? 'Item marked as found and recovered! 🎉' : 'Item marked as returned to owner! 🎉',
        'success'
      );
    } catch {
      showToast('Failed to update status. Please try again.', 'error');
    }
  };

  const handleReportSimilar = () => {
    navigate('/report', {
      state: {
        category: item.category,
        location: item.location,
      },
    });
  };

  // Recommendations: same category first, excluding this item
  const moreItems = items
    .filter(i => i.id !== item.id)
    .sort((a, b) => {
      const aCat = a.category === item.category ? 1 : 0;
      const bCat = b.category === item.category ? 1 : 0;
      return bCat - aCat;
    })
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-[#5B7BFA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-[#0F2A5C] font-bold">Item Details</span>
      </div>

      {/* Main Grid: Details Left (2 cols) + Actions Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Main Item Details Card (Mockup 2) */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 sm:p-8 shadow-sm border border-white/90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Visual Image & Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-[#F3F7FD] border border-slate-100 flex items-center justify-center p-4 aspect-square shadow-inner">
                <img
                  src={currentImage}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />

                {/* Heart Button */}
                <button
                  onClick={handleHeartToggle}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  aria-label="Save Item"
                >
                  <Heart
                    className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`}
                  />
                </button>
              </div>

              {/* Thumbnails row if multiple views exist */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 mt-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden bg-[#F3F7FD] p-1.5 border transition-all cursor-pointer ${
                        selectedGalleryIdx === idx
                          ? 'border-[#5B7BFA] ring-2 ring-[#5B7BFA]/30 shadow-xs'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail view" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Specifications */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <div className="mb-2">
                  <StatusPill type={item.type} returned={item.returned} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A5C] tracking-tight">
                  {item.name}
                </h1>

                {/* Metadata Rows */}
                <div className="space-y-2.5 mt-5 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Tag className="w-4 h-4 text-[#5B7BFA] shrink-0" />
                    <span className="text-slate-400 w-20">Category:</span>
                    <span className="font-semibold text-[#0F2A5C]">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-[#5B7BFA] shrink-0" />
                    <span className="text-slate-400 w-20">Location:</span>
                    <span className="font-semibold text-[#0F2A5C]">{item.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-[#5B7BFA] shrink-0" />
                    <span className="text-slate-400 w-20">Date:</span>
                    <span className="font-semibold text-[#0F2A5C]">{fmtLong(item.date)}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F2A5C] mb-1.5">
                    <FileText className="w-4 h-4 text-[#5B7BFA]" />
                    <span>Description</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description || 'No additional details provided.'}
                  </p>
                </div>
              </div>

              {/* Additional Information Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/80 flex items-start gap-2.5 text-xs text-slate-600">
                <Info className="w-4 h-4 text-[#5B7BFA] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0F2A5C] block mb-0.5">
                    Additional Information
                  </span>
                  <span>
                    {isLost
                      ? "This item was lost on campus. If you've found it, answer the verification question to contact the owner."
                      : "This item was found on campus. If it's yours, answer the verification question to contact the finder."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Card + Quick Actions */}
        <div className="space-y-6">
          {/* Contact Card (matching Mockup 2 & Decision #2/3) */}
          <div className="glass rounded-3xl p-6 shadow-sm border border-white/90 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5B7BFA]" />
                <h3 className="text-base font-bold text-[#0F2A5C]">
                  {isLost ? 'Contact Owner' : 'Contact Finder'}
                </h3>
              </div>
              {isUnlocked ? (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Unlocked
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Encrypted
                </span>
              )}
            </div>

            {/* Phone Row */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5B7BFA] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-medium">Phone</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0F2A5C] truncate">
                    {isUnlocked ? displayPhone : maskPhone(displayPhone)}
                  </span>
                </div>
              </div>

              {isUnlocked ? (
                <a
                  href={telHref(displayPhone)}
                  className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-brand-gradient hover:opacity-95 shadow-xs shrink-0"
                >
                  Call
                </a>
              ) : (
                <button
                  disabled
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed shrink-0"
                >
                  Call
                </button>
              )}
            </div>

            {/* Email Row */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5B7BFA] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-medium">Email</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0F2A5C] truncate">
                    {isUnlocked ? displayEmail : maskEmail(displayEmail)}
                  </span>
                </div>
              </div>

              {isUnlocked ? (
                <a
                  href={mailHref(displayEmail, item.name)}
                  className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-brand-gradient hover:opacity-95 shadow-xs shrink-0"
                >
                  Email
                </a>
              ) : (
                <button
                  disabled
                  className="py-1.5 px-3 rounded-xl text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed shrink-0"
                >
                  Email
                </button>
              )}
            </div>

            {/* Primary Action Button (Unlocked vs Locked) */}
            {item.returned ? (
              <div className="text-center p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                ✅ This item has been recovered and returned.
              </div>
            ) : isUnlocked ? (
              <div className="space-y-2">
                <a
                  href={telHref(displayPhone)}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isLost ? 'Contact Owner' : 'Contact Finder'}</span>
                </a>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white/90 px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider absolute">
                    OR
                  </span>
                </div>

                <a
                  href={mailHref(displayEmail, item.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#5B7BFA] bg-white hover:bg-slate-50 border border-[#5B7BFA]/40 shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setShowClaimModal(true)}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isLost ? 'I Found This' : 'Contact Finder'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Answer 1 question to verify and unlock contact details.
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions Card (matching Mockup 2) */}
          <div className="glass rounded-3xl p-6 shadow-sm border border-white/90 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Zap className="w-4 h-4 text-[#5B7BFA]" />
              <h3 className="text-base font-bold text-[#0F2A5C]">Quick Actions</h3>
            </div>

            {/* Mark as Found Action */}
            <button
              onClick={handleMarkAsFound}
              disabled={item.returned || !canMarkRecovered}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                item.returned
                  ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                  : canMarkRecovered
                  ? 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-200/80 text-emerald-950'
                  : 'bg-slate-50/60 text-slate-400 border-slate-200/70 opacity-60 cursor-not-allowed'
              }`}
              title={
                !canMarkRecovered
                  ? 'Only the student who reported or verified this item can mark it.'
                  : ''
              }
            >
              <CheckCircle2
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  item.returned || canMarkRecovered ? 'text-emerald-600' : 'text-slate-400'
                }`}
              />
              <div>
                <span className="text-xs sm:text-sm font-bold block">
                  {item.returned ? 'Recovered' : isLost ? 'Mark as Found' : 'Mark as Returned'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {item.returned
                    ? 'Successfully closed'
                    : isLost
                    ? '(if you are the owner)'
                    : '(if you are the finder)'}
                </span>
              </div>
            </button>

            {/* Report Similar Item */}
            <button
              onClick={handleReportSimilar}
              className="w-full p-3.5 rounded-2xl text-left border border-slate-200/80 bg-white/70 hover:bg-white transition-all flex items-start gap-3 cursor-pointer shadow-xs"
            >
              <Flag className="w-5 h-5 text-[#5B7BFA] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#0F2A5C] block">
                  Report Similar Item
                </span>
                <span className="text-[11px] text-slate-500">
                  (if you found something else)
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Match Section (Section 7.1) */}
      {matches.length > 0 && !item.returned && (
        <section className="glass rounded-3xl p-6 sm:p-7 shadow-sm border border-amber-200/40 bg-gradient-to-r from-amber-50/20 via-white/70 to-blue-50/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-[#0F2A5C]">
                Smart Match Suggestions ({matches.length})
              </h2>
            </div>
            <span className="text-xs text-amber-800 font-semibold bg-amber-100/80 px-2.5 py-0.5 rounded-full">
              Automated Pairing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matches.slice(0, 3).map(({ item: matchItem, score }) => (
              <div
                key={matchItem.id}
                onClick={() => navigate(`/item/${matchItem.id}`)}
                className="glass p-4 rounded-2xl border border-slate-200/80 hover:border-[#5B7BFA] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs card-hover"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <StatusPill type={matchItem.type} />
                    <span className="text-xs font-bold text-[#0F2A5C] truncate">
                      {matchItem.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {matchItem.location} · {fmtShort(matchItem.date)}
                  </span>
                </div>

                <MatchRing score={score} size={44} strokeWidth={3.5} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More Items from Campus Section (Mockup 2) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-bold text-[#0F2A5C] tracking-tight">
            More Items from Campus
          </h2>
          <Link
            to="/search"
            className="text-xs sm:text-sm font-semibold text-[#5B7BFA] hover:text-[#4A6BEB] transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moreItems.map(otherItem => (
            <ItemCard key={otherItem.id} item={otherItem} showMatchBadge={false} />
          ))}
        </div>
      </section>

      {/* Claim Modal */}
      <ClaimModal
        item={item}
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        onSuccess={contactResult => {
          unlockContact(item.id, contactResult);
        }}
      />
    </div>
  );
};
