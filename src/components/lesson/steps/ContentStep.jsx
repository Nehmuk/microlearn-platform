import React from 'react';
import { Check } from 'lucide-react';

const ContentStep = ({ data }) => {
  // --- DATA NORMALIZATION ---
  // Updated to match your exact Django JSON keys: "contentBlocks" and "keyTakeaways"
  const sections = data?.contentBlocks || [];
  const takeaways = data?.keyTakeaways || [];

  if (sections.length === 0) {
    return (
      <div className="p-12 border-2 border-dashed border-slate-100 rounded-[32px] text-center bg-slate-50/50 max-w-3xl mx-auto">
        <p className="text-slate-400 font-medium italic">
          Curating the perfect lesson for you...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 max-w-3xl mx-auto">
      <div className="space-y-20">
        {sections.map((section, idx) => (
          <section key={idx} className="group">
            <h2 className="text-[#0F172A] text-2xl font-black tracking-tight mb-8 group-hover:text-emerald-600 transition-colors duration-500">
              {section.heading}
            </h2>

            <div className="space-y-6">
              {/* Paragraphs */}
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-slate-600 text-[17px] leading-[1.8] font-medium">
                  {p}
                </p>
              ))}

              {/* Bullets */}
              {section.bullets && (
                <ul className="space-y-5 pt-2">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 text-[16px] font-medium">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="flex-1 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Examples Section */}
              {section.examples && (
                <div className="grid gap-3 pt-4">
                  {section.examples.map((ex, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shrink-0">
                        {ex.label}
                      </span>
                      <span className="text-slate-800 font-bold">{ex.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer text for sections */}
              {section.footer && (
                <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-emerald-50/50 text-emerald-700 rounded-2xl text-[12px] font-black uppercase tracking-wider border border-emerald-100/50">
                  <div className="bg-emerald-500 rounded-full p-1 text-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {section.footer}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* --- KEY TAKEAWAYS --- */}
        {takeaways.length > 0 && (
          <section className="pt-20 border-t border-slate-100">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px flex-1 bg-slate-100" />
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-300">
                Key TakeAways
              </h3>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid gap-4">
              {takeaways.map((point, i) => (
                <div key={i} className="flex gap-5 p-6 bg-[#0F172A] text-white rounded-[24px] items-center">
                  <div className="bg-emerald-500 rounded-full p-1.5 text-[#0F172A] shrink-0">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <p className="text-lg font-bold tracking-tight leading-snug">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ContentStep;