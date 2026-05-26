 {/* 1. Import */}
import React from "react";

 {/* 2. Steps Data */}
const steps = [
  {
    number: "1",
    title: "Choose a Topic",
    description: "Start with a topic that excites you.",
  },
  {
    number: "2",
    title: "Learn Daily",
    description: "Learn a little every day.",
  },
  {
    number: "3",
    title: "Take Quizzes",
    description: "Challenge yourself with quick quizzes.",
  },
  {
    number: "4",
    title: "Track Progress",
    description: "Watch your progress grow day by day.",
  },
];

 {/* 3. Component */}
const HowItWorks = () => {
   {/* 4. Return */}
  return (
    <section className="py-20 bg-[#F1F5F9] border-t border-slate-200">  {/* 5. Section */}
      <div className="max-w-6xl mx-auto px-6">  {/* 6. Container */}
        
        {/* 7. Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            How it works
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            Four simple steps to start your daily learning habit.
          </p>
        </div>

        {/* 8. Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
           {/* 9. map() */}  {/* 10. Step Card */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              
              {/* 11. Step Circle */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200 group-hover:scale-105 transition duration-300">
                <span className="text-xl font-bold text-[#0F172A]">
                  {step.number}  {/* 12. Number */}
                </span>
              </div>

              {/* 13. Title */}
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                {step.title}
              </h3>

              {/* 14. Description */}
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;