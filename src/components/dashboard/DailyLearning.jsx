import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

const LAST_LESSON_KEY = "microlearn_last_lesson";

const getLastOpenedLesson = () => {
  try {
    const raw = localStorage.getItem(LAST_LESSON_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const DailyLearning = ({ 
  topic,
  topics = [],
  isCompleted = false,
  onStart 
}) => {

  const [animatedValue, setAnimatedValue] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [displayLesson, setDisplayLesson] = useState(null);

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

  const fetchProgress = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/lesson-progress/",
        { headers: { Authorization: `Token ${token}` } }
      );

      const allProgress = res.data;

      const lastLesson = getLastOpenedLesson();
      const targetTopic = lastLesson
        ? (topics.find(t =>
            t.title === lastLesson.topic_title ||
            t.category === lastLesson.category ||
            t.id === lastLesson.topicId
          ) || topic)
        : topic;

      if (!targetTopic?.curriculum) {
        setCompletedCount(0);
        setTotalLessons(0);
        setPercentage(0);
        return;
      }

      const topicLessonIds = new Set(targetTopic.curriculum.map(l => l.id));
      // Always use the real curriculum length — never a hardcoded number
      const total = targetTopic.curriculum.length;

      const completed = allProgress.filter(
        p => p.is_completed && topicLessonIds.has(p.lesson?.id)
      ).length;

      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

      setCompletedCount(completed);
      setTotalLessons(total);
      setPercentage(pct);

    } catch (err) {
      console.error("Progress fetch failed", err);
    }
  }, [topic, topics]);

  // Load the last opened lesson from localStorage on mount,
  // or fall back to the first lesson of the first topic for new users.
  useEffect(() => {
    const lastLesson = getLastOpenedLesson();

    if (lastLesson) {
      setDisplayLesson(lastLesson);
    } else if (topic?.curriculum?.[0]) {
      const firstLesson = topic.curriculum[0];
      setDisplayLesson({
        id:          firstLesson.id,
        title:       firstLesson.title,
        day:         firstLesson.day,
        time:        firstLesson.time || firstLesson.time_estimate,
        category:    topic.category,
        topic_title: topic.title,
        // Always set totalDays from curriculum length — never a hardcoded value
        totalDays:   topic.curriculum.length,
      });
    }
  }, [topic]);

  useEffect(() => {
    fetchProgress();

    const handleProgressUpdate = () => {
      fetchProgress();
      const lastLesson = getLastOpenedLesson();
      if (lastLesson) setDisplayLesson(lastLesson);
    };

    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate);
    };
  }, [fetchProgress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 300);
    return () => clearTimeout(timeout);
  }, [percentage]);

  let progressSubText = "";
  if (percentage === 0) progressSubText = "Let's get started.";
  else if (percentage < 30) progressSubText = "Good start—keep going.";
  else if (percentage < 70) progressSubText = "You're making steady progress.";
  else if (percentage < 100) progressSubText = "Almost there.";
  else progressSubText = "All done. Nice work.";

  const handleStart = () => {
    if (!displayLesson) return;

    const matchedTopic = topics.find(t =>
      t.title === displayLesson.topic_title ||
      t.category === displayLesson.category
    ) || topic;

    if (matchedTopic) {
      onStart(matchedTopic);
    } else {
      onStart({
        id:         displayLesson.id,
        title:      displayLesson.topic_title || displayLesson.category,
        category:   displayLesson.category,
        curriculum: [{
          id:       displayLesson.id,
          title:    displayLesson.title,
          day:      displayLesson.day,
          time:     displayLesson.time,
        }]
      });
    }
  };

  return (
    <div className="mb-8 group/main">
      <h3 className="text-xl/7 font-black text-[#0F172A] mb-4 px-1 tracking-tight">
        Your Progress
      </h3>
      
      <div 
        className="rounded-[35px] p-7 border border-white/60 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, #9ea1a5 0%, #c0cfe0 50%, #757788 100%)`
        }}
      >

        {/* Progress Circle */}
        <div className="flex flex-col items-center gap-4 min-w-[160px] z-10">
          <div className="w-32 h-32 relative bg-white/40 p-2.5 rounded-full backdrop-blur-sm shadow-inner border border-white/40">
            <CircularProgressbar
              value={animatedValue}
              text={`${animatedValue}%`}
              styles={buildStyles({
                textSize: '22px',
                pathColor: '#0F172A',
                textColor: '#0F172A',
                trailColor: 'rgba(255,255,255,0.4)',
                strokeLinecap: 'round',
                pathTransitionDuration: 1.5,
              })}
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-black text-[#0F172A]">
              {completedCount} out of {totalLessons || '—'}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 opacity-70">
              {progressSubText}
            </p>
          </div>
        </div>

        {/* Lesson Card */}
        <div className="flex-1 bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/80 flex flex-col md:flex-row justify-between items-center gap-8 z-10">
          
          <div className="space-y-4">
            <div>
              <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.25em]">
                {getLastOpenedLesson() ? "Last Lesson" : "Today's Lesson"}
              </h4>

              <h2 className="text-[30px] font-black text-[#0F172A]">
                {displayLesson?.title || "—"}
              </h2>

              <p className="text-slate-500 text-[11px] uppercase">
                {displayLesson?.topic_title || displayLesson?.category || "—"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Clock size={14} />
              {displayLesson?.time || "3 min"}
            </div>
          </div>

          <button 
            onClick={handleStart}
            className={`px-8 py-4 rounded-[20px] ${
              isCompleted
                ? "bg-emerald-500 text-white"
                : "bg-[#0F172A] text-white"
            }`}
          >
            {isCompleted ? "Completed" : "Continue Learning"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyLearning;
