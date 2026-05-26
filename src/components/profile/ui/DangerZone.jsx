import React, { useState } from 'react';
import { LogOut, Trash2, AlertTriangle, X, Check } from 'lucide-react';

const DangerZone = ({ onLogout }) => {
  const [isLogOutConfirm, setIsLogOutConfirm] = useState(false);

  return (
    <div className="bg-red-50/30 rounded-xl border border-red-100 p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
      
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 text-red-600 mb-2">
        <AlertTriangle size={18} />
        <h3 className="text-sm font-black uppercase tracking-wider">Danger Zone</h3>
      </div>

      {/* 🔹 LOGOUT SECTION */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-50">
        <div>
          <p className="text-sm font-bold text-[#0F172A]">Sign Out</p>
          <p className="text-[12px] text-slate-400 font-medium">Log out of your current session.</p>
        </div>

        {!isLogOutConfirm ? (
          <button 
            onClick={() => setIsLogOutConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
            <span className="text-[10px] font-black text-red-600 uppercase mr-2">Are you sure?</span>
            <button 
              onClick={onLogout}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
            >
              <Check size={14} />
            </button>
            <button 
              onClick={() => setIsLogOutConfirm(false)}
              className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 🔹 DELETE ACCOUNT SECTION */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-50">
        <div>
          <p className="text-sm font-bold text-red-600">Delete Account</p>
          <p className="text-[12px] text-slate-400 font-medium">Permanently remove all your data.</p>
        </div>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all"
          onClick={() => alert("This would trigger the Delete Modal (Type DELETE to confirm)")}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

    </div>
  );
};

export default DangerZone;