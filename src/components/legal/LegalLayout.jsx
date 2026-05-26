import React from 'react';

const LegalLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
      {/* 🟦 1. MAIN CONTAINER */}
      <div className="max-w-[800px] mx-auto px-6 pt-12 space-y-10">
        
        {/* 🟦 2. PAGE HEADER */}
        <div className="border-b border-slate-100 pb-8">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter mb-2">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* 🟦 3. CONTENT SECTIONS (Where Page Data Injects) */}
        <div className="space-y-12">
          {children}
        </div>

        {/* REUSABLE FOOTER NOTE */}
        <div className="pt-10 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs italic">
            Questions? Reach out to support@microlearn.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;