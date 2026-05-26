// 📝 No Lucide imports needed here anymore! 
// The icons are now strings that match the 'iconMap' in your components.

export const topics = [
  {
    id: "tech-01",
    category: "Technology",
    title: "Technology",
    icon: "laptop", // Changed from Laptop component to string "laptop"
    description: "Technology is the engine behind how we live, work, and connect in the digital age.",
    longDescription: "Technology powers everything from apps to global systems. It includes AI, software, devices, and the internet. Understanding technology allows you to navigate the modern world with confidence and efficiency.",
    subtopics: ["AI Basics", "Internet", "Programming", "Cybersecurity"], 
    curriculum: [
      { id: "tech-day-1", day: 1, title: "Introduction to Artificial Intelligence", status: "in-progress", time: "3 min" },
      { id: "tech-day-2", day: 2, title: "How the Internet Works", status: "locked", time: "2 min" },
      { id: "tech-day-3", day: 3, title: "Basics of Programming Language", status: "locked", time: "3 min" },
      { id: "tech-day-4", day: 4, title: "Cybersecurity Fundamentals", status: "locked", time: "4 min" }
    ],
    isStarted: true,
    dateAdded: 20240101
  },
  {
    id: "psych-02",
    category: "Psychology",
    title: "Psychology",
    icon: "brain", // String "brain"
    description: "Psychology helps you understand how people think, behave, and make decisions.",
    longDescription: "Psychology explains why people act the way they do. It covers thoughts, emotions, habits, and social interactions. By studying psychology, you gain insights into your own mind and better empathy for others.",
    subtopics: ["Cognitive Science", "Social Behavior", "Mental Wellness", "Habit Loops"],
    curriculum: [
      { id: "psych-day-1", day: 1, title: "How Habits are formed", status: "in-progress", time: "3 min" },
      { id: "psych-day-2", day: 2, title: "Understanding Human Behaviours", status: "locked", time: "6 min" },
      { id: "psych-day-3", day: 3, title: "Decision Making and Biases", status: "locked", time: "4 min" },
      { id: "psych-day-4", day: 4, title: "Basics of Motivation", status: "locked", time: "4 min" }
    ],
    isStarted: false,
    dateAdded: 20240102
  },
  {
    id: "fin-03",
    category: "Finance",
    title: "Finance",
    icon: "landmark", // String "landmark"
    description: "Finance is about making smarter decisions with money in a fast-changing world.",
    longDescription: "Finance helps you manage, grow, and protect your money. It covers saving, investing, and the global economy. Mastering financial basics is the first step toward long-term independence and security.",
    subtopics: ["Investment Strategy", "Digital Money", "Economic Cycles", "Stock Markets"],
    curriculum: [
      { id: "fin-day-1", day: 1, title: "Budgeting and Money Management", status: "in-progress", time: "2 min" },
      { id: "fin-day-2", day: 2, title: "Saving vs Investment", status: "locked", time: "5 min" },
      { id: "fin-day-3", day: 3, title: "Understanding Digital Payments", status: "locked", time: "7 min" },
      { id: "fin-day-4", day: 4, title: "Basics of Stock Markets", status: "locked", time: "7 min" }
    ],
    isStarted: false,
    dateAdded: 20240103
  },
  {
    id: "des-04",
    category: "Design",
    title: "Design",
    icon: "layout", // String "layout" (matches Paintbrush or Layout in iconMap)
    description: "Design is how ideas turn into intuitive and engaging user experiences.",
    longDescription: "Design is not just about looks—it’s about how things work. It focuses on UI/UX, accessibility, and communication. Good design makes complex technology feel simple and natural to use.",
    subtopics: ["UI/UX Principles", "Visual Identity", "Design Foundations", "Design Sprints"],
    curriculum: [
      { id: "design-day-1", day: 1, title: "Principles of Good Design", status: "in-progress", time: "3 min" },
      { id: "design-day-2", day: 2, title: "Introduction to UI/UX", status: "locked", time: "4 min" },
      { id: "design-day-3", day: 3, title: "Color and typography", status: "locked", time: "6 min" },
      { id: "design-day-4", day: 4, title: "Design Thinking Basics", status: "locked", time: "7 min" }
    ],
    isStarted: true,
    dateAdded: 20240104
  }
];