import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; 

// --- LANDING COMPONENTS ---
import Navbar from "./components/homelanding/Navbar";
import Hero from "./components/homelanding/Hero";
import Topics from "./components/homelanding/Topics";
import Features from "./components/homelanding/Features";
import HowItWorks from "./components/homelanding/HowItWorks";
import Footer from "./components/homelanding/Footer";

// --- STATIC PAGES ---
import AboutPage from "./components/pages/AboutPage"; 
import PrivacyPage from "./components/pages/PrivacyPage"; 
import TermsPage from "./components/pages/TermsPage"; 
import ContactPage from "./components/pages/ContactPage"; 
import ReviewPage from "./components/pages/ReviewPage"; 

// --- COMMON COMPONENTS ---
import AuthModal from "./components/common/AuthModal";
// --- DASHBOARD COMPONENTS ---
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardView, setDashboardView] = useState("overview"); 
  const [modalConfig, setModalConfig] = useState({ isOpen: false, view: "login" });
  const [currentLesson, setCurrentLesson] = useState(null);
  const [liveTopics, setLiveTopics] = useState([]);

  // --- 1. SESSION MANAGEMENT & DATA FETCHING ---
  
  // Wrapped in useCallback so it can be passed to child components without causing re-renders
  const fetchCurriculum = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/topics/");
      setLiveTopics(res.data);
    } catch (err) {
      console.error("Failed to fetch curriculum from Django:", err);
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("microlearn_user");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed && parsed.userData) {
          const { userData, loginTime } = parsed;
          const currentTime = new Date().getTime();
          const FOUR_HOURS = 4 * 60 * 60 * 1000;
          if (currentTime - loginTime > FOUR_HOURS) {
            handleLogout();
          } else {
            setUser(userData);
          }
        }
      } catch (e) {
        localStorage.removeItem("microlearn_user");
      }
    }

    fetchCurriculum();
  }, [fetchCurriculum]);

  const handleLogout = () => {
    localStorage.removeItem("microlearn_user");
    setUser(null);
    setShowDashboard(false);
    setDashboardView("overview");
    setCurrentLesson(null);
  };

  // --- 2. LESSON NAVIGATION LOGIC ---
  
  const handleStartLesson = (cardData) => {
    if (!cardData) return;

    // Use the ID first for more accurate matching with backend data
    const topic = liveTopics.find(t => t.id === cardData.id || t.title === cardData.category);
    
    if (topic && topic.curriculum) {
      const lesson = topic.curriculum.find(l => l.status === "In Progress") || topic.curriculum[0];
      setCurrentLesson({ ...lesson, category: topic.title, totalDays: topic.curriculum.length });
    } else {
      setCurrentLesson(cardData);
    }

    setDashboardView("lesson");    
    setShowDashboard(true);
    window.scrollTo(0, 0);
  };

  const handleNextDay = async (nextDayNumber) => {
    if (!currentLesson) return;

    setLiveTopics(prevTopics => prevTopics.map(topic => {
      if (topic.title === currentLesson.category) {
        const updatedCurriculum = topic.curriculum.map(lesson => {
          if (lesson.day === currentLesson.day) {
            return { ...lesson, status: "Completed" };
          }
          if (lesson.day === nextDayNumber) {
            return { ...lesson, status: "In Progress" };
          }
          return lesson;
        });
        return { ...topic, curriculum: updatedCurriculum };
      }
      return topic;
    }));

    const topic = liveTopics.find(t => t.title === currentLesson.category);
    if (topic && topic.curriculum) {
      const nextData = topic.curriculum.find(l => l.day === nextDayNumber);
      
      if (nextData) {
        setCurrentLesson({ ...nextData, category: topic.title, totalDays: topic.curriculum.length });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setDashboardView("overview");
        setCurrentLesson(null);
      }
    }
  };

  const handleViewChange = (newView) => {
    if (newView !== "lesson") {
      setCurrentLesson(null);
    }
    setDashboardView(newView);
    
    if (user) {
      setShowDashboard(true);
    } else {
      window.scrollTo(0, 0);
    }
  };
  const triggerGlobalRefresh = () => {
  window.dispatchEvent(new Event("lessonUpdated"));
  };

  // --- 3. RENDER LOGIC ---

  if (user && showDashboard) {
    return (
      <Dashboard
        user={user}
        onLogout={handleLogout}
        goHome={() => {
        setShowDashboard(false);
        setDashboardView("overview");
      }}
       onStartLesson={handleStartLesson}
        onNextLesson={handleNextDay} 
        activeViewProp={dashboardView} 
        setActiveViewProp={setDashboardView}
        currentLesson={currentLesson} 
        triggerGlobalRefresh={triggerGlobalRefresh}
        // Pass the refresh function so SavedTopics can trigger a re-fetch if needed
        refreshData={fetchCurriculum}
      />
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-emerald-100">
      <Navbar
        user={user}
        onLogin={() => setModalConfig({ isOpen: true, view: "login" })}
        onSignup={() => setModalConfig({ isOpen: true, view: "signup" })}
        onGoToDash={() => setShowDashboard(true)}
        onProfileClick={() => handleViewChange('profile')}
        onLogoClick={() => {
          setDashboardView("overview");
          setShowDashboard(false);
        }} 
      />
      
      <main className="pt-[90px]">
        {dashboardView === "overview" ? (
          <>
            <Hero 
              onStartLearning={user ? () => setShowDashboard(true) : () => setModalConfig({ isOpen: true, view: "login" })} 
            />
            <Topics 
              liveTopics={liveTopics} 
              onViewAll={() => setModalConfig({ isOpen: true, view: "signup" })} 
              onStartLesson={handleStartLesson}
            />
            <Features />
            <HowItWorks />
          </>
        ) : (
          /* Render Static Pages */
          <div className="animate-in fade-in duration-500">
            {dashboardView === "about" && <AboutPage />}
            {dashboardView === "privacy" && <PrivacyPage />}
            {dashboardView === "terms" && <TermsPage />}
            {dashboardView === "contact" && <ContactPage />}
            {dashboardView === "review" && <ReviewPage user={user} />}
            {/* Fallback for pages not explicitly defined */}
            {!["about", "privacy", "terms", "contact", "review"].includes(dashboardView) && (
              <div className="min-h-[60vh] flex items-center justify-center font-bold text-slate-400">
                {dashboardView.toUpperCase()} Page Coming Soon
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onViewChange={handleViewChange} />

      <AuthModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        initialView={modalConfig.view}
        onAuthSuccess={(userData) => {
          setUser(userData);
          setShowDashboard(true);
          fetchCurriculum(); // Fetch fresh data for the newly logged-in user
        }}
      />
    </div>
  );
}

export default App;  