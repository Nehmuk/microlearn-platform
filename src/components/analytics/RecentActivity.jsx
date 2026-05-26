import React from 'react';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// RecentActivity receives `activities` as props from ProgressStats.
// ProgressStats derives this from /api/lesson-progress/:
//   - filtered to is_completed === true
//   - sorted by completed_at descending
//   - last 5 taken
//   - mapped to { id, title, topic, date, duration }
// ─────────────────────────────────────────────────────────────────────────────

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="mt-16 px-1">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Recent Activity</h3>
      </div>

      {/* Empty state */}
      {activities.length === 0 ? (
        <div className="flex items-center justify-center py-16 border-2 border-dashed border-slate-100 rounded-[32px]">
          <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">
            Complete a lesson to see activity here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-center justify-between bg-white border border-slate-100 p-4 rounded-[22px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="text-[15px] font-black text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h4>

                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {activity.topic}
                    </p>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {activity.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Duration */}
                <div className="hidden md:flex items-center gap-1.5 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                  <Clock size={12} />
                  <span>{activity.duration}</span>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full border border-slate-50 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                  <ChevronRight size={16} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
