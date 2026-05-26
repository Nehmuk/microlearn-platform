import React from 'react';

/**
 * OptionItem Component
 * Represents a single selectable answer within a quiz question.
 */
const OptionItem = ({ text, isSelected, onClick, type }) => {
  // Logic to determine points based on question type
  // Defaulting to 10 for standard MCQ and 5 for True/False
  const points = type === 'truefalse' ? 5 : 10;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 group active:scale-[0.99]
        ${isSelected 
          ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-500/10" 
          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/80"
        }`}
    >
      <div className="flex items-center gap-4">
        {/* Selection Indicator (Radio Style) */}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${isSelected 
            ? "border-emerald-500 bg-emerald-500 shadow-sm shadow-emerald-200" 
            : "border-slate-200 bg-white group-hover:border-slate-300"
          }`}
        >
          {isSelected && (
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-in zoom-in duration-300" />
          )}
        </div>
        
        {/* Answer Text */}
        <span className={`text-[14px] font-black tracking-tight transition-colors text-left
          ${isSelected ? "text-emerald-800" : "text-slate-600 group-hover:text-slate-900"}`}
        >
          {text}
        </span>
      </div>

      {/* Points Label (Subtle reward indicator) */}
      <div className={`flex flex-col items-end gap-0.5 transition-opacity ${isSelected ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}>
        <span className={`text-[8px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-lg
          ${isSelected 
            ? "bg-emerald-500 text-white" 
            : "bg-slate-100 text-slate-400"}`}
        >
          +{points}
        </span>
        <span className="text-[7px] font-black text-slate-300 uppercase tracking-tighter">
          Points
        </span>
      </div>
    </button>
  );
};

export default OptionItem;