import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import axios from 'axios';

import LessonHeader from './ui/LessonHeader';
import IntroStep from './steps/IntroStep';
import ContentStep from './steps/ContentStep';
import LessonFooter from './ui/LessonFooter';
import QuizModal from './quiz/QuizModal';

export const LAST_LESSON_KEY = "microlearn_last_lesson";

// ─────────────────────────────────────────────────────────────────────────────
// LessonController — lesson content and totalDays come entirely from the
// backend. The old `totalDays || 4` fallback has been removed; the value
// is always lessonData.totalDays (set to topic.curriculum.length in Dashboard).
// ─────────────────────────────────────────────────────────────────────────────

const LessonController = ({ lessonData, onExit, onExitToTopic, onNextLesson }) => {
  const [isSaved, setIsSaved]     = useState(false);
  const [isRead, setIsRead]       = useState(false);
  const [showQuiz, setShowQuiz]   = useState(false);

  const getToken = () => {
    const rawData = localStorage.getItem("microlearn_user");
    if (!rawData) return null;
    try { return JSON.parse(rawData)?.userData?.token; }
    catch { return null; }
  };

  const completeLesson = async (score = 10) => {
    const token = getToken();
    if (!token || !lessonData?.id) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/complete-lesson/",
        { lessonId: lessonData.id, score },
        { headers: { Authorization: `Token ${token}` } }
      );
    } catch (err) {
      console.error("Completion failed:", err);
    }
  };

  const saveLastLesson = (lesson) => {
    if (!lesson) return;
    try {
      localStorage.setItem(LAST_LESSON_KEY, JSON.stringify({
        id:          lesson.id,
        title:       lesson.title,
        day:         lesson.day,
        time:        lesson.time || lesson.time_estimate,
        category:    lesson.category,
        topic_title: lesson.topic_title || lesson.category,
        totalDays:   lesson.totalDays,   // always a real value — never hardcoded
        savedAt:     new Date().toISOString(),
      }));
    } catch (e) {
      console.warn("Could not save last lesson to localStorage", e);
    }
  };

  useEffect(() => {
    if (!lessonData?.id) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowQuiz(false);
    saveLastLesson(lessonData);

    const token = getToken();

    const checkLessonState = async () => {
      if (!token) { setIsRead(false); setIsSaved(false); return; }
      try {
        const [progressRes, savedRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/lesson-progress/", {
            headers: { Authorization: `Token ${token}` }
          }),
          axios.get("http://127.0.0.1:8000/api/saved-lessons/", {
            headers: { Authorization: `Token ${token}` }
          })
        ]);

        setIsRead(progressRes.data.some(
          p => p.lesson?.id === lessonData.id && p.is_completed
        ));
        setIsSaved(savedRes.data.some(
          item => item.lesson?.id === lessonData.id
        ));
      } catch (err) {
        console.error("Error checking lesson state:", err);
        setIsRead(false);
        setIsSaved(false);
      }
    };

    checkLessonState();
  }, [lessonData?.id]);

  if (!lessonData) return null;

  const handleToggleSave = async () => {
    const previousState = isSaved;
    const token = getToken();
    if (!token) { alert("Please log in to save lessons."); return; }

    setIsSaved(!previousState);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/lessons/toggle-save/",
        { lessonId: lessonData.id },
        { headers: { Authorization: `Token ${token}` } }
      );
      window.dispatchEvent(new Event("savedUpdated"));
    } catch (err) {
      console.error("Failed to save lesson:", err);
      setIsSaved(previousState);
    }
  };

  const handleBack = () => {
    if (onExitToTopic) {
      onExitToTopic();
    } else {
      onExit();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white pb-20">

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-6 px-8">

          <button onClick={handleBack} title="Back to topic">
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-8">
            <button
              onClick={handleToggleSave}
              className={`transition-colors ${isSaved ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
              title={isSaved ? "Unsave lesson" : "Save lesson"}
            >
              <Heart
                size={22}
                fill={isSaved ? "currentColor" : "none"}
                strokeWidth={isSaved ? 0 : 2}
              />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[800px] mx-auto flex flex-col pt-16 px-8">
        <LessonHeader
          topic={lessonData.category}
          title={lessonData.title}
          day={lessonData.day}
          totalDays={lessonData.totalDays}  // real value from backend — no fallback needed
          time={lessonData.time}
        />
        <IntroStep   data={lessonData.content_data?.insight} />
        <ContentStep data={lessonData.content_data} />

        <LessonFooter
          lessonData={lessonData}
          isRead={isRead}
          onMarkComplete={() => setIsRead(true)}
          onNext={() => setShowQuiz(true)}
        />
      </main>

      {showQuiz && (
        <QuizModal
          quizData={lessonData.content_data?.quiz}
          onClose={() => setShowQuiz(false)}
          onComplete={async (earnedScore) => {
            await completeLesson(earnedScore);
            setIsRead(true);
            window.dispatchEvent(new Event("lessonUpdated"));
            window.dispatchEvent(new Event("statsUpdated"));
            window.dispatchEvent(new Event("progressUpdated"));
            setShowQuiz(false);
            onNextLesson(lessonData.day + 1);
          }}
        />
      )}
    </div>
  );
};

export default LessonController;
