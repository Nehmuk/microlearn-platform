import React from 'react';
import { Clock } from 'lucide-react';

const ProgressBar = ({ currentDay, totalDays, time }) => {
  // Logic: Prevent division by zero and ensure we have numbers
  const safeTotal = totalDays || 1;
  const safeCurrent = currentDay || 0;
  const progressPercent = (safeCurrent / safeTotal) * 100;

  return (
    <div className="flex items-center gap-4 w-full mt-2">
      {/* Time Label */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Clock size={15} className="text-[#10B981]" />
        <span className="text-slate-400 font-black text-[12px] uppercase tracking-widest">
          {time || "3 MIN"}
        </span>
      </div>

      {/* The "Hairline" Bar */}
      <div className="flex-grow h-[1.5px] bg-slate-100 relative">
        <div 
          className="absolute h-full bg-[#0F172A] transition-all duration-1000 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* The Fraction */}
      <span className="text-slate-400 font-black text-[12px] tracking-widest shrink-0">
        {safeCurrent}/{safeTotal}
      </span>
    </div>
  );
};

export default ProgressBar;