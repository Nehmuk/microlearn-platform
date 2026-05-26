import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";
import axios from "axios"; // Ensure you ran 'npm install axios'

const AuthModal = ({ isOpen, onClose, initialView = "login", onAuthSuccess }) => {
  const [view, setView] = useState(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setView(initialView);
    setError("");
    setIsLoading(false);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    // 1. Determine which Django endpoint to hit
    const url = view === "login" 
      ? "http://127.0.0.1:8000/api/login/" 
      : "http://127.0.0.1:8000/api/signup/";

    // 2. Prepare the data (Django expects 'username' for login by default)
    const payload = view === "login" 
      ? { username: email, password } 
      : { name, email, password };

    try {
      // 3. Make the actual request to the backend
      const response = await axios.post(url, payload);

      // 4. Handle success: Django returns { token, name, email }
      const userData = {
        ...response.data,
        isLoggedIn: true
      };

      const sessionData = {
        userData: userData,
        loginTime: new Date().getTime()
      };

      // Save to local storage so the user stays logged in on refresh
      localStorage.setItem("microlearn_user", JSON.stringify(sessionData));
      
      // Notify App.jsx that auth worked!
      onAuthSuccess(userData); 
      onClose();
    } catch (err) {
      // 5. Handle errors (e.g., wrong password or server down)
      const message = err.response?.data?.error || "Connection failed. Is the Django server running?";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[400px] rounded-[32px] shadow-2xl p-8 overflow-y-auto max-h-[95vh]">
        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-[#0F172A] transition">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">M</div>
          <span className="font-bold text-[#0F172A] text-sm tracking-tight">MicroLearn</span>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-black text-[#0F172A] leading-tight">
            {view === "login" ? "Welcome back" : "Create your account"}
          </h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAuthSubmit}>
          {view === "signup" && (
            <div>
              <label className="block text-[10px] font-bold text-[#0F172A] mb-1.5 uppercase tracking-widest">Full Name</label>
              <input name="name" required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5" />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold text-[#0F172A] mb-1.5 uppercase tracking-widest">Email Address</label>
            <input name="email" required type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5" />
          </div>
          <div className="relative">
            <label className="block text-[10px] font-bold text-[#0F172A] mb-1.5 uppercase tracking-widest">Password</label>
            <input name="password" required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[34px] text-slate-400">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button 
            disabled={isLoading}
            type="submit" 
            className="w-full bg-[#0F172A] text-white py-3.5 rounded-full font-bold text-base mt-2 hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {view === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm font-medium mt-6">
          {view === "login" ? (
            <>Don't have an account? <button type="button" onClick={() => setView("signup")} className="text-[#0F172A] font-bold hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setView("login")} className="text-[#0F172A] font-bold hover:underline">Login</button></>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;