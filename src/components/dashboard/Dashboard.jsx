import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import MainHeader from '../common/MainHeader'; 
import DashFooter from './DashFooter';
import StatsCards from './StatsCards';
import DailyLearning from './DailyLearning';
import RecommendedTopics from './RecommendedTopics';
import ProgressStats from '../analytics/ProgressStats';
import SavedTopics from '../saved/SavedTopics';
import ExplorePage from '../explore/ExplorePage';
import LessonController from '../lesson/LessonController';
import ProfilePage from "../profile/ProfilePage"; 
import AboutPage from "../pages/AboutPage"; 
import PrivacyPage from "../pages/PrivacyPage"; 
import TermsPage from "../pages/TermsPage"; 
import ContactPage from "../pages/ContactPage"; 
import ReviewPage from "../pages/ReviewPage"; 

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard — fully dynamic lesson system.
//
// Static lesson imports (techLessons, designLessons, etc.) and allLessonData
// have been removed. All lesson content now comes from the backend via
// topic.curriculum[n].content_data (serialized by LessonSerializer).
//
// This means adding new topics or lessons in the backend admin automatically
// appears everywhere — no frontend changes required.
// ─────────────────────────────────────────────────────────────────────────────

const Dashboard = ({ 
  user, 
  onLogout, 
  goHome, 
  onStartLesson, 
  onNextLesson,
  activeViewProp, 
  setActiveViewProp, 
  currentLesson 
}) => {

  const [isCollapsed, setIsCollapsed]       = useState(false);
  const [activeView, setActiveView]         = useState(activeViewProp || "overview");
  const [topics, setTopics]                 = useState([]);
  const [pendingTopicId, setPendingTopicId] = useState(null);

  useEffect(() => {
    if (activeViewProp) setActiveView(activeViewProp);
  }, [activeViewProp]);

  const fetchTopics = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/topics/");
      setTopics(res.data || []);
    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  }, []);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);

  const handleViewChange = (view) => {
    setActiveView(view);
    if (setActiveViewProp) setActiveViewProp(view);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // handleInternalStart — builds the lesson object purely from backend data.
  //
  // topic.curriculum comes from TopicSerializer → LessonSerializer, which
  // includes content_data, time (time_estimate), category, topic_title, etc.
  // We no longer need a local allLessonData lookup.
  //
  // totalDays is always set to topic.curriculum.length so ProgressBar
  // and LessonHeader always show the real total — never a hardcoded fallback.
  // ─────────────────────────────────────────────────────────────────────────
  const handleInternalStart = (topic) => {
    const activeLessonMeta =
      topic.curriculum?.find(l => l.status === "in-progress") ||
      topic.curriculum?.[0];

    if (!activeLessonMeta) return;

    // content_data is already included in the lesson object from the backend.
    // No local mapping needed — pass the full lesson object directly.
    onStartLesson({
      ...activeLessonMeta,                          // id, title, day, status, content_data, category, topic_title, time
      totalDays: topic.curriculum?.length ?? 1,     // always the real count from backend
      topicId:   topic.id,                          // used by back button to reopen topic modal
    });
  };

  const handleNextLessonWithRefresh = (nextDay) => {
    onNextLesson(nextDay);
    setTimeout(() => fetchTopics(), 300);
  };

  // Back button inside lesson → navigate to explore + reopen topic modal
  const handleExitToTopic = () => {
    const topicId =
      currentLesson?.topicId ||
      currentLesson?.topic   ||
      null;

    if (topicId) setPendingTopicId(topicId);
    handleViewChange('explore');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0F172A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isCompletedToday = false;
  const currentStreak    = 5;

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = user?.name?.split(' ')[0] || 'Learner';
    if (hour >= 5  && hour < 12) return `Good morning, ${name} ☀️ Ready to start fresh today?`;
    if (hour >= 12 && hour < 17) return `Hey ${name} 👋 Ready for a quick learning break?`;
    if (hour >= 17 && hour < 22) return `Hey ${name} 🌙 Let's wrap the day with a lesson.`;
    return `Still up, ${name}? 👀 One small lesson before you log off?`;
  };

  const getSubtext = () => {
    if (isCompletedToday)   return "Nice work, that's today done 🔥";
    if (currentStreak >= 4) return "You're doing great—keep the streak going 🔥";
    return "Let's build your streak—start with today 🔥";
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        goHome={goHome}
        activeView={activeView}
        setActiveView={handleViewChange}
      />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>

        {activeView !== "lesson" && (
          <MainHeader 
            user={user}
            activeView={activeView} 
            onLogout={onLogout} 
            onProfileClick={() => handleViewChange('profile')}
          />
        )}

        <main className={`p-8 flex-grow w-full max-w-[1400px] mx-auto ${activeView === 'lesson' ? 'pt-12' : ''}`}>

          {activeView === "overview" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-10 px-1">
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter leading-[1.1] max-w-2xl">
                  {getGreeting()}
                </h1>
                <p className="text-slate-400 mt-2 font-bold text-[11px] uppercase tracking-[0.15em]">
                  {getSubtext()}
                </p>
              </div>

              <div className="space-y-10">
                <StatsCards />
                <DailyLearning
                  topic={topics[0]}
                  topics={topics}
                  isCompleted={isCompletedToday}
                  onStart={handleInternalStart}
                />
                <RecommendedTopics
                  isSidebarOpen={!isCollapsed}
                  onStart={handleInternalStart}
                  topics={topics}
                />
              </div>
            </div>
          )}

          {activeView === "progress" && <ProgressStats />}

          {activeView === "saved" && (
            <SavedTopics
              onContinueLearning={handleInternalStart}
              onNavigateToExplore={() => handleViewChange('explore')}
            />
          )}

          {activeView === "explore" && (
            <ExplorePage
              onStart={onStartLesson}
              initialTopicId={pendingTopicId}
              key={pendingTopicId ?? 'explore'}
            />
          )}

          {activeView === "profile"  && <ProfilePage user={user} onLogout={onLogout} />}
          {activeView === "about"    && <AboutPage />}
          {activeView === "privacy"  && <PrivacyPage />}
          {activeView === "terms"    && <TermsPage />}
          {activeView === "contact"  && <ContactPage />}
          {activeView === "review"   && <ReviewPage user={user} />}

          {activeView === "lesson" && currentLesson && (
            <LessonController
              lessonData={currentLesson}
              onExit={() => handleViewChange('overview')}
              onExitToTopic={handleExitToTopic}
              onNextLesson={handleNextLessonWithRefresh}
            />
          )}
        </main>

        {activeView !== "lesson" && (
          <DashFooter onViewChange={handleViewChange} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
