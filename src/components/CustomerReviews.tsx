import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Navigation,
  Check
} from 'lucide-react';
import { INITIAL_5_REVIEWS, getPaginatedReviews, TOTAL_REVIEWS_COUNT } from '../data/reviewsData';

export const CustomerReviews: React.FC = () => {
  const [isFullModalOpen, setIsFullModalOpen] = useState<boolean>(false);

  // Full modal pagination & filter state
  const [modalPage, setModalPage] = useState<number>(1);
  const [isJumpDialogOpen, setIsJumpDialogOpen] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const reviewsPerPage = 10;
  const totalPages = Math.ceil(TOTAL_REVIEWS_COUNT / reviewsPerPage); // 1,482 pages

  // CRITICAL: Lock home page background scrolling when review modal is open
  // This completely eliminates duplicate scrollbars ("sliders")!
  useEffect(() => {
    if (isFullModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isFullModalOpen]);

  // Fetch reviews for current modal page
  const rawReviews = getPaginatedReviews(modalPage, reviewsPerPage);
  const filteredReviews = rawReviews.filter(r => {
    if (selectedRatingFilter && r.rating !== selectedRatingFilter) return false;
    if (selectedColorFilter && r.color !== selectedColorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inName = r.name.toLowerCase().includes(q);
      const inCity = r.city.toLowerCase().includes(q);
      const inComment = r.comment.toLowerCase().includes(q);
      return inName || inCity || inComment;
    }
    return true;
  });

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(newPage, totalPages));
    setModalPage(clamped);
    setJumpPageInput(String(clamped));
    const container = document.getElementById('modal-reviews-list');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExecuteJump = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(jumpPageInput.trim(), 10);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      handlePageChange(val);
      setIsJumpDialogOpen(false);
    } else {
      setJumpPageInput(String(modalPage));
    }
  };

  const quickJumpPages = [1, 5, 10, 25, 50, 100, 250, 500, 1000, totalPages];

  return (
    <section id="customer-reviews" className="bg-slate-50 p-4 max-w-md mx-auto space-y-4 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            100% VERIFIED BUYERS
          </span>
          <h2 className="text-base font-extrabold text-slate-900 mt-1">
            Customer Reviews ({TOTAL_REVIEWS_COUNT.toLocaleString()})
          </h2>
        </div>
        <button
          onClick={() => {
            setIsFullModalOpen(true);
            setIsJumpDialogOpen(false);
          }}
          className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl border border-red-200 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
        >
          <span>All 14.8k</span>
          <ChevronRight className="w-3.5 h-3.5 text-red-600" />
        </button>
      </div>

      {/* Rating Snapshot Card */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-3xl font-black text-slate-900 leading-none">4.8</div>
          <div className="flex text-amber-400 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Based on {TOTAL_REVIEWS_COUNT.toLocaleString()} Indian buyers
          </p>
        </div>

        <div className="space-y-1 w-1/2">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-7 text-right text-slate-600 font-semibold">5 Star</span>
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[88%]" />
            </div>
            <span className="w-7 text-slate-500">88%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-7 text-right text-slate-600 font-semibold">4 Star</span>
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[10%]" />
            </div>
            <span className="w-7 text-slate-500">10%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-7 text-right text-slate-600 font-semibold">3 Star</span>
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[2%]" />
            </div>
            <span className="w-7 text-slate-500">2%</span>
          </div>
        </div>
      </div>

      {/* STRICTLY ONLY 5 REVIEWS ON HOME PAGE */}
      <div className="space-y-3">
        {INITIAL_5_REVIEWS.map(review => (
          <div
            key={review.id}
            className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">{review.name}</span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    Verified Naaptol Buyer
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {review.city}, {review.state} • {review.date}
                </div>
              </div>

              <div className="flex text-amber-400">
                {[...Array(review.rating)].map((_, s) => (
                  <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-medium">
              Purchased Color: <span className="font-bold text-slate-700">{review.color}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              "{review.comment}"
            </p>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1 border-t border-slate-50">
              <ThumbsUp className="w-3 h-3 text-slate-400" />
              <span>{review.helpfulCount} customers found this helpful</span>
            </div>
          </div>
        ))}
      </div>

      {/* CLEAN HOME PAGE BUTTON: "Browse All 14,820 Reviews" (WITHOUT ANY SUBTITLE) */}
      <div className="pt-2">
        <button
          onClick={() => {
            setIsFullModalOpen(true);
            setIsJumpDialogOpen(false);
          }}
          className="w-full relative overflow-hidden group p-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-700 hover:to-orange-700 active:scale-98 text-white shadow-xl shadow-orange-600/25 border border-orange-400/40 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-xs">
              <MessageSquare className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base tracking-wide uppercase">
                Browse All 14,820 Reviews
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center font-extrabold shadow-sm group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* FULL REVIEWS MODAL: LOCKED BACKGROUND SCROLLBAR (ZERO DUPLICATE SLIDERS) */}
      {isFullModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
          {/* Main Modal Container: Fullscreen on Mobile, Perfectly Centered */}
          <div className="w-full h-full max-w-md bg-white sm:h-[94vh] sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Top Modal Header */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/images/naaptol_logo.png"
                  alt="Naaptol"
                  className="h-6 w-auto object-contain bg-white px-1.5 py-0.5 rounded"
                />
                <div>
                  <h3 className="font-extrabold text-xs">Customer Reviews</h3>
                  <p className="text-[10px] text-slate-300">14,820 Verified Indian Buyers</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsFullModalOpen(false);
                  setIsJumpDialogOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Reviews Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Mobile Page Navigation Header */}
            <div className="bg-slate-100/95 border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2 flex-shrink-0">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(modalPage - 1)}
                disabled={modalPage <= 1}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Central Tap-to-Jump Page Pill Button */}
              <button
                onClick={() => {
                  setJumpPageInput(String(modalPage));
                  setIsJumpDialogOpen(!isJumpDialogOpen);
                }}
                className="flex-1 py-1 px-2 rounded-xl bg-white hover:bg-amber-50/70 border-2 border-red-500/80 shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
              >
                <span className="text-[11px] font-extrabold text-slate-800">
                  Page <strong className="text-red-600 font-black">{modalPage}</strong> of {totalPages.toLocaleString()}
                </span>
                <span className="text-[9px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Jump ⚡
                </span>
              </button>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(modalPage + 1)}
                disabled={modalPage >= totalPages}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* POPUP / ACCORDION: JUMP TO ANY PAGE INSTANTLY */}
            {isJumpDialogOpen && (
              <div className="bg-gradient-to-b from-amber-50 to-white border-b-2 border-red-500 p-3 space-y-2.5 shadow-md animate-in slide-in-from-top-2 duration-150 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-red-600" />
                    Jump to Any Review Page (1 to {totalPages.toLocaleString()}):
                  </span>
                  <button
                    onClick={() => setIsJumpDialogOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Page Input Form */}
                <form onSubmit={handleExecuteJump} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={jumpPageInput}
                      onChange={e => setJumpPageInput(e.target.value)}
                      placeholder={`Enter page (1-${totalPages})`}
                      className="w-full pl-3 pr-8 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">
                      /{totalPages}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Go Now
                  </button>
                </form>

                {/* Quick 1-Tap Preset Pages (Grid Layout, ZERO scrollbar mess!) */}
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Quick Jump to Popular Pages:
                  </p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {quickJumpPages.map(p => (
                      <button
                        key={p}
                        onClick={() => {
                          handlePageChange(p);
                          setIsJumpDialogOpen(false);
                        }}
                        className={`py-1 text-[11px] font-bold rounded-lg border text-center transition-colors cursor-pointer ${
                          modalPage === p
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        p.{p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Filter Pills Bar */}
            <div className="bg-white px-3 py-2 border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedRatingFilter(null);
                  setSelectedColorFilter(null);
                  setSearchQuery('');
                  handlePageChange(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                  !selectedRatingFilter && !selectedColorFilter && !searchQuery
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All (14,820)
              </button>

              <button
                onClick={() => {
                  setSelectedRatingFilter(5);
                  handlePageChange(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-1 transition-colors ${
                  selectedRatingFilter === 5
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400" />
                <span>5 Stars</span>
              </button>

              <button
                onClick={() => {
                  setSelectedColorFilter('Royal Gold');
                  handlePageChange(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedColorFilter === 'Royal Gold'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Royal Gold
              </button>

              <button
                onClick={() => {
                  setSelectedColorFilter('Midnight Black');
                  handlePageChange(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedColorFilter === 'Midnight Black'
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Midnight Black
              </button>

              <button
                onClick={() => {
                  setSelectedColorFilter('Electric Purple');
                  handlePageChange(1);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedColorFilter === 'Electric Purple'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Electric Purple
              </button>
            </div>

            {/* Scrollable Reviews List in Modal (The ONLY active scrollbar) */}
            <div
              id="modal-reviews-list"
              className="overflow-y-auto p-3 sm:p-4 space-y-3 flex-1 bg-slate-50 overscroll-contain"
            >
              {filteredReviews.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <p className="font-bold text-slate-700 text-sm">No reviews found</p>
                  <p className="mt-1">Try switching page or clearing filters.</p>
                  <button
                    onClick={() => {
                      setSelectedRatingFilter(null);
                      setSelectedColorFilter(null);
                      setSearchQuery('');
                      handlePageChange(1);
                    }}
                    className="mt-3 px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-lg cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredReviews.map(r => (
                  <div
                    key={r.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong className="text-slate-900 font-bold">{r.name}</strong>
                        <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold inline-flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> Verified Buyer
                        </span>
                      </div>

                      <div className="flex text-amber-400">
                        {[...Array(r.rating)].map((_, s) => (
                          <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>{r.city}, {r.state}</span>
                      <span>•</span>
                      <span>Color: <strong className="text-slate-700">{r.color}</strong></span>
                      <span>•</span>
                      <span>{r.date}</span>
                    </div>

                    <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                      "{r.comment}"
                    </p>

                    <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                      <span>Buyer #{r.id}</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-2.5 h-2.5" /> {r.helpfulCount} helpful
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* STICKY BOTTOM MODAL FOOTER PAGINATION BAR */}
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center justify-between gap-2 flex-shrink-0 shadow-lg">
              <button
                onClick={() => handlePageChange(modalPage - 1)}
                disabled={modalPage <= 1}
                className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl disabled:opacity-30 cursor-pointer flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Page</span>
              </button>

              <button
                onClick={() => {
                  setJumpPageInput(String(modalPage));
                  setIsJumpDialogOpen(true);
                }}
                className="py-2 px-3 bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-1"
                title="Tap to jump to another page"
              >
                <span>Page {modalPage}/{totalPages}</span>
                <span className="text-[9px] bg-red-600 text-white px-1 py-0.2 rounded font-mono">
                  Go ⚡
                </span>
              </button>

              <button
                onClick={() => handlePageChange(modalPage + 1)}
                disabled={modalPage >= totalPages}
                className="flex-1 py-2 px-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl disabled:opacity-30 cursor-pointer flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
