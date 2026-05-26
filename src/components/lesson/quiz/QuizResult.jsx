import React from 'react';
import { Trophy, RotateCcw, ArrowRight, XCircle, CheckCircle2, X } from 'lucide-react';

const QuizResult = ({ quizData, userAnswers, onRetake, onComplete, onClose }) => {
  // Calculate score based on question weight
  const totalPossiblePoints = quizData.reduce((acc, q) => acc + (q.type === 'truefalse' ? 5 : 10), 0);
  
  const earnedPoints = quizData.reduce((acc, q, idx) => {
    const isCorrect = userAnswers[idx] === q.correct;
    const weight = q.type === 'truefalse' ? 5 : 10;
    return acc + (isCorrect ? weight : 0);
  }, 0);

  const isPerfect = earnedPoints === totalPossiblePoints;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* --- REWARD HEADER --- */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 bg-amber-400 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-amber-100 rotate-6 transform transition-transform hover:rotate-12">
            <Trophy size={32} strokeWidth={2.5} />
          </div>
          {isPerfect && (
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-4 border-white animate-bounce">
              <CheckCircle2 size={16} strokeWidth={3} />
            </div>
          )}
        </div>
        
        <h2 className="text-[#0F172A] text-2xl font-black tracking-tighter">
          {earnedPoints} Points
        </h2>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mt-1">
          {isPerfect ? "Legendary Performance!" : "Lesson Completed"}
        </p>
      </div>

      {/* --- FEEDBACK SCROLL AREA --- */}
      <div className="space-y-3 mb-8 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
        {quizData.map((q, idx) => {
          const isCorrect = userAnswers[idx] === q.correct;
          const points = q.type === 'truefalse' ? 5 : 10;
          const wasSkipped = userAnswers[idx] === null || userAnswers[idx] === undefined;

          return (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isCorrect 
                  ? 'border-emerald-100 bg-emerald-50/30' 
                  : 'border-rose-100 bg-rose-50/30'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Question {idx + 1}
                </span>
                <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter ${
                  isCorrect ? 'text-emerald-600' : 'text-rose-500'
                }`}>
                  {isCorrect ? <CheckCircle2 size={12} strokeWidth={3}/> : <XCircle size={12} strokeWidth={3}/>} 
                  {isCorrect ? `+${points}` : '0'} PTS
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/60">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] uppercase font-black text-slate-400 tracking-tight">Your Choice</span>
                  <span className={`text-[12px] font-black leading-none truncate ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {wasSkipped ? "Skipped" : q.options[userAnswers[idx]]}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="flex flex-col gap-1 border-l border-white/60 pl-4">
                    <span className="text-[8px] uppercase font-black text-slate-400 tracking-tight">Correct Answer</span>
                    <span className="text-[12px] font-black text-emerald-700 leading-none truncate">
                      {q.options[q.correct]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="space-y-3">
        <button 
         onClick={() => onComplete(earnedPoints)} 
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#0F172A] text-white rounded-[20px] font-black text-[13px] uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95 hover:bg-emerald-600 transition-all"
        >
          Unlock Next Lesson <ArrowRight size={16} />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onRetake}
            className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-slate-200 hover:bg-slate-50 transition-all"
          >
            <RotateCcw size={14} /> Retake
          </button>
          <button 
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-slate-200 hover:bg-slate-50 transition-all"
          >
            <X size={14} /> Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default QuizResult;