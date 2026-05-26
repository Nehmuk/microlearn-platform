import React from 'react';
import { Mail, MapPin, Briefcase, AlignLeft, User } from 'lucide-react';

const ViewFields = ({ formData }) => {
  // Helper to render consistent field rows
  const FieldRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/50 transition-colors">
      <div className="mt-1 p-2 bg-white border border-slate-100 rounded-lg text-slate-400">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">
          {label}
        </span>
        <span className={`text-base font-bold tracking-tight ${value ? 'text-[#0F172A]' : 'text-slate-300 italic font-medium'}`}>
          {value || "Not provided"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-3 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FieldRow 
          label="Full Name" 
          value={formData?.name} 
          icon={User} 
        />
        <FieldRow 
          label="Email Address" 
          value={formData?.email} 
          icon={Mail} 
        />
        <FieldRow 
          label="Occupation" 
          value={formData?.occupation} 
          icon={Briefcase} 
        />
        <FieldRow 
          label="Location" 
          value={formData?.location} 
          icon={MapPin} 
        />
      </div>

      {/* Full width Bio section */}
      <div className="mt-2 border-t border-slate-50 pt-2">
        <FieldRow 
          label="Bio / About" 
          value={formData?.bio} 
          icon={AlignLeft} 
        />
      </div>
    </div>
  );
};

export default ViewFields;