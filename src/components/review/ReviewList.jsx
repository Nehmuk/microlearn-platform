import React from 'react';
import ReviewCard from './ReviewCard';
import { MessageSquarePlus } from 'lucide-react';

const ReviewList = ({ reviews }) => {
  // 🟦 EMPTY STATE (IMPORTANT)
  if (reviews.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in duration-700">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquarePlus size={24} />
        </div>
        <h3 className="text-sm font-black text-[#0F172A] tracking-tight">
          No reviews yet
        </h3>
        <p className="text-slate-400 text-xs font-medium mt-1">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  // 🟦 WHEN DATA EXISTS
  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;