import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Box, Check } from 'lucide-react';
import { TECHNICAL_SPECIFICATIONS } from '../data/productData';

export const SpecificationsTable: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedSpecs = isExpanded
    ? TECHNICAL_SPECIFICATIONS
    : TECHNICAL_SPECIFICATIONS.slice(0, 6);

  return (
    <div className="bg-white p-4 max-w-md mx-auto space-y-4">
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
          DETAILED SPECIFICATIONS
        </span>
        <h2 className="text-base font-extrabold text-slate-900 mt-1">
          Technical Details & Package
        </h2>
      </div>

      {/* Package Contents Box */}
      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
          <Box className="w-4 h-4 text-amber-700" />
          <span>What's In The Box:</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
            <span>1 x Smart Dual SIM Flip Phone (PMH1)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
            <span>1 x 1800 mAh Li-ion Rechargeable Battery</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
            <span>1 x User Manual & 1-Year Warranty Card</span>
          </div>
          <div className="text-[11px] text-slate-500 italic mt-0.5">
            (Standard Micro-USB charging cable supported)
          </div>
        </div>
      </div>

      {/* Spec Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-xs">
          <tbody>
            {displayedSpecs.map((spec, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}
              >
                <td className="py-2.5 px-3 font-semibold text-slate-600 border-b border-slate-100 w-2/5 align-top">
                  {spec.label}
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-900 border-b border-slate-100 w-3/5 align-top">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <span>{isExpanded ? 'Show Less Details' : 'View Full Specifications (16 Items)'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
