import React, { useState, useEffect } from 'react';
import { Item } from '../types';
import { claimItem } from '../lib/api';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import { getAttempts, incrementAttempts } from '../lib/storage';
import { Lock, Unlock, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface ClaimModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (contact: string) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ item, isOpen, onClose, onSuccess }) => {
  const { unlockContact } = useItems();
  const { showToast } = useToast();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSuccessAnim, setIsSuccessAnim] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnswer('');
      setErrorMsg(null);
      setIsSuccessAnim(false);
      setAttempts(getAttempts(item.id));
    }
  }, [isOpen, item.id]);

  if (!isOpen) return null;

  const isLockedOut = attempts >= 3;
  const isLost = item.type === 'lost';

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLockedOut || loading || !answer.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const contactResult = await claimItem(item.id, answer);

      if (contactResult) {
        setIsSuccessAnim(true);
        unlockContact(item.id, contactResult);
        showToast('Claim verified successfully! Contact information unlocked.', 'success');

        setTimeout(() => {
          onSuccess(contactResult);
          onClose();
        }, 1200);
      } else {
        const newAttempts = incrementAttempts(item.id);
        setAttempts(newAttempts);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        if (newAttempts >= 3) {
          setErrorMsg('Maximum attempts reached. Please try again later.');
        } else {
          setErrorMsg(`Not quite right. Try again (${3 - newAttempts} attempt${3 - newAttempts > 1 ? 's' : ''} remaining)`);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="glass-modal w-full max-w-md rounded-3xl p-6 sm:p-7 relative shadow-2xl border border-white/90 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors duration-500 shadow-md">
            {isSuccessAnim ? (
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center animate-bounce">
                <Unlock className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Lock className="w-7 h-7" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-[#0F2A5C]">
            {isSuccessAnim ? 'Identity Verified!' : 'Claim Verification'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {isLost
              ? `Answer the question to prove you found "${item.name}" and view contact details.`
              : `Answer the question to verify you are the rightful owner of "${item.name}".`}
          </p>
        </div>

        {isSuccessAnim ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm mb-2 border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Unlocking Contact Details...
            </div>
            <p className="text-xs text-slate-500">Contact card is now updating.</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            {/* Question Card */}
            <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-4 text-left">
              <span className="text-[11px] font-semibold text-[#5B7BFA] uppercase tracking-wider block mb-1">
                Security Question:
              </span>
              <p className="text-sm font-semibold text-[#0F2A5C] leading-snug">
                {item.question || 'What is a unique distinguishing feature of this item?'}
              </p>
            </div>

            {/* Answer Input */}
            <div className={`space-y-1.5 ${isShaking ? 'animate-shake' : ''}`}>
              <label className="text-xs font-semibold text-[#0F2A5C] block">
                Your Answer
              </label>
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={isLockedOut || loading}
                placeholder={isLockedOut ? 'Locked out for this session' : 'Enter your answer...'}
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 focus:bg-white text-sm text-[#0F2A5C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7BFA] focus:border-transparent transition-all shadow-xs disabled:opacity-50 disabled:bg-slate-100"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50/80 px-3 py-2 rounded-xl border border-rose-200/50">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Attempt dots */}
            <div className="flex items-center justify-between px-1 text-xs text-slate-500">
              <span>Remaining Attempts:</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map(idx => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx < attempts ? 'bg-rose-500' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLockedOut || loading || !answer.trim()}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-brand-gradient shadow-md shadow-indigo-500/20 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" /> Verify & Reveal Contact
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Contacts are encrypted to prevent spam and protect student privacy.
          </p>
        </div>
      </div>
    </div>
  );
};
