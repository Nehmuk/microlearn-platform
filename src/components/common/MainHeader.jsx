import React, { useState } from 'react';
import { LogOut, X, Check } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown'; // ✅ NEW

// ─────────────────────────────────────────────────────────────────────────────
// Changes from original:
//   1. Removed <Bell> import (Bell now lives inside NotificationDropdown)
//   2. Added NotificationDropdown import
//   3. Replaced the dummy Bell button with <NotificationDropdown token={token} />
//   4. Added getToken() helper to read auth token from localStorage
//   All other UI/layout is identical.
// ─────────────────────────────────────────────────────────────────────────────

const MainHeader = ({ onLogout, activeView, user, onProfileClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const titleMap = {
    overview: "Dashboard",
    explore:  "Explore Topics",
    progress: "Your Progress",
    saved:    "Saved Lessons",
    profile:  "Account Settings",
    lesson:   "Learning Session"
  };

  const isProfileActive = activeView === 'profile';

  const getInitial = () => {
    if (user?.name)  return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // ✅ Read auth token so NotificationDropdown can make authenticated requests
  const getToken = () => {
    try {
      return JSON.parse(localStorage.getItem('microlearn_user'))?.userData?.token || null;
    } catch {
      return null;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-center sticky top-0 z-30 w-full">
      <div className="w-full max-w-[1400px] flex items-center justify-between">

        {/* VIEW TITLE */}
        <h2 className="font-black text-xl text-[#0F172A] tracking-tighter">
          {titleMap[activeView] || "MicroLearn"}
        </h2>

        <div className="flex items-center gap-4">
          {!showConfirm ? (
            <>
              {/* ✅ NOTIFICATION BELL — now fully functional */}
              <NotificationDropdown token={getToken()} />

              {/* PROFILE BUTTON */}
              <button
                onClick={onProfileClick}
                className={`flex items-center gap-2 p-1 rounded-full transition-all duration-300 ${
                  isProfileActive
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : 'hover:bg-slate-50'
                }`}
                title="Profile Settings"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                  isProfileActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-slate-100 text-[#0F172A] border border-slate-200'
                }`}>
                  {getInitial()}
                </div>
              </button>

              {/* DIVIDER */}
              <div className="h-6 w-[1px] bg-slate-100 mx-1" />

              {/* LOGOUT TOGGLE */}
              <button
                onClick={() => setShowConfirm(true)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            /* INLINE LOGOUT CONFIRMATION */
            <div className="flex items-center gap-3 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 animate-in fade-in slide-in-from-right-2 duration-300">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.15em]">Sign out?</span>
              <div className="flex gap-1.5">
                <button
                  onClick={onLogout}
                  className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm shadow-red-100"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="p-1.5 bg-white text-slate-400 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
