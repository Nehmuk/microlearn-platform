import React from "react";

const Footer = ({ onViewChange }) => {
  return (
    <footer className="bg-[#E2E8F0] text-[#0F172A] py-14 px-6 border-t border-slate-300"> 
      <div className="max-w-7xl mx-auto"> 
        
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          
          <div className="flex-1 max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg">
                M
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
                MicroLearn
              </h1>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Explore topics, learn in minutes, and test yourself with quick quizzes.
              Stay consistent and watch your knowledge grow every day.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            
            <div>
              <h4 className="font-semibold text-base mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li 
                  onClick={() => onViewChange?.('about')}
                  className="hover:text-[#0F172A] cursor-pointer transition"
                >
                  About Us
                </li>
                <li 
                  onClick={() => onViewChange?.('contact')}
                  className="hover:text-[#0F172A] cursor-pointer transition"
                >
                  Contact Us
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">
                Community
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li 
                  onClick={() => onViewChange?.('review')}
                  className="hover:text-[#0F172A] cursor-pointer transition"
                >
                  Review Us
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li 
                  onClick={() => onViewChange?.('privacy')}
                  className="hover:text-[#0F172A] cursor-pointer transition"
                >
                  Privacy Policy
                </li>
                <li 
                  onClick={() => onViewChange?.('terms')}
                  className="hover:text-[#0F172A] cursor-pointer transition"
                >
                  Terms of Service
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-6">
          
          <p className="text-slate-500 text-xs font-medium">
            © 2026 MicroLearn. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
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
        </div>

      </div>
    </footer>
  );
};

export default Footer;