import React from 'react';
import { AlertCircle, ShieldCheck, Trash2, LogOut, ChevronRight } from 'lucide-react';
import DangerZone from '../ui/DangerZone';

const AccountSettings = ({ onLogout, onOpenReport }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* 🔹 SUPPORT & SECURITY SECTION */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Support & Security</h3>
        </div>
        
        <div className="divide-y divide-slate-50">
          {/* Report an Issue */}
          <button 
            onClick={onOpenReport}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-100 transition-colors">
                <AlertCircle size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0F172A]">Report an Issue</p>
                <p className="text-[12px] text-slate-400 font-medium">Found a bug? Let our team know.</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Privacy Settings (Placeholder for future) */}
          <div className="w-full flex items-center justify-between p-6 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0F172A]">Privacy Preferences</p>
                <p className="text-[12px] text-slate-400 font-medium">Manage how your data is used.</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* 🔹 DANGER ZONE SECTION */}
      <DangerZone onLogout={onLogout} />
      
    </div>
  );
};

export default AccountSettings;