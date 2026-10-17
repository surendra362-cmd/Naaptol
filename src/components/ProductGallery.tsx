import React, { useState } from 'react';
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

  const currentImage = PRODUCT_IMAGES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % PRODUCT_IMAGES.length);
  };

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

      {/* Main Image Stage */}
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

      {/* Thumbnails Row */}
      <div className="flex gap-2 overflow-x-auto py-2.5 px-0.5 no-scrollbar scroll-smooth">
        {PRODUCT_IMAGES.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              setIsZoomed(false);
            }}
            className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
              activeIndex === idx
                ? 'border-red-600 ring-2 ring-red-400/30 scale-105'
                : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Quick Color Switcher right below gallery */}
      <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
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
