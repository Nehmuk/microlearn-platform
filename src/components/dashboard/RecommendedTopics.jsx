import React from 'react';
import { Brain, Code2, Palette, Database, ChevronRight, Laptop, Landmark } from 'lucide-react';

// ✅ ICON MAP (backend-friendly)
const iconMap = {
  Technology: Laptop,
  Finance: Landmark,
  Psychology: Brain,
  Design: Palette,
};

// ✅ KEEP OLD ACCENT SYSTEM EXACT
const accentStyles = {
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
  purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
};

const RecommendedTopics = ({ 
  isSidebarOpen, 
  onStart,
  topics = [] // ✅ backend
}) => {

  // ✅ LIMIT TO 4 (same as your previous logic intention)
  const displayTopics = topics.length ? topics.slice(0, 4) : [];

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col mb-6 px-1">
        <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
          Recommended Topics
        </h3>
        <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider mt-1 opacity-70">
          Curated for your goals
        </p>
      </div>

      <div 
        className={`flex gap-5 w-full pb-8 pt-2 px-1 transition-all duration-300 custom-scrollbar
          ${isSidebarOpen 
            ? 'overflow-x-auto snap-x' 
            : 'overflow-x-auto lg:overflow-x-visible'
          }`}
      >
        {displayTopics.map((topic, index) => {

          // ✅ SAFE DATA MAPPING (NO UI CHANGE)
          const IconComponent = iconMap[topic.category] || Brain;
          const accent = topic.accent_color || "blue";
          const lessonsCount = topic.curriculum?.length || topic.lessons || 0;

          return (
            <div
              key={topic.id || index}
              className={`
                group relative flex-shrink-0 snap-start
                ${isSidebarOpen ? 'w-[280px]' : 'w-[300px] lg:flex-1 lg:min-w-[240px]'} 
                bg-white p-6 rounded-[28px] transition-all duration-500 border border-slate-100 
                flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2
              `}
            >
              {/* Icon Container */}
              <div className={`w-10 h-10 ${accentStyles[accent]?.split(' ')[0] || 'bg-slate-50'} rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <IconComponent 
                  size={20} 
                  className={`${accentStyles[accent]?.split(' text-')[1] || 'text-slate-600'} group-hover:text-white transition-colors duration-300`} 
                />
              </div>

              <div className="flex-grow">
                <h4 className="text-[#0F172A] font-black text-[16px] leading-tight mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h4>

                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium line-clamp-2">
                  {topic.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em]">
                  {lessonsCount} Lessons
                </p>
                
                {/* ✅ EXACT OLD BUTTON STYLE */}
                <button 
                  onClick={() => onStart(topic)}
                  className="flex items-center gap-1.5 text-[#0F172A] font-black text-[11px] uppercase tracking-widest group/btn hover:text-blue-600 transition-colors"
                >
                  <span>Explore</span>
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                </button>
              </div>
              
              {/* Hover Background Gradient */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* ✅ SCROLLBAR EXACT SAME */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 0px;
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecommendedTopics;