import React from 'react';
import { Eye, Landmark, Laptop, Paintbrush, Brain, Monitor, Cpu, Globe, Database, Shield } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// MostViewedTopics receives `viewedTopics` as props from ProgressStats.
// ProgressStats simulates "views" by counting lesson-progress records per topic
// (each lesson interacted with = 1 view), sorts descending, takes top 4.
//
// Props:
//   viewedTopics — [{ name, icon (string), views }]
// ─────────────────────────────────────────────────────────────────────────────

// Map backend icon string → Lucide component (matches TopicCard/TopicModal)
const iconMap = {
  laptop:    Laptop,
  monitor:   Monitor,
  cpu:       Cpu,
  globe:     Globe,
  database:  Database,
  shield:    Shield,
  brain:     Brain,
  landmark:  Landmark,
  paintbrush: Paintbrush,
};

// Map topic name → accent colour class (fallback to blue)
const accentForName = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("tech"))    return "blue";
  if (n.includes("psych"))   return "purple";
  if (n.includes("fin"))     return "emerald";
  if (n.includes("design"))  return "indigo";
  return "blue";
};

const accentStyles = {
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    hover: "group-hover:bg-blue-600" },
  purple:  { bg: "bg-purple-50",  icon: "text-purple-600",  hover: "group-hover:bg-purple-600" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "group-hover:bg-emerald-600" },
  indigo:  { bg: "bg-indigo-50",  icon: "text-indigo-600",  hover: "group-hover:bg-indigo-600" },
};

const MostViewedTopics = ({ viewedTopics = [] }) => {
  return (
    <div className="mt-16 mb-12 w-full">
      <div className="flex flex-col mb-8 px-1">
        <h3 className="text-xl font-black text-[#0F172A] tracking-tight uppercase">
          Most Viewed Topics
        </h3>
        <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider mt-1 opacity-70">
          Based on your activity
        </p>
      </div>

      {/* Empty state */}
      {viewedTopics.length === 0 ? (
        <div className="flex items-center justify-center py-16 border-2 border-dashed border-slate-100 rounded-[32px]">
          <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">
            Start exploring topics to see them here
          </p>
        </div>
      ) : (
        <div className="flex gap-6 w-full overflow-x-auto pb-10 pt-2 px-1 snap-x custom-scrollbar">
          {viewedTopics.map((topic, index) => {
            // Resolve icon: backend sends a string like "laptop", "brain", etc.
            const IconComponent = iconMap[topic.icon?.toLowerCase()] || Monitor;
            const accent = accentForName(topic.name);
            const styles = accentStyles[accent];

            return (
              <div
                key={index}
                className="group relative flex-shrink-0 snap-start w-[260px] bg-white p-7 rounded-[32px] transition-all duration-500 border border-slate-100 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${styles.bg} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 z-10 ${styles.hover}`}>
                  <IconComponent
                    size={22}
                    className={`${styles.icon} group-hover:text-white transition-colors duration-300`}
                  />
                </div>

                <div className="flex-grow z-10">
                  <h4 className="text-[#0F172A] font-black text-[18px] leading-tight mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h4>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-50 flex flex-col gap-1.5 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <Eye size={14} className="text-slate-400" />
                    </span>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                      {topic.views} {topic.views === 1 ? "Lesson" : "Lessons"} visited
                    </p>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-50/0 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MostViewedTopics;
