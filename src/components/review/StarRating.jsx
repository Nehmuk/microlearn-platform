import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, setRating }) => {
  // 🧠 LOGIC: Track hover state separately from actual rating
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        
        // Determine if star should look "active" (filled)
        // It's active if the starValue is <= current hover OR current rating
        const isActive = starValue <= (hover || rating);
        
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none transition-transform active:scale-125 duration-100"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={28}
              strokeWidth={isActive ? 0 : 2}
              fill={isActive ? "#FACC15" : "none"}
              className={`transition-colors duration-200 ${
                isActive ? "text-[#FACC15]" : "text-slate-200"
              }`}
            />
          </button>
        );
      })}
      
      {/* 🟦 RATING LABEL */}
      <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
        {hover || rating || 0} / 5
      </span>
    </div>
  );
};

export default StarRating;