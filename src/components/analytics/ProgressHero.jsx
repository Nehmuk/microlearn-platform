import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// ─────────────────────────────────────────────────────────────────────────────
// ProgressHero receives ALL data as props from ProgressStats.
// Zero hardcoded values. Zero local API calls.
//
// Props:
//   percentage      — overall completion % (computed in ProgressStats)
//   lessonCount     — total completed lessons across all topics
//   totalLessons    — total lessons across all topics
//   topicProgress   — [{ name, progress, total, done }] top 3 topics
//   thisWeekLessons — lessons completed in last 7 days (for tooltip)
// ─────────────────────────────────────────────────────────────────────────────

const ProgressHero = ({
  percentage = 0,
  lessonCount = 0,
  totalLessons = 0,
  topicProgress = [],
  thisWeekLessons = 0,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate the circle on value change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 300);
    return () => clearTimeout(timeout);
  }, [percentage]);

  // ── WEEKLY INSIGHT ─────────────────────────────────────────────────────────
  // thisWeekLessons comes from ProgressStats (lessons with completed_at in last 7 days)
  const getWeeklyInsight = () => {
    if (thisWeekLessons === 0) return "No lessons this week yet";
    if (thisWeekLessons <= 2)  return "Good start this week";
    if (thisWeekLessons <= 5)  return "You're more active than last week";
    return "Crushing it this week 🔥";
  };

  // ── PROGRESS MESSAGE ───────────────────────────────────────────────────────
  const getProgressMessage = () => {
    if (percentage <= 20) return "Great start—keep going 🚀";
    if (percentage <= 50) return "You're building momentum 🔥";
    if (percentage <= 80) return "Impressive consistency 💪";
    return "Almost there—finish strong 🎯";
  };

  return (
    <div className="group/hero relative">
      <div
        className="rounded-[35px] p-10 border border-white/60 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/10"
        style={{
          background: `linear-gradient(135deg, #9ea1a5 0%, #c0cfe0 50%, #757788 100%)`
        }}
      >
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[0%] w-80 h-80 bg-blue-200/40 blur-[80px] rounded-full group-hover/hero:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-60 h-60 bg-blue-300/20 blur-[70px] rounded-full group-hover/hero:scale-110 transition-transform duration-700 delay-100"></div>

        {/* LEFT: Circular Progress */}
        <div className="flex flex-col items-center gap-6 min-w-[200px] z-10 transition-transform duration-500 group-hover/hero:scale-105 border-r-0 lg:border-r border-white/20 pr-0 lg:pr-12">

          <div className="relative group/tooltip">
            {/* Tooltip: weekly lessons + insight (real data) */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white py-2 px-4 rounded-xl opacity-0 translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl border border-white/10 flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-black text-blue-400">
                +{thisWeekLessons} LESSON{thisWeekLessons !== 1 ? 'S' : ''} THIS WEEK
              </span>
              <span className="text-[9px] font-bold text-slate-400 opacity-80 uppercase tracking-tight">
                {getWeeklyInsight()}
              </span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F172A] rotate-45"></div>
            </div>

            <div className="w-36 h-36 relative bg-white/40 p-3 rounded-full backdrop-blur-sm shadow-inner border border-white/40 cursor-default">
              <CircularProgressbar
                value={animatedValue}
                text={`${animatedValue}%`}
                styles={buildStyles({
                  textSize: '22px',
                  pathColor: '#0F172A',
                  textColor: '#0F172A',
                  trailColor: 'rgba(255, 255, 255, 0.4)',
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1.5,
                })}
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-black text-[#0F172A] tracking-tight">
              {lessonCount} out of {totalLessons} lessons
            </p>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 opacity-70 mt-1">
              {getProgressMessage()}
            </p>
          </div>
        </div>

        {/* RIGHT: Per-topic progress bars (real data) */}
        <div className="flex-1 w-full bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl shadow-blue-900/5 border border-white/80 z-10 transition-all duration-300 hover:bg-white/70">
          <h4 className="text-slate-400 font-black text-[12px] uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#5B7CFD] rounded-full animate-pulse"></span>
            Topic Progress
          </h4>

          {topicProgress.length === 0 ? (
            // Empty state — no lessons started yet
            <div className="flex items-center justify-center py-8">
              <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">
                Start a lesson to see progress
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              {topicProgress.map((topic) => (
                <div key={topic.name} className="group/bar">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-black text-[#0F172A] tracking-tight">
                      {topic.name}
                    </span>
                    <span className="text-sm font-black text-[#0F172A] opacity-60">
                      {topic.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden border border-white/40 shadow-inner">
                    <div
                      className="h-full bg-[#0F172A] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressHero;
