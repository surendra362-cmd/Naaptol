import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { PolicyPageType } from './PolicyModal';

interface FooterProps {
  onOpenPolicy: (page: PolicyPageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-8 pb-28 px-4 text-xs border-t border-slate-800">
      <div className="max-w-md mx-auto space-y-6">
        {/* Naaptol Brand Header */}
        <div className="flex flex-col items-start gap-2 pb-4 border-b border-slate-800">
          <div className="bg-white p-1.5 rounded-lg">
            <img
              src="/images/naaptol_logo.png"
              alt="Naaptol.co.in"
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            India's favorite value shopping destination. 100% genuine products directly delivered to your doorstep.
          </p>
        </div>

        {/* 4 Trust Badges Grid */}
        <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-800">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px]">100% Genuine</p>
              <p className="text-[10px] text-slate-400">Direct Factory Sealed Pack</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px]">Free Shipping</p>
              <p className="text-[10px] text-slate-400">All India Pincodes Covered</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px]">7 Days Return</p>
              <p className="text-[10px] text-slate-400">Easy Replacement Guarantee</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-purple-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px]">Safe Online Pay</p>
              <p className="text-[10px] text-slate-400">UPI, Cards, Net Banking</p>
            </div>
          </div>
        </div>

        {/* Quick Policy & Information Links (On-Demand Lazy Loaded on click) */}
        <div>
          <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2.5">
            Customer Information & Policies:
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onOpenPolicy('about')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>About Us</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('refund')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Refund Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('return')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Return Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('shipping')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Shipping Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('cancellation')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Cancellation Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('privacy')}
              className="text-left py-1.5 px-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Privacy Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onOpenPolicy('contact')}
              className="col-span-2 text-left py-1.5 px-2.5 bg-red-950/60 hover:bg-red-950 text-red-200 hover:text-white rounded-lg flex items-center justify-between border border-red-900/60 transition-colors cursor-pointer"
            >
              <span className="font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                Contact Us (24x7 Customer Support)
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Seller & Dispatch Info */}
        <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2 text-[11px]">
          <p className="font-extrabold text-white text-xs">Official Dispatch & Seller Details:</p>
          <div className="space-y-1 text-slate-300">
            <p><strong>Platform:</strong> Naaptol Online Store (Naaptol.co.in)</p>
            <p><strong>Seller:</strong> Shri Traders Delhi DS (Naaptol Authorized Seller)</p>
            <p><strong>Product:</strong> Naaptol 2 Sim Flip Phone With Camera (PMH1)</p>
            <p><strong>Warranty:</strong> 1 Year Comprehensive Brand Warranty</p>
            <p><strong>Email Support:</strong> support@naaptol.co.in</p>
            <p><strong>Phone Support:</strong> 022-65867005 (Mon - Sat, 9:30 AM to 7:30 PM)</p>
          </div>
        </div>

        {/* Online Payment Policy Disclaimer */}
        <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
          <p className="font-bold text-slate-300 uppercase mb-1">
            Important Information Regarding ₹389 Naaptol Promo Rate:
          </p>
          <p>
            This website is running a limited-period promotional clearance offer at ₹389. To prevent return-to-origin fraud and ensure guaranteed delivery to genuine buyers, Cash on Delivery is disabled. All orders must be prepaid online via UPI, Google Pay, PhonePe, Paytm, or Bank Cards.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-slate-500 pt-2">
          © 2026 Naaptol Online Shopping. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
