import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

import StatsCards from '../dashboard/StatsCards';
import ProgressHero from './ProgressHero';
import RecentActivity from './RecentActivity';
import MostViewedTopics from './MostViewedTopics';

// ─────────────────────────────────────────────────────────────────────────────
// ProgressStats is the single data-fetching hub for the entire Progress page.
//
// It fetches 3 APIs in parallel:
//   1. /api/user-stats/        → streak, lessons_done, points
//   2. /api/lesson-progress/   → per-lesson completion records
//   3. /api/topics/            → full topic + curriculum structure
//
// Then it derives ALL computed values here and passes them down as props:
//   → ProgressHero:       percentage, lessonCount, totalLessons, topicProgress, thisWeekLessons
//   → RecentActivity:     activities[]
//   → MostViewedTopics:   viewedTopics[]
//   → StatsCards:         self-fetching (no change needed)
//
// Auto-refreshes on "progressUpdated" event (dispatched by LessonController).
// ─────────────────────────────────────────────────────────────────────────────

const getAuthToken = () => {
  const rawData = localStorage.getItem("microlearn_user");
  if (!rawData) return null;
  try {
    return JSON.parse(rawData)?.userData?.token || null;
  } catch {
    return null;
  }
};

const ProgressStats = () => {
  const [loading, setLoading] = useState(true);

  // Raw API data
  const [userStats, setUserStats] = useState(null);         // { streak, lessons_done, points }
  const [lessonProgress, setLessonProgress] = useState([]); // UserLessonProgress[]
  const [topics, setTopics] = useState([]);                  // Topic[] with curriculum

  // ── FETCH ALL DATA ────────────────────────────────────────────────────────
  const fetchAllData = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Token ${token}` };

    try {
      const [statsRes, progressRes, topicsRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/user-stats/",      { headers }),
        axios.get("http://127.0.0.1:8000/api/lesson-progress/", { headers }),
        axios.get("http://127.0.0.1:8000/api/topics/"),
      ]);

      setUserStats(statsRes.data);
      setLessonProgress(progressRes.data || []);
      setTopics(topicsRes.data || []);
    } catch (err) {
      console.error("ProgressStats fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Auto-refresh when a lesson is completed anywhere in the app
    window.addEventListener("progressUpdated", fetchAllData);
    window.addEventListener("statsUpdated", fetchAllData);
    return () => {
      window.removeEventListener("progressUpdated", fetchAllData);
      window.removeEventListener("statsUpdated", fetchAllData);
    };
  }, [fetchAllData]);

  // ── DERIVED: GLOBAL PROGRESS ──────────────────────────────────────────────
  // totalLessons  = sum of all lessons across every topic's curriculum
  // completedLessons = count of is_completed === true in lessonProgress
  const totalLessons = topics.reduce(
    (acc, t) => acc + (t.curriculum?.length || 0), 0
  );
  const completedLessons = lessonProgress.filter(p => p.is_completed).length;
  const percentage = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  // ── DERIVED: PER-TOPIC PROGRESS (top 3) ──────────────────────────────────
  // For each topic: count completed lessons belonging to it, compute %
  const completedLessonIds = new Set(
    lessonProgress.filter(p => p.is_completed).map(p => p.lesson?.id)
  );

  const topicProgress = topics
    .map(topic => {
      const total = topic.curriculum?.length || 0;
      const done = (topic.curriculum || []).filter(l => completedLessonIds.has(l.id)).length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return { name: topic.title, progress: pct, total, done };
    })
    .filter(t => t.total > 0)                    // skip topics with no lessons
    .sort((a, b) => b.done - a.done)             // sort by most done first
    .slice(0, 3);                                // top 3 only

  // ── DERIVED: THIS WEEK LESSONS ────────────────────────────────────────────
  // Count lessons completed in the last 7 days (for the ProgressHero tooltip)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const thisWeekLessons = lessonProgress.filter(p => {
    if (!p.is_completed || !p.completed_at) return false;
    return new Date(p.completed_at) >= sevenDaysAgo;
  }).length;

  // ── DERIVED: RECENT ACTIVITY (last 5 completed lessons) ──────────────────
  // Sort completed lessons by completed_at descending, take 5
  const recentActivities = lessonProgress
    .filter(p => p.is_completed && p.completed_at)
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    .slice(0, 5)
    .map((p, idx) => {
      const date = new Date(p.completed_at);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric'
      }); // e.g. "March 30"

      return {
        id: p.id || idx,
        title: p.lesson?.title || "Lesson",
        topic: p.lesson?.topic_title || p.lesson?.category || "General",
        date: formattedDate,
        duration: p.lesson?.time || p.lesson?.time_estimate || "3 min",
      };
    });

  // ── DERIVED: MOST VIEWED TOPICS (simulated from lesson-progress) ──────────
  // Count how many lesson-progress records belong to each topic (= "engagement")
  // Sort descending, take top 4
  const topicEngagement = {};
  lessonProgress.forEach(p => {
    const key = p.lesson?.topic_title || p.lesson?.category || "General";
    topicEngagement[key] = (topicEngagement[key] || 0) + 1;
  });

  // Merge engagement counts with full topic data (for icon lookup)
  const viewedTopics = topics
    .map(topic => ({
      name: topic.title,
      icon: topic.icon,       // string key e.g. "laptop", "brain"
      views: topicEngagement[topic.title] || 0,
    }))
    .filter(t => t.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  // ── STREAK MESSAGE ─────────────────────────────────────────────────────────
  const streak = userStats?.streak ?? 0;

  const getStreakMessage = () => {
    if (streak === 0) return "Start your streak today ⚡";
    if (streak <= 3)  return "Good start—keep it alive ✨";
    if (streak <= 7)  return "Nice streak! Don't break it 🔥";
    return "You're on fire 🔥🔥";
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-10 px-1">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter leading-tight">
            Progress at a glance
          </h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🟦 1. PAGE TITLE SECTION */}
      <div className="mb-10 px-1">
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter leading-tight">
          Progress at a glance
        </h1>
      </div>

      {/* 🟦 2. STATS SECTION WITH DYNAMIC MOTIVATION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <p className="text-slate-500 font-black text-[12px] uppercase tracking-[0.2em]">
            {getStreakMessage()}
          </p>
        </div>
        {/* StatsCards is self-fetching — no props needed */}
        <StatsCards />
      </div>

      {/* 🟦 3. PROGRESS HERO SECTION */}
      <div className="mb-14">
        <ProgressHero
          percentage={percentage}
          lessonCount={completedLessons}
          totalLessons={totalLessons}
          topicProgress={topicProgress}
          thisWeekLessons={thisWeekLessons}
        />
      </div>

      {/* 🟦 4. RECENT ACTIVITY */}
      <RecentActivity activities={recentActivities} />

      {/* 🟦 5. MOST VIEWED TOPICS */}
      <MostViewedTopics viewedTopics={viewedTopics} />

      <div className="h-10" />
    </div>
  );
};

export default ProgressStats;
