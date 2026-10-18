import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { PRODUCT_IMAGES, PRODUCT_COLORS, ColorOption } from '../data/productData';

interface ProductGalleryProps {
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  selectedColor,
  onSelectColor,
  activeIndex,
  setActiveIndex,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const currentImage = PRODUCT_IMAGES[activeIndex];

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length;
    setActiveIndex(prevIdx);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PRODUCT_IMAGES.length;
    setActiveIndex(nextIdx);
    setIsZoomed(false);
  };

  // Keep active thumbnail centered in the scroll view
  useEffect(() => {
    if (thumbContainerRef.current) {
      const activeEl = thumbContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  return (
    <div className="bg-white p-4 max-w-md mx-auto">
      {/* Top Banner tags */}
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3 h-3" />
          80% OFF DEAL
        </span>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          Photo {activeIndex + 1} of {PRODUCT_IMAGES.length}
        </span>
      </div>

      {/* Main Big Image Stage */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/80 shadow-inner group">
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Feature Pill badge over image */}
        {currentImage.badge && (
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {currentImage.badge}
          </div>
        )}

        {/* Zoom trigger hint */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm hover:bg-white transition-all text-[11px] flex items-center gap-1"
          title="Zoom image"
        >
          <Eye className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-[10px] font-semibold pr-1">{isZoomed ? 'Reset' : 'Zoom'}</span>
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-white active:scale-90 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-white active:scale-90 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Title overlay on bottom */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 text-white text-left pointer-events-none">
          <p className="font-bold text-sm tracking-tight">{currentImage.title}</p>
          <p className="text-[11px] text-slate-200 line-clamp-1">{currentImage.subtitle}</p>
        </div>
      </div>

      {/* Thumbnails Row (Small Images) */}
      <div
        ref={thumbContainerRef}
        className="flex gap-2 overflow-x-auto py-2.5 px-0.5 no-scrollbar scroll-smooth"
      >
        {PRODUCT_IMAGES.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              setIsZoomed(false);
            }}
            className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              activeIndex === idx
                ? 'border-red-600 ring-2 ring-red-400/30 scale-105 shadow-sm'
                : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Interactive Slider Track right under the small thumbnails */}
      <div className="mt-0.5 mb-2 px-2.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 shadow-xs">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous thumbnail photo"
          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-all cursor-pointer shadow-xs flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex flex-col justify-center">
          <input
            type="range"
            min={0}
            max={PRODUCT_IMAGES.length - 1}
            value={activeIndex}
            onChange={(e) => {
              const val = Number(e.target.value);
              setActiveIndex(val);
              setIsZoomed(false);
            }}
            aria-label="Slide to view all photos"
            className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mt-1">
            <span>◄ Slide to view all {PRODUCT_IMAGES.length} photos ►</span>
            <span className="font-bold text-red-600">Photo {activeIndex + 1} of {PRODUCT_IMAGES.length}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next thumbnail photo"
          className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-all cursor-pointer shadow-xs flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Color Switcher right below gallery */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700">
            Selected Color: <strong className="text-slate-900">{selectedColor.name}</strong>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            All 3 Colors Available at ₹389
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PRODUCT_COLORS.map(color => {
            const isSelected = selectedColor.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => onSelectColor(color)}
                className={`relative flex flex-col items-center p-2 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-black/20 shadow-xs mb-1"
                  style={{ backgroundColor: color.code }}
                />
                <span className={`text-[11px] font-bold text-center leading-tight ${isSelected ? 'text-red-700' : 'text-slate-800'}`}>
                  {color.name}
                </span>
                {color.tag && (
                  <span className="mt-1 text-[8px] font-extrabold uppercase px-1 py-0.2 bg-orange-100 text-orange-800 rounded">
                    {color.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
