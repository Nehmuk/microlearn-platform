import React, { useState } from 'react';
import { Bell, UserCircle, LogOut, X, Check } from 'lucide-react';

const ProgressHeader = ({ onLogout }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <h2 className="font-bold text-xl text-[#0F172A]">Your Progress</h2>
      
      <div className="flex items-center gap-4">
        {!showConfirm ? (
          <>
            <button className="text-slate-400 hover:text-blue-600 transition p-1.5" title="Notifications">
              <Bell size={20} />
            </button>
            <button className="text-slate-400 hover:text-blue-600 transition p-1.5" title="Profile">
              <UserCircle size={22} />
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1" />
            <button 
              onClick={() => setShowConfirm(true)}
              className="p-1.5 text-slate-400 hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 animate-in fade-in slide-in-from-right-4">
            <span className="text-[11px] font-black text-red-600 uppercase tracking-wider">Are you sure?</span>
            <div className="flex gap-1">
              <button onClick={onLogout} className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <Check size={14} />
              </button>
              <button onClick={() => setShowConfirm(false)} className="p-1 bg-white text-slate-400 rounded-lg border border-slate-200 transition">
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProgressHeader;