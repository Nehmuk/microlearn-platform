import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  // 🧠 LOGIC: Form State (Added 'subject' to match Backend Model)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // New field
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 LOGIC: Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null); 
  };

  // 🧠 LOGIC: Validation & Actual API Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Basic Frontend Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // 🚀 REAL BACKEND CALL
      const response = await axios.post('http://127.0.0.1:8000/api/contact/', formData);
      
      console.log("Backend Response:", response.data);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear Form
    } catch (err) {
      console.error("Submission Error:", err.response?.data);
      setError("Server is unreachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
      
      {/* 🟦 SUCCESS MESSAGE OVERLAY */}
      {success ? (
        <div className="py-12 text-center animate-in zoom-in duration-500">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight">Sent Successfully!</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Thanks for reaching out! We've received your message.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-6 text-[11px] font-black uppercase tracking-widest text-[#0F172A] hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          {/* 🟦 FORM HEADER */}
          <div className="mb-8">
            <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
              Send us a Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 🟦 NAME & EMAIL ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Full Name</label>
                <input 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-1 p-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full mt-1 p-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            {/* 🟦 SUBJECT FIELD (Matches Django Model) */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Subject</label>
              <input 
                name="subject"
                type="text" 
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full mt-1 p-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
              />
            </div>

            {/* 🟦 MESSAGE FIELD */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Message</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full mt-1 p-4 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm resize-none"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} />
                <p className="text-[11px] font-bold uppercase tracking-wider">
                  {error}
                </p>
              </div>
            )}

            {/* 🟦 SUBMIT BUTTON */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;