{/* 1. Import */}
import React from "react";
import { Clock, CheckCircle, Flame, CalendarArrowUp } from "lucide-react";

{/* 2. Features Data */}
const features = [
  {
    title: "Learn in minutes",
    description:
      "Short lessons designed to fit into small pockets of your day—no overwhelm, just progress.",
    icon: <Clock size={20} className="text-[#0F172A]" />, 
  },
  {
    title: "Practice instantly",
    description:
      "Quick quizzes help reinforce concepts while they’re still fresh in your mind.",
    icon: <CheckCircle size={20} className="text-[#0F172A]" />, 
  },
  {
    title: "Build consistency",
    description:
      "Turn learning into a habit with small, repeatable actions every single day.",
    icon: <Flame size={20} className="text-[#0F172A]" />, 
  },
  {
    title: "Track your growth",
    description:
      "Stay motivated by clearly seeing your progress and streaks over time.",
    icon: < CalendarArrowUp size={20} className="text-[#0F172A]" />, 
  },
];
{/* 3. Component */}
const Features = () => {
  {/* 4. Return */}
  return (
    <section className="py-24 bg-[#F8FAFC]"> {/* 5. Section */}
      <div className="max-w-7xl mx-auto px-6"> {/* 6. Container */}
        
        {/* 7. Header Section  */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">
            Built for people who don’t have time to waste
          </h2>
          <p className="text-[#64748B] text-lg">
            Learn faster with short, focused lessons designed for real life.
          </p>
        </div>

        {/* 8. Grid Container (Very Imp.) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 9. map() */}  {/* 10. Feature Card */}
          {features.map((feature, index) => (
            <div
              key={index} 
              className="bg-white border border-[#E2E8F0]/60 p-8 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* 11. Icon Box */}
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center mb-6">
                {feature.icon} {/* 12. Icon Rendering */}
              </div>
              
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3 leading-tight">
                {feature.title} {/* 13. Title */}
              </h3>
              
              <p className="text-[#64748B] text-[14px] leading-relaxed">
                {feature.description} {/* 14. Description */}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;