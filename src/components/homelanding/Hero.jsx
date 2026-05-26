{/* 1. Import */}
import React from "react";
import { ArrowRight } from "lucide-react";
{/* 2. Component */}
const Hero = ({ onStartLearning }) => {
  return (
    /* 3. Main Container: - Added mt-[90px] to prevent the fixed navbar from covering the content */
    /* FIXED: Changed pt-12 to pt-4 to reduce the massive gap below the navbar divider */
    <section className="flex flex-col items-center text-center px-6 pt-4 pb-9 mt-20">
      
      {/* 4. Badge - Reduced bottom margin to mb-6 */}
      <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1 rounded-full mb-6">
        {/* 5. SVG */}
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#0F172A" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        > 
          {/* 6. Polygon */}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        {/* 7. Text inside Badge */}
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#475569]">
          Learn something new every day
        </span>
      </div>

      {/* 8. Main Heading */}
      <h1 className="text-5xl md:text-[80px] font-extrabold text-[#0F172A] leading-[0.95] tracking-[-0.04em] max-w-4xl mb-10">
        Knowledge that fits in <br /> 
        <span className="inline-block">two minutes.</span>
      </h1>

      {/* 9. Subtext */}
      <p className="text-[#64748B] text-[18px] max-w-2xl leading-relaxed mb-12">
        MicroLearn turns complex topics into bite-sized daily lessons. Spend two 
        minutes, take a quick quiz, and build lasting knowledge — one day at a time.
      </p>

      {/* 10. Button */}
      <button 
        onClick={onStartLearning}
        className="bg-[#101827] text-white px-10 py-4 rounded-full font-bold text-base flex items-center gap-2 hover:bg-opacity-90 transition mb-12"
      >
        Start learning 
        <ArrowRight size={18} strokeWidth={3} />
      </button>

      {/* 11. Stats Section - Removed border-t and reduced mt/pt */}
      <div className="w-full max-w-lg flex justify-between items-center mt-0">
        <div className="text-center">
          <h3 className="text-[32px] font-[900] text-[#0F172A] tracking-tight">9+</h3>
          <p className="text-sm font-medium text-[#94A3B8]">Topics</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-[32px] font-[900] text-[#0F172A] tracking-tight">30+</h3>
          <p className="text-sm font-medium text-[#94A3B8]">Lessons</p>
        </div>

        <div className="text-center">
          <h3 className="text-[32px] font-[900] text-[#0F172A] tracking-tight">20+</h3>
          <p className="text-sm font-medium text-[#94A3B8]">Quizzes</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;