import React from 'react';
import ContactInfo from '../contact/ContactInfo';
import ContactForm from '../contact/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🟦 1. MAIN CONTAINER */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12 space-y-10">
        
        {/* 🟦 2. PAGE HEADER */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter leading-none">
            Contact Us
          </h1>
          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">
            We’d love to hear from you
          </p>
        </div>

        {/* 🟦 3. MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* 👉 Left: ContactInfo Component */}
          <div className="animate-in slide-in-from-left-4 duration-700 delay-200">
            <ContactInfo />
          </div>

          {/* 👉 Right: ContactForm Component */}
          <div className="animate-in slide-in-from-right-4 duration-700 delay-300">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;