import React from 'react';
import { CheckCircle2, Trophy, Lock } from 'lucide-react';

const LessonFooter = ({ lessonData, onNext, isRead, onMarkComplete }) => {
  // Safety check to ensure lessonData exists before trying to access day
  if (!lessonData) return null;

  return (
    <section className="pt-12 border-t border-slate-100 animate-in fade-in duration-700 max-w-3xl mx-auto">
      
      {/* STATUS MESSAGE AREA */}
      <div className="text-center h-8 mb-4">
        {isRead && (
          <p className="text-emerald-600 font-bold text-[12px] uppercase tracking-widest animate-in slide-in-from-top-2">
            Knowledge Captured. Ready for the challenge?
          </p>
        )}
      </div>

      {/* HORIZONTAL ACTION ROW */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* COMPLETED BUTTON */}
        <button 
          onClick={onMarkComplete}
          disabled={isRead}
          className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all min-w-[240px]
            ${isRead 
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default" 
              : "bg-white text-slate-400 border-2 border-slate-100 hover:border-emerald-500 hover:text-emerald-600 active:scale-95 shadow-sm"
            }`}
        >
          {isRead ? (
            <>COMPLETED <CheckCircle2 size={16} /></>
          ) : (
            "Mark as Complete"
          )}
        </button>

        {/* QUIZ BUTTON (LOCKED TILL READ) */}
        <button 
          onClick={isRead ? onNext : null} // Only allow click if read
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all min-w-[240px]
            ${isRead 
              ? "bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200" 
              : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed opacity-60"
            }`}
        >
          <span>Take Quiz</span>
          {isRead ? <Trophy size={16} className="text-amber-400" /> : <Lock size={14} />}
        </button>
      </div>

      {/* NEXT DAY PREVIEW */}
      <p className="text-center mt-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] pb-10">
        Next Up: Day {lessonData.day + 1}
      </p>
    </section>
  );
};

export default LessonFooter;