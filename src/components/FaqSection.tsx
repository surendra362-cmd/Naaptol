import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/productData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-4 max-w-md mx-auto space-y-4">
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
          <HelpCircle className="w-3 h-3" />
          QUESTIONS & ANSWERS
        </span>
        <h2 className="text-base font-extrabold text-slate-900 mt-1">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-3 text-left font-bold text-xs text-slate-900 bg-slate-50/50 hover:bg-slate-100/50 flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-3 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
