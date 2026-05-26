import React from 'react';
import ViewFields from '../ui/ViewFields';
import EditForm from '../ui/EditForm';

const ProfileInfo = ({ isEditMode, formData, setFormData }) => {
  // 🆕 Safety check: If formData hasn't loaded yet, show a subtle loading state 
  // or return null to prevent mapping errors in child components.
  if (!formData) return <div className="py-20 text-center text-slate-400 font-medium">Loading profile...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      {/* If isEditMode is true, we show the form with inputs.
          If false, we show the clean, read-only layout.
      */}
      {isEditMode ? (
        <EditForm 
          formData={formData} 
          setFormData={setFormData} 
        />
      ) : (
        <ViewFields 
          formData={formData} 
        />
      )}
    </div>
  );
};

export default ProfileInfo;