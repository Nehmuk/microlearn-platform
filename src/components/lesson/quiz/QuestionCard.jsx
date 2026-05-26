import React, { useState } from 'react';
import OptionItem from './OptionItem';
import { AlertCircle } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  selectedOption, 
  onSelect, 
  onNext,
  onSkip 
}) => {
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  
  // Calculate progress for the slim bar
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // Handle cases where options might be undefined
  const options = question?.options || [];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* --- MINI PROGRESS (Ultra Slim) --- */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-[10px] font-black text-emerald-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* --- QUESTION TEXT (Centered & Bold) --- */}
      <div className="mb-6 px-2">
        <h3 className="text-[#0F172A] text-[17px] font-black leading-tight text-center tracking-tight">
          {question.question}
        </h3>
      </div>

      {/* --- OPTIONS LIST --- */}
      <div className="space-y-2.5 mb-8">
        {options.map((option, index) => (
          <OptionItem
            key={index}
            text={option}
            // Passing index to help OptionItem identify itself
            index={index}
            isSelected={selectedOption === index}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      {/* --- ACTION AREA --- */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onNext}
          disabled={selectedOption === null}
          className={`w-full py-4 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all duration-300
            ${selectedOption !== null 
              ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200 active:scale-[0.98] hover:bg-emerald-600" 
              : "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100"
            }`}
        >
          {currentIndex + 1 === totalQuestions ? "See Results" : "Continue"}
        </button>

        {/* --- SKIP LOGIC (Visible on first question only) --- */}
        {currentIndex === 0 && (
          <div className="w-full">
            {!showSkipWarning ? (
              <button 
                onClick={() => setShowSkipWarning(true)}
                className="w-full text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-[0.2em] transition-colors"
              >
                Skip Quiz
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 mt-1 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                <div className="flex items-center gap-1.5 text-rose-500">
                  <AlertCircle size={12} strokeWidth={3} />
                  <span className="text-[9px] font-black uppercase tracking-tight">
                    Skipping earns 0 points
                  </span>
                </div>
                <div className="flex gap-6">
                  <button 
                    onClick={onSkip} 
                    className="text-[10px] font-black text-rose-600 underline uppercase tracking-widest hover:text-rose-700"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => setShowSkipWarning(false)} 
                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;