import React from 'react';
import TopicCard from './TopicCard';

const TopicGrid = ({ topics, onExplore, onStart, userProgress = [] }) => {
  
  if (!topics || topics.length === 0) {
    return (
      <div className="w-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[48px]">
        <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">
          No topics found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch animate-in fade-in duration-700">
      {topics.map((topic) => (
        <TopicCard 
          key={topic.id} 
          topic={topic} 
          onExplore={onExplore} 
          onStart={onStart}
          userProgress={userProgress}   // ⭐ FIX ADDED
        />
      ))}
    </div>
  );
};

export default TopicGrid;