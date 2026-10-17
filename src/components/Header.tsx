import React from 'react';
import { Star, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
  onRatingClick?: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  onRatingClick,
  onLogoClick,
}) => {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRatingClick = () => {
    if (onRatingClick) {
      onRatingClick();
    } else {
      const el = document.getElementById('customer-reviews');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Flash Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            NAAPTOL SPECIAL CLEARANCE: DUAL SIM FLIP PHONE FOR JUST ₹389 ONLY!
          </span>
          <span>•</span>
          <span>FREE EXPRESS DELIVERY TO ALL 26,000+ PINCODES IN INDIA</span>
          <span>•</span>
          <span>100% SECURE PREPAID PAYMENT (UPI / GPAY / PHONEPE / CARDS)</span>
          <span>•</span>
          <span className="text-yellow-300">LIMITED STOCK: 80% OFF SPECIAL NAAPTOL DEAL</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Clickable Official Naaptol Logo (Scrolls to Top of Home Page) */}
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Naaptol Home"
            className="flex items-center hover:opacity-90 active:scale-95 transition-transform cursor-pointer text-left focus:outline-none"
            title="Go to Home"
          >
            <img
              src="/images/naaptol_logo.png"
              alt="Naaptol.co.in"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </button>

          {/* Clickable Rating Badge (Scrolls to Reviews Section) */}
          <button
            type="button"
            onClick={handleRatingClick}
            aria-label="View Customer Reviews"
            className="border-l border-slate-200 pl-2 text-left hover:bg-slate-50 p-1 rounded-lg active:scale-95 transition-all cursor-pointer focus:outline-none group"
            title="Click to view all reviews"
          >
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold group-hover:text-amber-600">
              <div className="flex text-amber-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-slate-700 font-bold text-[10px] underline decoration-amber-400 decoration-1 underline-offset-2">
                4.8 (14.8k sold)
              </span>
            </div>
            <div className="text-[9px] text-emerald-700 font-bold tracking-tight">
              ✓ Verified Store
            </div>
          </button>
        </div>

        <button
          onClick={onOrderClick}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>BUY ₹389</span>
        </button>
      </div>

      {/* Trust reassurance banner */}
      <div className="bg-slate-50 border-t border-slate-100 py-1 px-4 flex items-center justify-center gap-3 text-[11px] text-slate-600 font-medium">
        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          100% Genuine Naaptol Pack
        </span>
        <span>•</span>
        <span>7 Days Replacement</span>
        <span>•</span>
        <span className="text-rose-600 font-bold">Online Pay Only (No COD)</span>
      </div>
    </header>
  );
};
