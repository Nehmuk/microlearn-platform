import React, { useState, useEffect } from 'react';
import ReviewForm from '../review/ReviewForm';
import ReviewList from '../review/ReviewList';
import { Star, Loader2 } from 'lucide-react';
import axios from 'axios';

const ReviewPage = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🧠 LOGIC: Fetch reviews from Django API on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const session = JSON.parse(localStorage.getItem("microlearn_user"));
        const token = session?.userData?.token;
        
        const response = await axios.get('http://127.0.0.1:8000/api/reviews/', {
          headers: { 'Authorization': `Token ${token}` }
        });
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // 🧠 LOGIC: Handle New Review Submission (Called by ReviewForm)
  const handleAddReview = (newReviewFromDB) => {
    // Add the new review at the top of the list immediately
    setReviews(prev => [newReviewFromDB, ...prev]);
  };

  const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
  const averageRating = reviews.length === 0 ? "0.0" : (totalRating / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-[900px] mx-auto px-6 pt-12 space-y-10">
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">User Reviews</h1>
          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">Real feedback from our community</p>
        </div>

        {/* AVERAGE RATING BLOCK */}
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-[#0F172A] tracking-tighter">{averageRating}</span>
              <span className="text-slate-300 font-bold text-xl">/ 5.0</span>
            </div>
            <div className="flex gap-1 mt-3 justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < Math.round(averageRating) ? "#FACC15" : "none"} className={i < Math.round(averageRating) ? "text-[#FACC15]" : "text-slate-200"} />
              ))}
            </div>
            <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] mt-4">
              Based on {reviews.length} total {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <div className="hidden md:block h-16 w-px bg-slate-100" />
          <div className="text-center md:text-right max-w-[250px]">
            <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
              "Consistency is the key to mastery. Share your journey with fellow learners."
            </p>
          </div>
        </div>

        <div className="pt-4">
          <ReviewForm onReviewSubmit={handleAddReview} />
        </div>

        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Community Feed</h3>
            <div className="h-px w-full bg-slate-100" />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-300" /></div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;