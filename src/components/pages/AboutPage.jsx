import React from 'react';
import { Target, Zap, Rocket, Users } from 'lucide-react';

const AboutPage = () => {
  // Creator Data - Hardcoded as discussed
  const creators = [
    {
      name: "Neha Mukhopadhyay",
      role: "Student",
      bio: "Studying Computer Science & Engineering",
    },
    {
      name: "Ankita Venugopal",
      role: "Student",
      bio: "Studying Artificial Intelligence & Machine Learning",
    },
    {
      name: "Khushi KN",
      role: "Student",
      bio: "Studying Artificial Intelligence & Machine Learning",
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-700">
      {/* 1. MAIN CONTAINER */}
      <div className="max-w-[900px] mx-auto px-6 pt-12 space-y-16">
        
        {/* 2. PAGE HEADER */}
        <div className="border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-2">
            About Us
          </h1>
          <p className="text-slate-400 font-medium">
            Learn more about the vision behind MicroLearn and the team building it.
          </p>
        </div>

        {/* 3. INTRO SECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Zap className="text-blue-600" size={24} />
            What is MicroLearn?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            MicroLearn is a modern learning platform built for people who don’t have hours to study.
            We break down complex topics into short, focused lessons that take just a few minutes to complete—making learning simple, accessible, and easy to stick with.
          </p>
        </section>

        {/* 4. MISSION SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Target className="text-red-500" size={24} />
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Make learning simple and accessible to everyone.",
              "Remove overwhelm with simple, bite-sized lessons",
              "Combine lessons, quizzes, and progress tracking.",
              "Make learning a daily habit."
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <p className="text-slate-700 font-bold text-sm">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CREATORS SECTION */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Users className="text-purple-600" size={24} />
            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
              Meet the Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creators.map((creator, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300"
              >
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-slate-100 mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Rocket size={20} />
                </div>
                
                <h3 className="font-black text-[#0F172A] text-lg tracking-tight">
                  {creator.name}
                </h3>
                <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1 mb-3">
                  {creator.role}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {creator.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;