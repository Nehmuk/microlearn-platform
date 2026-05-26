export const techLessons = {
  "tech-day-1": {
    id: "tech-day-1",
    category: "Technology",
    day: 1,
    totalDays: 4,
    title: "Introduction to Artificial Intelligence",
    readTime: "3 MIN",

    insight: {
      label: "Why this matters",
      content:
        "Artificial Intelligence isn’t just a futuristic concept—it’s already shaping how you search, shop, and interact online every day."
    },

    contentBlocks: [
      {
        heading: "What is Artificial Intelligence?",
        paragraphs: [
          "Artificial Intelligence (AI) refers to machines or software that can perform tasks that typically require human intelligence."
        ],
        bullets: [
          "Understanding language",
          "Recognizing images",
          "Making decisions"
        ],
        examples: [
          { label: "Voice Assistants:", text: "Siri or Alexa" },
          { label: "Recommendations:", text: "Netflix or YouTube" }
        ]
      },
      {
        heading: "How does AI work?",
        paragraphs: [
          "AI systems learn from data rather than following fixed instructions.",
          "Instead of being programmed for every situation, they:"
        ],
        bullets: [
          "Analyze patterns",
          "Learn from examples",
          "Improve over time"
        ],
        footer: "This approach is known as machine learning."
      },
      {
        heading: "Where is AI used today?",
        paragraphs: [
          "AI is already part of your daily life, often without you noticing."
        ],
        bullets: [
          "Search engines (ranking results)",
          "Social media (content suggestions)",
          "Online shopping (product recommendations)",
          "Healthcare (disease prediction)"
        ],
        footer:
          "Most of the time, you’re using AI without even realizing it."
      }
    ],

    keyTakeaways: [
      "AI enables machines to mimic human intelligence",
      "It learns from data instead of fixed rules",
      "AI is already integrated into everyday applications"
    ],

    quiz: [
      {
        question: "What does AI stand for?",
        type: "mcq",
        options: [
          "Automated Interface",
          "Artificial Intelligence",
          "Advanced Internet",
          "Applied Integration"
        ],
        correct: 1
      },
      {
        question: "How do AI systems improve over time?",
        type: "mcq",
        options: [
          "By manual coding",
          "By learning from data",
          "By restarting",
          "By hardware upgrades"
        ],
        correct: 1
      }
    ]
  },

  "tech-day-2": {
    id: "tech-day-2",
    category: "Technology",
    day: 2,
    totalDays: 4,
    title: "How the Internet Works",
    readTime: "3 MIN",

    insight: {
      label: "Why this matters",
      content:
        "Every website, app, and message you use depends on the internet—but understanding how it works helps you use it smarter and safer."
    },

    contentBlocks: [
      {
        heading: "What is the Internet?",
        paragraphs: [
          "The internet is a global network that connects millions of computers and devices.",
          "It allows them to communicate and share information instantly.",
          "Instead of one central system, it’s made up of many smaller networks connected together."
        ]
      },
      {
        heading: "How does it work?",
        paragraphs: [
          "When you visit a website, your device sends a request to a server.",
          "The server processes the request and sends back the data.",
          "This data travels in small packets through cables, routers, and servers.",
          "All of this happens in seconds, making the experience feel instant."
        ]
      },
      {
        heading: "Key components",
        list: [
          { label: "Servers", text: "store websites and data" },
          { label: "Clients", text: "your device (phone, laptop)" },
          { label: "Routers", text: "direct data to the right place" }
        ]
      }
    ],

    keyTakeaways: [
      "The internet is a network of connected systems",
      "Data travels as packets between devices",
      "Servers and routers make communication possible"
    ],

    quiz: [
      {
        question: "The internet is controlled by one central computer.",
        type: "truefalse",
        options: ["True", "False"],
        correct: 1
      },
      {
        question: "What happens when you open a website?",
        type: "mcq",
        options: [
          "Your device stores the website permanently",
          "Your device sends a request to a server",
          "The internet shuts down temporarily",
          "Nothing happens"
        ],
        correct: 1
      }
    ]
  },

  "tech-day-3": {
    id: "tech-day-3",
    category: "Technology",
    day: 3,
    totalDays: 4,
    title: "Basics of Programming Logic",
    readTime: "3 MIN",

    insight: {
      label: "Why this matters",
      content:
        "Every app or website you use runs on logic—understanding it helps you think like a developer, even without coding."
    },

    contentBlocks: [
      {
        heading: "What is Programming Logic?",
        paragraphs: [
          "Programming logic is the step-by-step thinking used to solve problems using code.",
          "It tells a computer what to do and in what order.",
          "Instead of writing random instructions, developers follow clear logical patterns."
        ]
      },
      {
        heading: "Core concepts",
        list: [
          { label: "Conditions", text: "making decisions (if something happens, do this)" },
          { label: "Loops", text: "repeating actions until a condition is met" },
          { label: "Variables", text: "storing and using data" }
        ],
        footer:
          "These building blocks are used in almost every program."
      },
      {
        heading: "How it works in real life",
        paragraphs: ["Think of ordering food online:"],
        list: [
          { label: "If payment is successful", text: "order confirmed" },
          { label: "If not", text: "show error" }
        ],
        footer: "This is programming logic in action."
      }
    ],

    keyTakeaways: [
      "Programming logic is about structured problem-solving",
      "It uses conditions, loops, and variables",
      "It powers how software makes decisions"
    ],

    quiz: [
      {
        question: "Programming logic is mainly about:",
        type: "mcq",
        options: [
          "Designing graphics",
          "Writing random code",
          "Solving problems step by step",
          "Installing software"
        ],
        correct: 2
      },
      {
        question: "A loop is used to:",
        type: "truefalse",
        options: [
          "Stop a program",
          "Repeat an action",
          "Delete data",
          "Connect to the internet"
        ],
        correct: 1
      }
    ]
  },

  "tech-day-4": {
    id: "tech-day-4",
    category: "Technology",
    day: 4,
    totalDays: 4,
    title: "Cybersecurity Fundamentals",
    readTime: "3 MIN",

    insight: {
      label: "Why this matters",
      content:
        "As more of your life moves online, protecting your data and privacy is more important than ever."
    },

    contentBlocks: [
      {
        heading: "What is Cybersecurity?",
        paragraphs: [
          "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks.",
          "It helps prevent unauthorized access, data theft, and damage.",
          "It applies to everything from personal devices to large organizations."
        ]
      },
      {
        heading: "Common threats",
        list: [
          { label: "Phishing", text: "fake messages to steal information" },
          { label: "Malware", text: "harmful software that damages systems" },
          { label: "Weak passwords", text: "easy entry for attackers" }
        ]
      },
      {
        heading: "How to stay safe",
        bullets: [
          "Use strong, unique passwords",
          "Avoid clicking suspicious links",
          "Keep software updated"
        ]
      }
    ],

    keyTakeaways: [
      "Cybersecurity protects your digital life",
      "Threats are common but preventable",
      "Safe habits reduce most risks"
    ],

    quiz: [
      {
        question: "Cybersecurity is only important for large companies.",
        type: "truefalse",
        options: ["True", "False"],
        correct: 1
      },
      {
        question: "Which of the following is a common cyber threat?",
        type: "mcq",
        options: [
          "Strong passwords",
          "Phishing emails",
          "Software updates",
          "Secure websites"
        ],
        correct: 1
      }
    ]
  }
};