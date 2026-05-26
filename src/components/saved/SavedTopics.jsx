import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Play, Trash2, Bookmark, X, Check, Clock, Loader2 } from 'lucide-react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// Changes from original:
//
// 1. Added `onNavigateToExplore` prop — wired to "Explore Lessons" empty-state button.
//    Dashboard passes () => handleViewChange('explore').
//
// 2. fetchSavedLessons wrapped in useCallback so it can be called from both
//    the mount effect AND the "savedUpdated" event listener without re-creating.
//
// 3. Added window.addEventListener("savedUpdated", ...) so the list re-fetches
//    immediately whenever LessonController toggles a save/unsave.
//
// Everything else (search, filter, remove confirmation UI) is unchanged.
// ─────────────────────────────────────────────────────────────────────────────

const SavedTopics = ({ onContinueLearning, onNavigateToExplore }) => {
  const [savedItems, setSavedItems]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTopic, setFilterTopic] = useState("All Topics");
  const [removingId, setRemovingId]   = useState(null);

  const getAuthToken = () => {
    const rawData = localStorage.getItem("microlearn_user");
    if (!rawData) return null;
    try {
      return JSON.parse(rawData)?.userData?.token;
    } catch {
      return null;
    }
  };

  // ✅ FIX: Wrapped in useCallback so the event listener can reference it
  // without stale closure issues and without re-registering on every render.
  const fetchSavedLessons = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/saved-lessons/",
        { headers: { Authorization: `Token ${token}` } }
      );
      setSavedItems(res.data || []);
    } catch (err) {
      console.error("Saved lessons fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchSavedLessons();
  }, [fetchSavedLessons]);

  // ✅ FIX: Re-fetch whenever LessonController dispatches "savedUpdated"
  // (fires after every successful toggle-save API call)
  useEffect(() => {
    const handleSavedUpdated = () => {
      fetchSavedLessons();
    };

    window.addEventListener("savedUpdated", handleSavedUpdated);
    return () => window.removeEventListener("savedUpdated", handleSavedUpdated);
  }, [fetchSavedLessons]);

  // Remove lesson: call toggle-save (which unsaves it) then remove from local state
  const handleRemove = async (lessonId, savedId) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/lessons/toggle-save/",
        { lessonId },
        { headers: { Authorization: `Token ${token}` } }
      );

      // Remove from local state immediately — no need to re-fetch the whole list
      setSavedItems(prev => prev.filter(item => item.id !== savedId));
      setRemovingId(null);

      // Notify LessonController (in case it's open) to update its heart state
      window.dispatchEvent(new Event("savedUpdated"));
    } catch (err) {
      console.error("Remove failed:", err);
      setRemovingId(null);
    }
  };

  // Filter by search query and selected category
  const filteredItems = savedItems.filter(item => {
    const lesson   = item.lesson;
    if (!lesson) return false;

    const title    = lesson.title?.toLowerCase() || "";
    const category = lesson.category || "General";

    return (
      title.includes(searchQuery.toLowerCase()) &&
      (filterTopic === "All Topics" || category === filterTopic)
    );
  });

  // Build unique topic list for the filter dropdown
  const uniqueTopics = [
    "All Topics",
    ...new Set(savedItems.map(item => item.lesson?.category || "General"))
  ];

  if (loading) {
    return (
      <div className="py-40 text-center text-slate-400">
        <Loader2 className="animate-spin mx-auto mb-4" size={32} />
        <p className="text-sm font-semibold">Loading your lessons...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HEADER */}
      <div className="mb-8 px-1">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter leading-[1.1]">
          All your saved contents
        </h1>
        <p className="text-slate-500 mt-2 font-bold text-[11px] uppercase tracking-[0.15em] opacity-90">
          Pick up where you left off 🔥
        </p>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved lessons..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-200 transition-all shadow-sm"
          />
        </div>

        <div className="relative min-w-[160px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-10 pr-4 text-[11px] font-black uppercase tracking-wider appearance-none focus:outline-none shadow-sm cursor-pointer"
          >
            {uniqueTopics.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
            <Bookmark size={32} className="text-slate-300" />
          </div>
          <h3 className="text-[#0F172A] font-black text-xl mb-2">No saved lessons yet</h3>
          <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto mb-8">
            Save topics to revisit them anytime. Your collection will appear here.
          </p>

          {/*
            ✅ FIX: "Explore Lessons" now navigates to the Explore page.
            onNavigateToExplore is passed from Dashboard:
            () => handleViewChange('explore')
            If the prop isn't provided (e.g., used outside Dashboard),
            the button still renders but does nothing — no crash.
          */}
          <button
            onClick={onNavigateToExplore}
            className="bg-[#0F172A] text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/10"
          >
            Explore Lessons
          </button>
        </div>
      ) : (

        /* SAVED LESSON CARDS */
        <div className="space-y-4">
          {filteredItems.map(item => {
            const lesson = item.lesson;

            return (
              <div
                key={item.id}
                className="group relative bg-white border border-slate-100 p-6 rounded-[28px] flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1"
              >
                {/* LEFT */}
                <div className="flex-grow max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-lg">
                      {lesson.category || "General"}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <Bookmark size={10} fill="currentColor" /> Saved
                    </span>
                  </div>

                  <h2 className="text-[#0F172A] font-black text-xl mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                    {lesson.title}
                  </h2>

                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4 font-medium">
                    Continue your learning journey from where you left off.
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.1em]">
                    <Clock size={12} />
                    <span>Day {lesson.day} • {lesson.time}</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 lg:border-l lg:border-slate-50 lg:pl-8">
                  {removingId === item.id ? (

                    /* REMOVE CONFIRMATION */
                    <div className="flex items-center gap-2 animate-in fade-in zoom-in-95">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-wider mr-2">
                        Remove this lesson?
                      </span>

                      <button
                        onClick={() => handleRemove(lesson.id, item.id)}
                        className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200"
                        title="Confirm remove"
                      >
                        <Check size={18} />
                      </button>

                      <button
                        onClick={() => setRemovingId(null)}
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition"
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </div>

                  ) : (

                    /* NORMAL ACTIONS */
                    <>
                      <button
                        onClick={() => onContinueLearning(lesson)}
                        className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-900/20"
                      >
                        <Play size={14} fill="currentColor" />
                        Continue Learning
                      </button>

                      <button
                        onClick={() => setRemovingId(item.id)}
                        className="p-3.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300"
                        title="Remove from saved"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>

                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedTopics;
