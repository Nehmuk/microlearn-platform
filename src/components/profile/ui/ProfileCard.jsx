import React from 'react';
import { User, Edit3, Check, X } from 'lucide-react';

const ProfileCard = ({ 
  user, 
  isEditMode, 
  onEditToggle, 
  onSave, 
  onCancel,
  activeTab,
  setActiveTab 
}) => {
  
  const handleEditClick = () => {
    // 1. If user is on 'Settings' tab, switch them back to 'Info' to see the edit fields
    if (activeTab !== 'info') {
      setActiveTab('info');
    }
    // 2. Trigger the edit mode state in the parent
    onEditToggle();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 flex items-center justify-between shadow-sm transition-all">
      
      {/* LEFT & CENTER: Flex Layout for Identity */}
      <div className="flex items-center gap-5">
        {/* Left: Circular Avatar */}
        <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] border border-slate-100 shadow-inner">
          <span className="text-xl font-black">
            {user?.name?.charAt(0) || <User size={24} />}
          </span>
        </div>

        {/* Center: Name and Email */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
            {user?.name || "Learner Name"}
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* RIGHT: Action Buttons */}
      <div className="flex items-center gap-2">
        {!isEditMode ? (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
            <button
              onClick={onSave}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-all shadow-md shadow-green-100"
            >
              <Check size={16} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="p-2.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;