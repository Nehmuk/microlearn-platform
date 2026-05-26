import React from "react";

const Navbar = ({ user, onLogin, onSignup, onGoToDash }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="w-full bg-[#F8FAFC] px-12 py-5 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg">
            M
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            MicroLearn
          </h1>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-8">
          {user ? (
            /* Match Login Button Style exactly */
            <button 
              onClick={onGoToDash} 
              className="bg-[#0F172A] text-white px-8 py-2.5 rounded-full text-base font-bold hover:opacity-90 transition shadow-sm"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button 
                onClick={onSignup} 
                className="text-[#0F172A] text-base font-semibold hover:opacity-70 transition"
              >
                Sign Up
              </button>
              <button 
                onClick={onLogin} 
                className="bg-[#0F172A] text-white px-8 py-2.5 rounded-full text-base font-bold hover:opacity-90 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="w-full h-px bg-gray-200"></div>
    </div>
  );
};

export default Navbar;