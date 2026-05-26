import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import TopicGrid from './topic/TopicGrid';
import TopicModal from './topic/TopicModal';
import { techLessons } from "../../data/lessons/tech";

// ─────────────────────────────────────────────────────────────────────────────
// ExplorePage — two additions from the original:
//
// 1. initialTopicId prop
//    When the user presses the back button inside a lesson, Dashboard navigates
//    to 'explore' and passes the topic id so the modal reopens automatically.
//    Once the modal is open we clear the signal (setSelectedTopic) so it doesn't
//    re-fire on subsequent renders.
//
// 2. handleStartSpecificLesson(lesson, topic)
//    Called when the user clicks a specific lesson row in TopicModal.
//    Starts that exact lesson rather than finding the "next incomplete" one.
//    Passed to TopicModal as the onStartLesson prop.
// ─────────────────────────────────────────────────────────────────────────────

const ExplorePage = ({ onStart, initialTopicId }) => {
  const [topics, setTopics]               = useState([]);
  const [userProgress, setUserProgress]   = useState([]);
  const [loading, setLoading]             = useState(true);

  const [searchQuery, setSearchQuery]     = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]               = useState("Newest");

  const getToken = () => {
    const raw = localStorage.getItem("microlearn_user");
    if (!raw) return null;
    try { return JSON.parse(raw)?.userData?.token; }
    catch { return null; }
  };

  const fetchTopics = useCallback(async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/topics/');
      setTopics(res.data);
    } catch (err) {
      console.error("Topics fetch failed:", err);
    }
  }, []);

  const fetchProgress = useCallback(async () => {
    const token = getToken();
    if (!token) { setUserProgress([]); return; }
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/lesson-progress/", {
        headers: { Authorization: `Token ${token}` }
      });
      setUserProgress(res.data);
    } catch (err) {
      console.error("Progress fetch failed:", err);
      setUserProgress([]);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchTopics(), fetchProgress()]);
      setLoading(false);
    };
    load();
  }, [fetchTopics, fetchProgress]);

  // ✅ NEW: When topics are loaded and initialTopicId is set, open that topic's modal.
  // This fires when Dashboard sends the user back from a lesson to the explore page.
  useEffect(() => {
    if (!initialTopicId || loading || topics.length === 0) return;

    const match = topics.find(t => t.id === initialTopicId);
    if (match) {
      setSelectedTopic(match);
      setIsModalOpen(true);
    }
  }, [initialTopicId, topics, loading]);

  // Re-fetch progress after lesson completion
  useEffect(() => {
    const handle = () => fetchProgress();
    window.addEventListener("lessonUpdated", handle);
    return () => window.removeEventListener("lessonUpdated", handle);
  }, [fetchProgress]);

  const filteredTopics = topics
    .filter(topic => {
      const matchesSearch   = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || topic.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => sortBy === "A-Z" ? a.title.localeCompare(b.title) : 0);

  const handleExplore = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  // Called by footer "Start/Continue Learning" button — finds next incomplete lesson
  const handleStartLearning = (topic) => {
    const completedIds = new Set(
      userProgress.filter(p => p.is_completed).map(p => p.lesson?.id)
    );
    const curriculum  = topic.curriculum || [];
    const nextLesson  = curriculum.find(l => !completedIds.has(l.id)) || curriculum[0];
    if (!nextLesson) return;

    _startLesson(nextLesson, topic);
    setIsModalOpen(false);
  };

  // ✅ NEW: Called by per-lesson row click in TopicModal — starts a SPECIFIC lesson
  const handleStartSpecificLesson = (lesson, topic) => {
    _startLesson(lesson, topic);
    setIsModalOpen(false);
  };

  // Shared lesson-start logic
  const _startLesson = (lesson, topic) => {
    const fullLesson = techLessons?.[lesson.id];
    if (fullLesson) {
      onStart(fullLesson);
    } else {
      onStart({
        ...lesson,
        category:  topic.category,
        totalDays: topic.curriculum?.length || 1,
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-4">

      {/* Header */}
      <div className="mb-10 px-1">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-emerald-600 fill-emerald-600" />
          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Discovery Mode
          </span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter leading-[1.1]">
          Pick up a topic and start
        </h1>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics..."
          className="w-full bg-white border border-slate-100 rounded-[24px] py-4 px-6 text-sm font-bold"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <TopicGrid
          topics={filteredTopics}
          onExplore={handleExplore}
          onStart={handleStartLearning}
          userProgress={userProgress}
        />
      )}

      {/* Modal */}
      <TopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topic={selectedTopic}
        onStart={handleStartLearning}
        onStartLesson={handleStartSpecificLesson}  // ✅ NEW: per-lesson row click
        userProgress={userProgress}
      />
    </div>
  );
};

export default ExplorePage;
