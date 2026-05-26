import React from 'react';

/**
 * IntroStep Component
 * Displays the high-level hook/insight for a lesson.
 * Expects 'data' to be the 'insight' object from lessonData.content_data.
 */
const IntroStep = ({ data }) => {
  // Safety check: if the insight object is missing, don't render anything
  if (!data) return null;

  // --- DATA NORMALIZATION ---
  // This extracts the main text. It prioritizes 'content' but falls back 
  // to 'text' if you happen to type that in the Django Admin instead.
  const insightText = data.content || data.text;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative max-w-3xl mx-auto mt-10">
      {/* Editorial Watermark - Large quotation mark behind the text */}
      <div className="absolute -top-16 -left-6 text-slate-100 text-[160px] font-serif select-none -z-10 opacity-60">
        “
      </div>

      {/* Insight Card Container */}
      <div className="bg-slate-100/95 backdrop-blur-sm border-l-[8px] border-emerald-500 p-12 rounded-r-[48px] mb-12 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          {/* Emerald Lightbulb Icon */}
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100">
            <span className="text-sm">💡</span>
          </div>
          
          {/* Label: Pulls from your JSON 'label' field, or defaults to a standard hook */}
          <span className="text-[#10B981] font-black text-[12px] uppercase tracking-[0.35em]">
            {data.label || "The Big Picture"}
          </span>
        </div>

        {/* The Insight Text */}
        {insightText ? (
          <p className="text-[#0F172A] text-xl md:text-2xl font-bold leading-[1.35] tracking-tighter italic">
            {insightText}
          </p>
        ) : (
          <p className="text-slate-400 font-medium italic">
            Preparing your lesson insight...
          </p>
        )}
      </div>
      
      {/* Spacing to separate the Intro from the main body content */}
      <div className="h-8" /> 
    </div>
  );
};

export default IntroStep;