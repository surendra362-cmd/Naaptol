import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { ColorOption } from '../data/productData';

interface StickyBottomBarProps {
  selectedColor: ColorOption;
  onOrderClick: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  selectedColor,
  onOrderClick,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl py-2.5 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Price & Selected Color info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-red-600 leading-none">
              ₹389
            </span>
            <span className="text-xs text-slate-400 line-through font-medium">
              ₹1,999
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div
              className="w-2.5 h-2.5 rounded-full border border-black/30"
              style={{ backgroundColor: selectedColor.code }}
            />
            <span className="text-[10px] font-bold text-slate-700">
              {selectedColor.name}
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700">
              • FREE DELIVERY
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOrderClick}
          className="flex-1 max-w-[220px] py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:to-orange-700 active:scale-95 text-white font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-600/30 glow-btn transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white text-white" />
          <span>ORDER NOW - ₹389</span>
        </button>
      </div>
    </div>
  );
};
