import { 
  Play, ArrowRight, Monitor, Cpu, Globe, 
  Database, Shield, Brain, Laptop, Landmark, 
  Paintbrush, Zap
} from 'lucide-react';

const iconMap = {
  laptop: Laptop,
  monitor: Monitor,
  cpu: Cpu,
  globe: Globe,
  database: Database,
  shield: Shield,
  brain: Brain,
  landmark: Landmark,
  paintbrush: Paintbrush
};

// ✅ TopicCard reads userProgress (array of UserLessonProgress objects from /api/lesson-progress/)
// and derives isStarted purely from backend data — no local state involved.
const TopicCard = ({ topic, onExplore, onStart, userProgress = [] }) => {
  const { title, icon, description, subtopics = [], curriculum = [] } = topic;

  const IconComponent =
    typeof icon === 'string'
      ? (iconMap[icon.toLowerCase()] || Monitor)
      : (icon || Monitor);

  const visibleSubtopics = subtopics.slice(0, 3);
  const remainingCount = subtopics.length - 3;

  // ✅ Build a Set of all lesson IDs that have ANY progress record
  // (completed OR just started — both count as "started" for the card)
  const progressLessonIds = new Set(
    userProgress.map(p => p.lesson?.id).filter(Boolean)
  );

  const completedLessonIds = new Set(
    userProgress.filter(p => p.is_completed).map(p => p.lesson?.id).filter(Boolean)
  );

  // A topic is "started" if ANY of its lessons appear in the user's progress records
  const isStarted = curriculum.some(l => progressLessonIds.has(l.id));

  // Count for progress display (optional, for future use)
  const completedCount = curriculum.filter(l => completedLessonIds.has(l.id)).length;

  return (
    <div className="group bg-white border border-slate-50 p-10 rounded-[48px] flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(15,23,42,0.1)] hover:-translate-y-2">
      
      {/* Icon */}
      <div className="relative w-20 h-20 bg-[#F8FAFC] rounded-[28px] flex items-center justify-center mb-8 group-hover:bg-blue-50 transition-colors">
        <IconComponent size={32} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
        
        {isStarted && (
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white">
            <Zap size={12} fill="currentColor" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[#0F172A] font-black text-3xl mb-3 tracking-tighter leading-none">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-[15px] leading-relaxed mb-8 font-bold tracking-tight">
        {description}
      </p>

      {/* Subtopics */}
      <div className="space-y-3 mb-10">
        {visibleSubtopics.map((sub, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isStarted ? 'bg-emerald-500/20' : 'bg-blue-600/20'}`} />
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">
              {sub}
            </span>
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="flex items-center gap-3 pt-1">
            <div className="w-2 h-2 opacity-0 rounded-full" />
            <span className={`text-[11px] font-black uppercase tracking-widest ${
              isStarted ? 'text-emerald-600' : 'text-blue-600'
            }`}>
              +{remainingCount} more
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-auto">
        <button 
          onClick={() => onExplore(topic)} 
          className="flex-1 flex items-center justify-center gap-2 py-5 rounded-[22px] border border-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
        >
          Explore <ArrowRight size={16} />
        </button>

        <button 
          onClick={() => onStart(topic)}
          className={`flex-[1.9] flex items-center justify-center gap-2 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95
            ${isStarted 
              ? "bg-emerald-600 text-white hover:bg-emerald-700" 
              : "bg-[#0F172A] text-white hover:bg-blue-600"
            }`}
        >
          <Play size={13} fill="currentColor" />
          {isStarted ? "Continue Learning" : "Start Learning"}
        </button>
      </div>
    </div>
  );
};

export default TopicCard;
