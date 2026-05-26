import React from "react";

const DashFooter = ({ onViewChange }) => {
  return (
    <footer className="mt-auto py-6 px-10 border-t border-slate-100 bg-white flex items-center justify-between text-slate-500">
      {/* Copyright */}
      <p className="text-[13px]">© 2026 MicroLearn. All rights reserved.</p>

      {/* Center Links */}
      <div className="flex items-center gap-8 text-[13px] font-medium">
        {/* Added onClick handlers for navigation */}
        <button 
          onClick={() => onViewChange?.('about')} 
          className="hover:text-[#0F172A] transition"
        >
          About Us
        </button>
        <button 
          onClick={() => onViewChange?.('contact')} 
          className="hover:text-[#0F172A] transition"
        >
          Contact Us
        </button>
        <button 
          onClick={() => onViewChange?.('review')} 
          className="hover:text-[#0F172A] transition"
        >
          Review Us
        </button>
        <button 
          onClick={() => onViewChange?.('privacy')} 
          className="hover:text-[#0F172A] transition"
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => onViewChange?.('terms')} 
          className="hover:text-[#0F172A] transition"
        >
          Terms of Service
        </button>
      </div>

      {/* Social Icons - Exact SVGs from your code */}
      <div className="flex items-center gap-3">
        {/* X */}
        <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
          </svg>
        </div>

        {/* Facebook */}
        <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </div>

        {/* LinkedIn */}
        <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </div>

        {/* Instagram */}
        <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <rect width="20" height="20" x="2" y="2" rx="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;