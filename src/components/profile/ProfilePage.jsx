import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from './ui/ProfileCard';
import ProfileInfo from './tabs/ProfileInfo';
import AccountSettings from './tabs/AccountSettings';
import ReportModal from './ui/ReportModal';

// ─────────────────────────────────────────────────────────────────────────────
// ProfilePage — logic only, no UI changes.
//
// On mount:   GET /api/profile/ → populate formData
// On save:    PUT /api/profile/update/ → persist to backend
// localStorage save has been removed entirely.
// Optionally updates the parent user state (name change shows in header).
// ─────────────────────────────────────────────────────────────────────────────

const ProfilePage = ({ user, onLogout, onUserUpdate }) => {
  const [activeTab, setActiveTab]       = useState("info");
  const [isEditMode, setIsEditMode]     = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [saveError, setSaveError]       = useState("");
  const [isSaving, setIsSaving]         = useState(false);

  const [formData, setFormData] = useState({
    name:       "",
    email:      "",
    bio:        "Digital Designer & Learner",
    location:   "Not set",
    occupation: "Developer",
    nickname:   "",
    gender:     "Prefer not to say",
    age:        ""
  });

  // ── TOKEN HELPER ────────────────────────────────────────────────────────────
  const getToken = () => {
    try {
      return JSON.parse(localStorage.getItem("microlearn_user"))?.userData?.token || null;
    } catch {
      return null;
    }
  };

  // ── FETCH PROFILE ON MOUNT ──────────────────────────────────────────────────
  // Calls GET /api/profile/ which returns:
  // { name, email, bio, location, occupation, nickname, gender, age }
  // Falls back gracefully to user prop if the call fails.
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        // No token — fall back to what App.jsx passed as user prop
        if (user) {
          setFormData(prev => ({
            ...prev,
            name:  user.name  || "",
            email: user.email || "",
          }));
        }
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Token ${token}` }
        });

        // Backend returns flat combined object — map directly into formData
        setFormData({
          name:       res.data.name       || user?.name  || "",
          email:      res.data.email      || user?.email || "",
          bio:        res.data.bio        || "Digital Designer & Learner",
          location:   res.data.location   || "Not set",
          occupation: res.data.occupation || "Developer",
          nickname:   res.data.nickname   || "",
          gender:     res.data.gender     || "Prefer not to say",
          age:        res.data.age        || "",
        });
      } catch (err) {
        console.error("Profile fetch failed:", err);
        // Graceful fallback to user prop
        if (user) {
          setFormData(prev => ({
            ...prev,
            name:  user.name  || "",
            email: user.email || "",
          }));
        }
      }
    };

    fetchProfile();
  }, [user?.email]); // re-fetch if the logged-in user changes

  // ── HANDLERS ────────────────────────────────────────────────────────────────

  const handleToggleEdit = () => {
    if (activeTab !== "info") setActiveTab("info");
    setIsEditMode(!isEditMode);
    setSaveError("");
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setIsEditMode(false);
  };

  // ── SAVE → PUT /api/profile/update/ ────────────────────────────────────────
  // Removed all localStorage logic.
  // Sends name + profile fields to Django, updates global user state on success.
  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      setSaveError("You must be logged in to save changes.");
      return;
    }

    setIsSaving(true);
    setSaveError("");

    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/api/profile/update/",
        {
          name:       formData.name,
          bio:        formData.bio,
          location:   formData.location,
          occupation: formData.occupation,
          nickname:   formData.nickname,
          gender:     formData.gender,
          age:        formData.age,
          // email is read-only — not sent
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      // Sync formData with what the backend confirmed (handles any server-side trimming)
      setFormData(prev => ({
        ...prev,
        ...res.data,
        email: prev.email, // keep email as-is (backend doesn't return editable email)
      }));

      // ✅ Optional: update parent user state so MainHeader shows new name immediately
      // onUserUpdate is passed from Dashboard → App and updates the user object in App state
      if (onUserUpdate && res.data.name) {
        onUserUpdate({ name: res.data.name });
      }

      setIsEditMode(false);
    } catch (err) {
      console.error("Profile save failed:", err);
      setSaveError(
        err.response?.data?.error || "Failed to save. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ── CANCEL → revert formData to last fetched values ─────────────────────────
  const handleCancel = () => {
    // Re-fetch from backend to discard any unsaved edits
    // (simpler than tracking a separate "original" copy)
    const token = getToken();
    if (token) {
      axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Token ${token}` }
      }).then(res => {
        setFormData({
          name:       res.data.name       || user?.name  || "",
          email:      res.data.email      || user?.email || "",
          bio:        res.data.bio        || "Digital Designer & Learner",
          location:   res.data.location   || "Not set",
          occupation: res.data.occupation || "Developer",
          nickname:   res.data.nickname   || "",
          gender:     res.data.gender     || "Prefer not to say",
          age:        res.data.age        || "",
        });
      }).catch(() => {
        // Fallback: revert to user prop values
        setFormData(prev => ({
          ...prev,
          name:  user?.name  || "",
          email: user?.email || "",
        }));
      });
    }
    setIsEditMode(false);
    setSaveError("");
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-10 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 🔹 HEADER */}
      <div className="px-1">
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">My Profile</h1>
        <p className="text-slate-400 mt-1 font-bold text-[11px] uppercase tracking-[0.15em]">
          Manage your account and preferences
        </p>
      </div>

      {/* 🔹 TOP CARD COMPONENT */}
      <ProfileCard
        user={user}
        isEditMode={isEditMode}
        onEditToggle={handleToggleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Save error message (no UI component change — plain inline text) */}
      {saveError && (
        <p className="px-2 text-red-500 text-[12px] font-bold">{saveError}</p>
      )}

      {/* 🔹 TAB NAVIGATION */}
      <div className="flex items-center gap-8 border-b border-slate-100 px-2">
        <button
          onClick={() => handleTabSwitch("info")}
          className={`pb-4 text-[12px] font-black uppercase tracking-widest transition-all relative ${
            activeTab === "info" ? "text-[#0F172A]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Profile Info
          {activeTab === "info" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
          )}
        </button>

        <button
          onClick={() => handleTabSwitch("settings")}
          className={`pb-4 text-[12px] font-black uppercase tracking-widest transition-all relative ${
            activeTab === "settings" ? "text-[#0F172A]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Account Settings
          {activeTab === "settings" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full" />
          )}
        </button>
      </div>

      {/* 🔹 CONTENT AREA */}
      <div className="transition-all duration-300 min-h-[400px]">
        {activeTab === "info" ? (
          <ProfileInfo
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <AccountSettings
            onLogout={onLogout}
            onOpenReport={() => setShowReportModal(true)}
          />
        )}
      </div>

      {/* 🔹 MODALS */}
      {showReportModal && (
        <ReportModal onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
