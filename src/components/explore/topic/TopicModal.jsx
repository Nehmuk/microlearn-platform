import { 
  Play, Monitor, Cpu, Globe, 
  Database, Shield, Brain, Laptop, Landmark, 
  Paintbrush, X, BookOpen, Clock, CheckCircle2, Lock
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TopicModal — two changes from the original:
//
// 1. PER-LESSON LOCK LOGIC (the main fix)
//    Each curriculum row is now individually clickable or locked.
//    Lock rule:
//      isLocked = item.status === 'locked'
//                 AND the lesson is NOT in completedLessonIds
//    The second condition is the critical fix — a lesson that Django still has
//    marked 'locked' (status field) but that the user has already completed
//    via UserLessonProgress must NEVER be blocked. Completed beats locked.
//
//    Locked rows: greyed out, cursor-not-allowed, Lock icon instead of Clock
//    Open rows:   clickable, calls onStartLesson(item, topic)
//
// 2. NEW PROP: onStartLesson(lesson, topic)
//    Called when user clicks a specific lesson row.
//    Separate from onStart(topic) which is still used by the footer button.
//    If onStartLesson is not provided the rows still render but clicking falls
//    back to onStart(topic) — no crash.
// ─────────────────────────────────────────────────────────────────────────────

const iconMap = {
  laptop:     Laptop,
  monitor:    Monitor,
  cpu:        Cpu,
  globe:      Globe,
  database:   Database,
  shield:     Shield,
  brain:      Brain,
  landmark:   Landmark,
  paintbrush: Paintbrush,
};

const TopicModal = ({
  isOpen,
  onClose,
  topic,
  onStart,           // (topic) → starts next incomplete lesson (footer button)
  onStartLesson,     // (lesson, topic) → starts a specific lesson (row click) ✅ NEW
  userProgress = [],
}) => {
  if (!isOpen || !topic) return null;

  const IconComponent =
    typeof topic.icon === 'string'
      ? (iconMap[topic.icon.toLowerCase()] || Monitor)
      : (topic.icon || Monitor);

  // Build progress sets from backend UserLessonProgress records
  const completedLessonIds = new Set(
    userProgress.filter(p => p.is_completed).map(p => p.lesson?.id).filter(Boolean)
  );

  const inProgressLessonIds = new Set(
    userProgress.filter(p => !p.is_completed).map(p => p.lesson?.id).filter(Boolean)
  );

  const curriculum = topic.curriculum || [];

  const hasStarted = curriculum.some(
    l => completedLessonIds.has(l.id) || inProgressLessonIds.has(l.id)
  );

  // ── LESSON ROW CLICK HANDLER ───────────────────────────────────────────────
  const handleLessonClick = (item) => {
    if (onStartLesson) {
      onStartLesson(item, topic);
    } else {
      // Fallback: use the topic-level handler (starts next incomplete)
      onStart(topic);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="overflow-y-auto p-8 md:p-12">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <IconComponent size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter">
                {topic.title}
              </h2>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1">
                <BookOpen size={12} /> Full Curriculum
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-10">
            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Overview
            </h4>
            <p className="text-[#0F172A] text-[15px] leading-[1.7] font-bold">
              {topic.longDescription || topic.description}
            </p>
          </div>

          {/* Learning Path */}
          <div className="mb-4">
            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
              Learning Path
            </h4>

            <div className="space-y-3">
              {curriculum.map((item) => {
                const isCompleted   = completedLessonIds.has(item.id);
                const isInProgress  = inProgressLessonIds.has(item.id);

                // ✅ FIXED LOCK LOGIC:
                // A lesson is locked ONLY when:
                //   - Its Lesson.status field is 'locked'  (Django hasn't unlocked it)
                //   - AND the user has NOT already completed it (UserLessonProgress)
                // A completed lesson can NEVER be locked, regardless of status field.
                const isLocked = item.status === 'locked' && !isCompleted;

                return (
                  <div
                    key={item.id}
                    onClick={() => !isLocked && handleLessonClick(item)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200
                      ${isLocked
                        ? 'border-slate-100 bg-slate-50/30 opacity-50 cursor-not-allowed'
                        : isCompleted
                          ? 'border-emerald-100 bg-emerald-50/50 cursor-pointer hover:bg-emerald-50 hover:shadow-sm'
                          : isInProgress
                            ? 'border-blue-100 bg-blue-50/30 cursor-pointer hover:bg-blue-50 hover:shadow-sm'
                            : 'border-slate-50 bg-slate-50/50 cursor-pointer hover:bg-slate-50 hover:shadow-sm'
                      }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-0.5">
                        Day {item.day}
                      </span>
                      <p className={`text-sm font-bold ${isLocked ? 'text-slate-400' : 'text-[#0F172A]'}`}>
                        {item.title}
                      </p>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                      {/* Time badge */}
                      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                        <Clock size={10} className="text-slate-400" />
                        <span className="text-[9px] font-black text-slate-500 uppercase">
                          {item.time || item.time_estimate || "3 min"}
                        </span>
                      </div>

                      {/* Status icon */}
                      {isLocked ? (
                        // ✅ Lock icon for truly locked lessons
                        <Lock size={18} className="text-slate-300" />
                      ) : isCompleted ? (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      ) : isInProgress ? (
                        <Clock size={20} className="text-blue-500" />
                      ) : (
                        // Unlocked but not started — play icon hint
                        <Play size={16} className="text-slate-300" fill="currentColor" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer — still starts the next incomplete lesson */}
        <div className="p-8 border-t border-slate-50 bg-slate-50/30">
          <button
            onClick={() => onStart(topic)}
            className="w-full flex items-center justify-center gap-3 bg-[#0F172A] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-colors"
          >
            <Play size={14} fill="currentColor" />
            {hasStarted ? "Continue Learning" : "Start Learning"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopicModal;
