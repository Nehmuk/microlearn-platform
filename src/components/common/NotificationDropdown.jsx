import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Bell, CheckCheck, BookOpen, Flame, Sparkles, Info, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// NotificationDropdown
//
// Props:
//   token  — auth token string (from localStorage via MainHeader)
//
// Behaviour:
//   - Fetches GET /api/notifications/ on mount
//   - Polls every 45 seconds for new notifications
//   - Clicking a notification marks it read (POST /api/notifications/mark-read/)
//   - "Mark all read" button (POST /api/notifications/mark-all-read/)
//   - Click outside the panel closes it
//   - Uses optimistic updates so UI feels instant
// ─────────────────────────────────────────────────────────────────────────────

// Map notif_type → icon component + colour classes
const TYPE_CONFIG = {
  lesson_complete: {
    Icon:    BookOpen,
    bg:      'bg-emerald-50',
    iconCls: 'text-emerald-600',
  },
  streak: {
    Icon:    Flame,
    bg:      'bg-orange-50',
    iconCls: 'text-orange-500',
  },
  welcome: {
    Icon:    Sparkles,
    bg:      'bg-blue-50',
    iconCls: 'text-blue-600',
  },
  info: {
    Icon:    Info,
    bg:      'bg-slate-50',
    iconCls: 'text-slate-500',
  },
};

const getTypeConfig = (type) => TYPE_CONFIG[type] || TYPE_CONFIG.info;

// ─────────────────────────────────────────────────────────────────────────────

const NotificationDropdown = ({ token }) => {
  const [isOpen, setIsOpen]               = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const [loading, setLoading]             = useState(false);

  const dropdownRef = useRef(null);
  const pollRef     = useRef(null);

  // ── API HELPERS ─────────────────────────────────────────────────────────────

  const authHeaders = { Authorization: `Token ${token}` };

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        'http://127.0.0.1:8000/api/notifications/',
        { headers: authHeaders }
      );
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unread_count    || 0);
    } catch (err) {
      console.error('Notifications fetch failed:', err);
    }
  }, [token]);

  // ── MOUNT + POLL ────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchNotifications();

    // Poll every 45 seconds for new notifications
    pollRef.current = setInterval(fetchNotifications, 45_000);

    // Also refresh when a lesson is completed
    const handleLessonUpdated = () => {
      // Small delay so the backend has time to create the notification
      setTimeout(fetchNotifications, 800);
    };
    window.addEventListener('lessonUpdated', handleLessonUpdated);

    return () => {
      clearInterval(pollRef.current);
      window.removeEventListener('lessonUpdated', handleLessonUpdated);
    };
  }, [fetchNotifications]);

  // ── CLICK OUTSIDE TO CLOSE ──────────────────────────────────────────────────

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ── MARK ONE READ ───────────────────────────────────────────────────────────

  const handleMarkRead = async (id) => {
    if (!token) return;

    // Optimistic update — flip is_read immediately in local state
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/notifications/mark-read/',
        { id },
        { headers: authHeaders }
      );
    } catch (err) {
      console.error('Mark read failed:', err);
      // Revert on failure
      fetchNotifications();
    }
  };

  // ── MARK ALL READ ───────────────────────────────────────────────────────────

  const handleMarkAllRead = async () => {
    if (!token || unreadCount === 0) return;

    // Optimistic update
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/notifications/mark-all-read/',
        {},
        { headers: authHeaders }
      );
    } catch (err) {
      console.error('Mark all read failed:', err);
      fetchNotifications();
    }
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative" ref={dropdownRef}>

      {/* ── BELL BUTTON ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative text-slate-400 hover:text-blue-600 transition p-1.5"
        title="Notifications"
      >
        <Bell size={20} />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-0.5 leading-none animate-in zoom-in duration-200">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── DROPDOWN PANEL ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-[360px] bg-white rounded-[24px] shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[#0F172A]" />
              <h3 className="font-black text-[13px] text-[#0F172A] tracking-tight">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-1 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck size={13} />
                  All read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-300 hover:text-slate-500 transition-colors rounded-lg hover:bg-slate-50"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-[380px] overflow-y-auto">
            {notifications.length === 0 ? (

              // ── EMPTY STATE ────────────────────────────────────────────────
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-3">
                  <Bell size={20} className="text-slate-300" />
                </div>
                <p className="font-black text-[12px] text-slate-400 uppercase tracking-[0.2em] text-center">
                  No notifications yet
                </p>
                <p className="text-[11px] text-slate-300 font-medium mt-1 text-center">
                  Complete a lesson to get started
                </p>
              </div>

            ) : (

              // ── NOTIFICATION ITEMS ─────────────────────────────────────────
              <div className="divide-y divide-slate-50">
                {notifications.map((notif) => {
                  const { Icon, bg, iconCls } = getTypeConfig(notif.notif_type);

                  return (
                    <button
                      key={notif.id}
                      onClick={() => !notif.is_read && handleMarkRead(notif.id)}
                      className={`w-full flex items-start gap-3 px-5 py-4 text-left transition-colors duration-200
                        ${notif.is_read
                          ? 'bg-white hover:bg-slate-50/50'
                          : 'bg-blue-50/30 hover:bg-blue-50/60'
                        }`}
                    >
                      {/* Icon */}
                      <div className={`shrink-0 w-9 h-9 ${bg} rounded-xl flex items-center justify-center mt-0.5`}>
                        <Icon size={16} className={iconCls} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-[13px] tracking-tight leading-snug truncate
                            ${notif.is_read ? 'font-bold text-slate-600' : 'font-black text-[#0F172A]'}`}>
                            {notif.title}
                          </p>
                          {/* Unread dot */}
                          {!notif.is_read && (
                            <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mt-1.5">
                          {notif.time_ago}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/30">
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest text-center">
                Showing last {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
