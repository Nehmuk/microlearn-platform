import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  // Use the data sent by Django (user_name and comment)
  const displayName = review.user_name || "Learner";
  const displayDate = new Date(review.created_at).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-black uppercase">
            {displayName.substring(0, 2)}
          </div>
          <div>
            <h4 className="text-sm font-black text-[#0F172A] leading-tight">{displayName}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{displayDate}</p>
          </div>
        </div>

        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < review.rating ? "#FACC15" : "none"} className={i < review.rating ? "text-[#FACC15]" : "text-slate-100"} />
          ))}
        </div>
      </div>

      <div className="pl-0 sm:pl-11">
        <p className="text-slate-600 text-sm leading-relaxed font-medium">
          "{review.comment}" 
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;