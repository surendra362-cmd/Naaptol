import React, { useState, useEffect } from 'react';
import { Clock, Flame, Package } from 'lucide-react';

export const UrgencyBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 35); // 14 mins 35 secs
  const [viewersCount, setViewersCount] = useState(54);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 10 ? prev - 1 : 14 * 60 + 30));
    }, 1000);

    const viewerTimer = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next < 35 ? 39 : next > 75 ? 68 : next;
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerTimer);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className="bg-amber-50/80 border-y border-amber-200/80 px-4 py-2.5">
      <div className="max-w-md mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold">
            <Flame className="w-4 h-4 fill-rose-500 text-rose-600 animate-bounce" />
            <span>{viewersCount} People Viewing Right Now</span>
          </div>
          <div className="flex items-center gap-1 text-slate-800 bg-white px-2 py-0.5 rounded border border-amber-300 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-red-600" />
            <span className="text-red-600 font-extrabold">{formattedMinutes}:{formattedSeconds}</span>
          </div>
        </div>

        {/* Stock progress meter */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold mb-1">
            <span className="flex items-center gap-1 text-red-700">
              <Package className="w-3.5 h-3.5 text-red-600" />
              Limited Stock: <strong className="text-red-700">Only 7 pieces left</strong> at ₹389
            </span>
            <span className="text-amber-800 font-bold">93% Claimed</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
              style={{ width: '93%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
