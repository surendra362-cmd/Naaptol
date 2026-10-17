import React from 'react';
import { Star, ShieldAlert, CheckCircle2, Truck, CreditCard, RotateCcw } from 'lucide-react';
import { ColorOption } from '../data/productData';

interface ProductInfoProps {
  selectedColor: ColorOption;
  onOrderClick: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ selectedColor, onOrderClick }) => {
  return (
    <div className="bg-white p-4 max-w-md mx-auto space-y-4">
      {/* Title & Ratings */}
      <div>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('customer-reviews');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mb-1 text-left cursor-pointer hover:opacity-85 active:scale-95 transition-transform"
        >
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold underline decoration-amber-400 underline-offset-2">4.8 Rating</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 underline decoration-slate-300 underline-offset-2">14,820 Verified Orders</span>
        </button>

        <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
          Naaptol 2 Sim Flip Phone With Camera & 4 Languages (PMH1)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Selected Color: <span className="font-bold text-slate-800">{selectedColor.name}</span>
        </p>
      </div>

      {/* Pricing Box */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-50 via-orange-50/70 to-amber-50 border-2 border-red-200">
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl font-black text-red-600 tracking-tight">₹389</span>
          <span className="text-sm text-slate-400 line-through font-medium">₹1,999</span>
          <span className="bg-red-600 text-white font-extrabold text-xs px-2 py-0.5 rounded-full uppercase">
            80% OFF
          </span>
        </div>
        <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
          <span>✓</span> You Save ₹1,610 Today + FREE Express Delivery
        </p>

        {/* STRICT ONLINE PAYMENT POLICY BADGE */}
        <div className="mt-3 p-2.5 rounded-xl bg-white border border-amber-300 shadow-xs flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-tight">
            <p className="font-bold text-slate-900 uppercase tracking-wide">
              100% Online Payment Only (No COD)
            </p>
            <p className="text-slate-600 mt-0.5">
              Due to heavy subsidised clearance price of ₹389, Cash on Delivery is disabled. Pay securely via UPI, Google Pay, PhonePe, Paytm, or Card.
            </p>
          </div>
        </div>
      </div>

      {/* Primary CTA Button */}
      <button
        onClick={onOrderClick}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:to-orange-700 active:scale-98 text-white font-extrabold text-base tracking-wide shadow-xl shadow-orange-600/30 glow-btn transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>ORDER NOW • ₹389</span>
        <span className="text-xs opacity-90 font-medium bg-black/20 px-2 py-0.5 rounded">FREE SHIPPING</span>
      </button>

      {/* Trust Highlights Strip */}
      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
        <div className="flex flex-col items-center">
          <Truck className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">FREE Express Delivery</span>
          <span className="text-[9px] text-slate-500">All India (2-4 Days)</span>
        </div>
        <div className="flex flex-col items-center border-x border-slate-100">
          <RotateCcw className="w-4 h-4 text-emerald-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">7 Days Replacement</span>
          <span className="text-[9px] text-slate-500">100% Risk-Free</span>
        </div>
        <div className="flex flex-col items-center">
          <CreditCard className="w-4 h-4 text-amber-600 mb-1" />
          <span className="text-[10px] font-bold text-slate-800">Instant UPI & Cards</span>
          <span className="text-[9px] text-slate-500">256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Key Features Bullet List */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Key Advantages
        </h3>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Dual SIM Dual Standby:</strong> Use two SIM cards in one compact pocket phone.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Rear Flash Alert Screen:</strong> Check missed calls, battery, and SMS without opening.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>1800 mAh Heavy Duty Battery:</strong> Long-lasting battery with up to 4 days standby.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Wireless FM Radio & Loudspeaker:</strong> Listen out loud without earphones.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Digital Snapshot Camera:</strong> Capture photos and memorable family moments.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>4 Regional Languages:</strong> Simple interface in English, Hindi, Punjabi, and Kannada.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Foldable Protective Body:</strong> Prevents pocket dialling and screen scratches.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
