import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import { Sidebar } from '../components/Sidebar';
import { ScriptNote } from '../components/ScriptNote';
import { MatchPanel } from '../components/MatchPanel';
import { Category, ItemType, Item, Match } from '../types';
import { reportItem } from '../lib/api';
import { addMyReportedId } from '../lib/storage';
import { getMatches } from '../lib/match';
import {
  FileText,
  Tag,
  MapPin,
  Calendar,
  Phone,
  Send,
  Loader2,
  Lock,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'Electronics',
  'Documents',
  'Accessories',
  'Books',
  'Bags',
  'Other',
];

const LOCATION_SUGGESTIONS = [
  'Library',
  'Block A',
  'Block B',
  'Canteen',
  'Main Gate',
  'Gym',
  'Hostel',
  'Ground',
  'Parking',
  'Auditorium',
];

const PRESET_QUESTIONS = [
  'What colour or brand is it?',
  "What's inside it?",
  "What's written or stuck on it?",
  'Any scratch or unique mark?',
];

export const Report: React.FC = () => {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const prefill = (routeLocation.state as { category?: Category; location?: string }) || {};

  const { items, addLocal } = useItems();
  const { showToast } = useToast();

  const todayStr = new Date().toISOString().split('T')[0];

  const [type, setType] = useState<ItemType>('lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category | ''>(prefill.category || '');
  const [location, setLocation] = useState(prefill.location || '');
  const [date, setDate] = useState(todayStr);
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Match panel state after submit
  const [createdItem, setCreatedItem] = useState<Item | null>(null);
  const [matchedResults, setMatchedResults] = useState<Match[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please enter an item name (at least 2 characters).';
    }
    if (!category) {
      errs.category = 'Please select a category.';
    }
    if (!location.trim() || location.trim().length < 2) {
      errs.location = 'Please enter a campus location.';
    }
    if (!date) {
      errs.date = 'Please select the date.';
    } else if (date > todayStr) {
      errs.date = 'Date cannot be in the future.';
    }
    if (!description.trim() || description.trim().length < 5) {
      errs.description = 'Please provide a description (at least 5 characters).';
    }
    if (!contact.trim()) {
      errs.contact = 'Please provide a valid phone number or email.';
    }
    if (!question.trim()) {
      errs.question = 'Please provide a verification question.';
    }
    if (!answer.trim()) {
      errs.answer = 'Please provide the secret answer.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);

    try {
      const newItem = await reportItem({
        type,
        name,
        category: category as Category,
        location,
        date,
        description,
        contact,
        question,
        answer,
      });

      addMyReportedId(newItem.id);
      addLocal(newItem);
      showToast(`Your ${type} listing "${newItem.name}" was posted!`, 'success');

      // Check Smart Match
      const matches = getMatches(newItem, items);

      if (matches.length > 0) {
        setCreatedItem(newItem);
        setMatchedResults(matches);
        setShowMatchModal(true);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to submit listing. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Center: Main Report Form */}
      <div className="flex-1 min-w-0">
        <div className="glass rounded-3xl p-6 sm:p-9 shadow-sm border border-white/90">
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-6 pb-5 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-blue-100/70 text-[#5B7BFA] flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F2A5C] tracking-tight">
                Report an Item
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in the details below to report a lost or found item. The item will appear on the dashboard once you submit it.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1: Item Type Toggle */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-2">
                Item Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-blue-50/60 rounded-2xl border border-blue-100/80">
                <button
                  type="button"
                  onClick={() => setType('lost')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    type === 'lost'
                      ? 'bg-white text-rose-600 shadow-md shadow-rose-500/10 border border-rose-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${type === 'lost' ? 'bg-rose-500' : 'border border-slate-400'}`}></span>
                  <span>Lost</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('found')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    type === 'found'
                      ? 'bg-white text-emerald-600 shadow-md shadow-emerald-500/10 border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${type === 'found' ? 'bg-emerald-500' : 'border border-slate-400'}`}></span>
                  <span>Found</span>
                </button>
              </div>
            </div>

            {/* Field 2 & 3: Item Name and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Black Wallet"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as Category)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] transition-all shadow-xs cursor-pointer appearance-none"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
                {errors.category && <p className="text-[11px] text-rose-500 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Field 4 & 5: Location and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">
                  Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    list="location-options"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Library, Block A, Canteen"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] transition-all shadow-xs"
                  />
                  <datalist id="location-options">
                    {LOCATION_SUGGESTIONS.map(loc => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
                {errors.location && <p className="text-[11px] text-rose-500 mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">
                  Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    max={todayStr}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] transition-all shadow-xs cursor-pointer"
                  />
                </div>
                {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
              </div>
            </div>

            {/* Field 6: Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0F2A5C]">
                  Description <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">{description.length}/200</span>
              </div>
              <textarea
                value={description}
                maxLength={200}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add a short description (color, model, unique marks)..."
                rows={3}
                className="w-full p-3.5 rounded-2xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] transition-all shadow-xs resize-none"
              />
              {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
            </div>

            {/* Field 7: Contact Information */}
            <div>
              <label className="text-xs font-bold text-[#0F2A5C] block mb-1.5">
                Contact Information <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="Phone number, email, or both separated by a comma"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white/70 focus:bg-white text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] transition-all shadow-xs"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Your contact stays encrypted until someone successfully answers your verification question.
              </p>
              {errors.contact && <p className="text-[11px] text-rose-500 mt-1">{errors.contact}</p>}
            </div>

            {/* Creative Feature: Claim Verification Sub-Card */}
            <div className="glass-subtle rounded-2xl p-4 sm:p-5 border border-indigo-100/80 bg-blue-50/40 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#5B7BFA]/20 text-[#5B7BFA] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F2A5C]">
                    Verify It's Yours (Claim Protection)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {type === 'lost'
                      ? "Ask something only the person who found it could answer (e.g. 'What sticker is on the back?')"
                      : "Ask something only the real owner would know (e.g. 'What's the phone wallpaper?')"}
                  </p>
                </div>
              </div>

              {/* Preset Chips */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Suggested Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_QUESTIONS.map(q => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuestion(q)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/90 hover:bg-[#5B7BFA] hover:text-white text-slate-600 border border-slate-200/60 transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secret Question Input */}
              <div>
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Verification Question (e.g. Whose name is written inside?)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
                />
                {errors.question && <p className="text-[11px] text-rose-500 mt-1">{errors.question}</p>}
              </div>

              {/* Secret Answer Input */}
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Secret Answer (kept private, used for verification)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-[#0F2A5C] focus:outline-none focus:ring-2 focus:ring-[#5B7BFA]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Answers are case-insensitive and allow close matches.
                </p>
                {errors.answer && <p className="text-[11px] text-rose-500 mt-1">{errors.answer}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-brand-gradient shadow-lg shadow-indigo-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Listing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 stroke-[2.2]" />
                  <span>Submit Listing</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Quick Tips Card */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="glass rounded-3xl p-6 shadow-sm border border-white/90">
          <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center mb-4 shadow-xs">
            <Lightbulb className="w-5 h-5 stroke-[2.2]" />
          </div>

          <h3 className="text-base font-bold text-[#0F2A5C] mb-3">
            Quick Tips
          </h3>

          <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Be as detailed as possible (helps with faster recovery).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Use a clear item name and category.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Add your contact information so the owner can reach you.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Pick a verification question only the real owner/finder can answer.</span>
            </li>
          </ul>
        </div>

        {/* Script Note */}
        <div className="p-4 text-center">
          <ScriptNote
            text="Together we keep our campus safe & connected"
            rotation="-rotate-2"
          />
        </div>
      </div>

      {/* Match Panel Modal if matches detected */}
      {createdItem && (
        <MatchPanel
          reportedItem={createdItem}
          matches={matchedResults}
          isOpen={showMatchModal}
          onClose={() => {
            setShowMatchModal(false);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};
