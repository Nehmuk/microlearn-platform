import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  // 📝 DATA ARRAY for easy maintenance
  const contactDetails = [
    {
      icon: <Mail className="text-[#0F172A]" size={20} />,
      title: "Email Us",
      value: "support@microlearn.com",
      subtext: "Online support 24/7"
    },
    {
      icon: <Phone className="text-[#0F172A]" size={20} />,
      title: "Call Us",
      value: "+91 XXXXX XXXXX",
      subtext: "Mon - Fri, 9am - 6pm"
    },
    {
      icon: <MapPin className="text-[#0F172A]" size={20} />,
      title: "Visit Us",
      value: "Hyderabad, India",
      subtext: "Tech Hub, HITEC City"
    }
  ];

  return (
    <div className="space-y-8">
      {/* 🟦 CONTACT SECTION HEADING */}
      <div className="px-1">
        <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
          Get in Touch
        </h2>
        <p className="text-slate-400 text-sm font-medium mt-1">
          Have a specific inquiry or just want to say hi?
        </p>
      </div>

      {/* 🟦 INFO CARDS CONTAINER */}
      <div className="space-y-4">
        {contactDetails.map((item, index) => (
          <div 
            key={index}
            className="group p-5 rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-md flex items-start gap-4"
          >
            {/* ICON WRAPPER */}
            <div className="p-3 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
              {item.icon}
            </div>

            {/* TEXT WRAPPER */}
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                {item.title}
              </h3>
              <p className="text-sm font-bold text-[#0F172A]">
                {item.value}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {item.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;