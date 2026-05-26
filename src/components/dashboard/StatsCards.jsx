import React, { useEffect, useState } from 'react';
import { Flame, BookOpen, Star, Loader2 } from 'lucide-react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────
// StatsCards fetches /api/user-stats/ on:
//   1. Initial mount
//   2. "statsUpdated" event — dispatched by LessonController
//      after a lesson is completed (quiz finished)
//
// No local computation. All values come from the backend.
// Points now reflect actual quiz scores (not hardcoded +10).
// ─────────────────────────────────────────────────────────

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    const rawData = localStorage.getItem("microlearn_user");
    if (!rawData) return null;
    try {
      const sessionData = JSON.parse(rawData);
      return sessionData?.userData?.token;
    } catch {
      return null;
    }
  };

  const fetchStats = async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/user-stats/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setStats({
        streak: res.data.streak ?? 0,
        lessonsDone: res.data.lessons_done ?? 0,
        // ✅ Points now come from quiz scores (MCQ=10, T/F=5 per correct answer)
        // Backend no longer uses hardcoded +10 — it uses the score sent by LessonController
        points: res.data.points ?? 0,
      });

    } catch (err) {
      console.error("Stats fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // ✅ Listens for "statsUpdated" event dispatched by LessonController
    // after quiz completion. This triggers an immediate re-fetch so
    // streak, lessons done, and points all update without page refresh.
    const handleUpdate = () => {
      fetchStats();
    };

    window.addEventListener("statsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("statsUpdated", handleUpdate);
    };
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  const cards = [
    {
      label: "Streak",
      value: `${stats.streak} days`,
      icon: <Flame size={19} fill="#f97316" className="text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      bgColor: "bg-[#FFF7ED]",
      borderColor: "border-orange-100",
      textColor: "text-orange-700"
    },
    {
      label: "Lessons Done",
      value: stats.lessonsDone,
      icon: <BookOpen size={19} fill="#3b82f6" className="text-blue-500 group-hover:rotate-12 transition-transform duration-300" />,
      bgColor: "bg-[#EFF6FF]",
      borderColor: "border-blue-100",
      textColor: "text-blue-700"
    },
    {
      label: "Total Points",
      value: `${stats.points} pts`,
      icon: <Star size={19} fill="#eab308" className="text-yellow-500 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-300" />,
      bgColor: "bg-[#FEFCE8]",
      borderColor: "border-yellow-100",
      textColor: "text-yellow-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {cards.map((stat, index) => (
        <div 
          key={index} 
          className={`group ${stat.bgColor} border ${stat.borderColor} p-4 rounded-[24px] 
                     shadow-sm hover:shadow-xl hover:-translate-y-1.5 
                     transition-all duration-500 ease-out
                     cursor-default flex items-center gap-4`}
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 
                        group-hover:shadow-md transition-all duration-300">
            {stat.icon}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">
              {stat.label}
            </p>
            <h3 className={`text-lg font-black ${stat.textColor} leading-tight tracking-tight`}>
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
