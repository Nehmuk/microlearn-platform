import React, { useState } from 'react';
import StarRating from './StarRating';
import axios from 'axios';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 🧠 LOGIC: Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);

    // 1. Frontend Validation
    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }
    if (text.trim().length < 5) {
      setError("Review is too short. Tell us a bit more!");
      return;
    }

    setIsLoading(true);

    // 2. Get the Token from LocalStorage
    const session = JSON.parse(localStorage.getItem("microlearn_user"));
    const token = session?.userData?.token;

    if (!token) {
      setError("You must be logged in to post a review.");
      setIsLoading(false);
      return;
    }

    // 3. Construct Payload (Matches Django Serializer)
    const reviewData = {
      rating: rating,
      comment: text, // Changed 'text' to 'comment' to match your Django model
    };

    try {
      // 4. API Call to Django
      const response = await axios.post(
        'http://127.0.0.1:8000/api/reviews/', 
        reviewData, 
        {
          headers: {
            'Authorization': `Token ${token}` // The critical handshake
          }
        }
      );

      // 5. Success Handling
      setIsSuccess(true);
      onReviewSubmit(response.data); // Update parent list with real DB data

      // Reset form
      setRating(0);
      setText("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);

    } catch (err) {
      console.error("Review Error:", err.response?.data);
      setError(err.response?.data?.error || "Failed to post review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300">
      <div className="mb-8">
        <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
          Want to share your thoughts?
        </h2>
        <p className="text-slate-400 text-sm font-medium mt-1">
          How is your MicroLearn journey going so far?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Overall Rating
          </label>
          <div className="flex items-center pt-1">
            <StarRating rating={rating} setRating={setRating} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Review Details
          </label>
          <textarea
            disabled={isLoading}
            rows="4"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            placeholder="What did you learn today? Any suggestions for us?"
            className="w-full mt-1 p-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm resize-none placeholder:text-slate-300"
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
            <span className="text-[10px] font-black uppercase tracking-wider">⚠️ {error}</span>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {isSuccess && (
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">Review posted successfully!</span>
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg shadow-slate-100 active:scale-[0.98] active:shadow-none flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Posting...
            </>
          ) : (
            "Post Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;