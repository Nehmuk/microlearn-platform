{/* 1. Import */}
import React from "react";

{/* 2. Topics Section */}
const topics = [
  {
    title: "Technology",
    description:
      "Understand the tech shaping the future and how it impacts your everyday life.",
    icon: "💻",
    iconBg: "bg-blue-100",
  },
  {
    title: "Psychology",
    description:
      "Learn how your mind works and build habits that actually stick.",
    icon: "🧠",
    iconBg: "bg-purple-100",
  },
  {
    title: "Finance",
    description:
      "Take control of your money and make smarter financial decisions with confidence.",
    icon: "💰",
    iconBg: "bg-orange-100",
  },
  {
    title: "Marketing",
    description:
      "Discover how brands grow and learn to capture attention in a crowded world.",
    icon: "📢",
    iconBg: "bg-cyan-100",
  },
  {
    title: "Coding",
    description:
      "Start building real things from scratch and turn ideas into working products.",
    icon: "</>",
    iconBg: "bg-indigo-100",
  },
];

{/* 3. Component */}
const Topics = ({ onViewAll }) => {
  {/* 4. Return */}
  return (
    <section className="py-20 bg-white border-y border-[#E2E8F0]">  {/* 5. Section */}
      {/* 6. Container */}
      <div className="max-w-7xl mx-auto px-6">

        {/* 7. Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
            What you will learn
          </h2>
          <p className="text-[#64748B] text-lg">
            Expertly curated topics — new lessons added regularly.
          </p>
        </div>

        {/* 8. Scroll Container */}
        <div className="flex gap-5 overflow-x-auto px-2 pb-2 snap-x snap-mandatory scrollbar-hide">
          {/* 9. map() */} {/* 10. card container */}
          {topics.map((topic, index) => (
            <div
              key={index}
              className="min-w-[240px] bg-white border border-[#F1F5F9] p-6 rounded-2xl shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-md snap-start" 
            >
              {/* 11. Icon Container */}
              <div
                className={`w-14 h-14 ${topic.iconBg} rounded-full flex items-center justify-center text-2xl mb-5`}
              >
                {topic.icon}
              </div>

              {/* 13. Title */}
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                {topic.title}
              </h3>
              
              {/* 14.Description */}
              <p className="text-[#64748B] text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>
          ))}
        </div>

        {/* 15. View All Button*/}
        <div className="mt-14 flex justify-end">
          <button 
            onClick={onViewAll}
            className="text-[#0F172A] font-semibold text-sm hover:underline"
          >
            View all topics →
          </button>
        </div>

      </div>
    </section>
  );
};

export default Topics;