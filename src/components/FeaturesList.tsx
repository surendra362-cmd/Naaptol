import React from 'react';
import { Radio, BatteryCharging, Smartphone, Eye, Volume2, Globe, Shield, Camera } from 'lucide-react';

export const FeaturesList: React.FC = () => {
  return (
    <div className="bg-slate-50 p-4 max-w-md mx-auto space-y-6">
      <div className="text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
          FEATURE HIGHLIGHTS
        </span>
        <h2 className="text-lg font-black text-slate-900 mt-2">
          Designed for Everyday Practical Utility
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Everything you need in a dependable everyday flip phone
        </p>
      </div>

      {/* Feature 1: Flash Alert Outer Screen */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        <div className="aspect-video relative overflow-hidden bg-slate-900">
          <img
            src="/images/pmh1_2.png"
            alt="Flash Alert Outer Screen"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            SMART DISPLAY
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Rear Flash Alert Status Display</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never miss an alert! The exterior screen automatically lights up to show battery percentage, incoming calls, and text messages even when the phone is flipped shut.
          </p>
        </div>
      </div>

      {/* Feature 2: Dual SIM Power */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        <div className="aspect-video relative overflow-hidden bg-slate-900">
          <img
            src="/images/pmh1_3.png"
            alt="Dual SIM Dual Standby"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            DUAL SIM STANDBY
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Two SIM Cards at the Same Time</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Keep your personal family line and work contact active in a single phone. Fast network reception across India for crystal-clear voice clarity.
          </p>
        </div>
      </div>

      {/* Feature 3: Long-Lasting Battery */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        <div className="aspect-video relative overflow-hidden bg-slate-900">
          <img
            src="/images/pmh1_8.png"
            alt="1800mAh Battery"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            LONG BATTERY LIFE
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Relentless 1800 mAh Li-ion Energy</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            No more charging anxiety! Delivers up to 96 hours of standby and 8-10 hours continuous calling. Ideal for travel, work, and seniors.
          </p>
        </div>
      </div>

      {/* Feature 4: Wireless FM Radio */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        <div className="aspect-video relative overflow-hidden bg-slate-900">
          <img
            src="/images/pmh1_5.png"
            alt="Wireless FM Radio"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            WIRELESS FM
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
              <Radio className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Built-in Wireless FM Radio with Loud Speaker</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tune into news, devotional tunes, and music without any wire or headset. Built-in loud stereo speaker plays clearly in any room.
          </p>
        </div>
      </div>

      {/* Feature 5: 4 Regional Languages & Flip Design */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80">
          <div className="p-2 w-fit rounded-lg bg-purple-100 text-purple-600 mb-2">
            <Globe className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 mb-1">4 Languages Supported</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Simple switch between English, Hindi, Punjabi, and Kannada.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80">
          <div className="p-2 w-fit rounded-lg bg-rose-100 text-rose-600 mb-2">
            <Shield className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 mb-1">Durable Flip Body</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Protects the screen and keypad from scratches and accidental pocket dials.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80">
          <div className="p-2 w-fit rounded-lg bg-indigo-100 text-indigo-600 mb-2">
            <Camera className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 mb-1">Digital Camera</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Takes photos and records video clips with expandable 32GB memory card.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80">
          <div className="p-2 w-fit rounded-lg bg-emerald-100 text-emerald-600 mb-2">
            <Volume2 className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 mb-1">Loud Audio & Torch</h4>
          <p className="text-[11px] text-slate-500 leading-snug">
            Audible ringtones for noisy environments plus an ultra-bright emergency torch.
          </p>
        </div>
      </div>
    </div>
  );
};
