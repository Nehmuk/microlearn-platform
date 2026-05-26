import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';

const ReportModal = ({ onClose }) => {
  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Issue Reported:", issue);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 🔹 BACKDROP */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* 🔹 MODAL CONTENT */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* HEADER */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Report an Issue</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              What's going on?
            </label>
            <textarea
              autoFocus
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the bug or issue you encountered..."
              rows="5"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-[#0F172A] focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!issue.trim() || isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F172A] text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;