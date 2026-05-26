import React, { useState } from 'react';
import { Lock, User, Globe, MessageSquare, Briefcase, ChevronDown } from 'lucide-react';

const EditForm = ({ formData, setFormData }) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler for all text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation: Name is required and Password must be entered to enable saving
  // (Note: The Save button is actually in the ProfileCard, but we track validity here or via props)
  const isFormValid = formData.name.trim() !== "" && confirmPassword.length > 0;

  const InputGroup = ({ label, name, value, type = "text", placeholder, icon: Icon, disabled = false, options = null }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
        {label} {name === 'name' && <span className="text-red-500">*</span>}
      </label>
      <div className={`relative flex items-center transition-all ${disabled ? 'opacity-60' : ''}`}>
        <div className="absolute left-4 text-slate-400">
          <Icon size={18} />
        </div>
        
        {options ? (
          <select
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#0F172A] appearance-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all cursor-pointer"
          >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            className={`w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#0F172A] focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all ${disabled ? 'cursor-not-allowed' : ''}`}
          />
        )}
        {options && <div className="absolute right-4 pointer-events-none text-slate-400"><ChevronDown size={16} /></div>}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in slide-in-from-top-2 duration-400">
      
      {/* 🔹 BASIC INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Full Name" name="name" value={formData.name} icon={User} placeholder="Enter your name" />
        <InputGroup label="Email Address" name="email" value={formData.email} icon={Lock} disabled={true} />
        <InputGroup label="Nickname" name="nickname" value={formData.nickname || ""} icon={MessageSquare} placeholder="Cool handle" />
        <InputGroup 
          label="Gender" 
          name="gender" 
          value={formData.gender || "Prefer not to say"} 
          icon={User} 
          options={["Male", "Female", "Non-binary", "Prefer not to say"]} 
        />
        <InputGroup label="Age" name="age" type="number" value={formData.age || ""} icon={User} placeholder="Your age" />
        <InputGroup label="Location" name="location" value={formData.location} icon={Globe} placeholder="City, Country" />
      </div>

      {/* 🔹 BIO (Full Width) */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Bio / About</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="3"
          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold text-[#0F172A] focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
        />
      </div>

      {/* 🔒 SECURITY CONFIRMATION */}
      <div className="pt-6 border-t border-slate-100">
        <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-black text-[#0F172A] flex items-center gap-2">
                <Lock size={16} className="text-blue-600" />
                Confirm Changes
              </h4>
              <p className="text-[12px] text-slate-400 font-medium mt-1">
                Enter your password to authorize these profile updates.
              </p>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;