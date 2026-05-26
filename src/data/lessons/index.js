import { techLessons } from './tech';
import { designLessons } from './design';
import { financeLessons } from './finance';
import { psychLessons } from './psych';

// 🔥 MASTER LESSON MAP (Single source of truth)
export const allLessons = {
  ...techLessons,
  ...designLessons,
  ...financeLessons,
  ...psychLessons
};

// 🔎 SAFE GETTER (prevents crashes)
export const getLessonById = (id) => {
  if (!id) return null;
  return allLessons[id] || null;
};