import React from 'react';
import ProgressBar from '../ui/ProgressBar'; // Adjust path based on your folder structure

const LessonHeader = ({ topic, title, day, totalDays, time }) => {
  return (
    <div className="flex flex-col mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Top Metadata Row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#10B981] font-black text-[12px] uppercase tracking-[0.3em]">
          {topic || "Topic"}
        </span>
        <span className="text-slate-300 text-[11px] font-bold">•</span>
        <span className="text-slate-400 font-bold text-[12px] uppercase tracking-[0.2em]">
          Day {day}
        </span>
      </div>

      {/* High-Contrast Title */}
      <h1 className="text-[#0F172A] text-5xl font-black tracking-[-0.05em] leading-[0.95] max-w-2xl mb-6">
        {title}
      </h1>

      {/* Integrated Progress Bar */}
      <div className="max-w-md">
        <ProgressBar 
          currentDay={day} 
          totalDays={totalDays} 
          time={time} 
        />
      </div>
    </div>
  );
};

export default LessonHeader;