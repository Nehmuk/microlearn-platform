# 🎓 MicroLearn — Micro-Learning Platform

> A modern full-stack micro-learning web application that delivers short, focused lessons with quizzes, progress tracking, and personalized dashboards.

<br>

## 🌐 Project Overview

MicroLearn is a complete full-stack web application built during a 15-week internship at **VrishankSoft OPC Pvt Ltd**. It allows users to learn through structured short lessons, complete quizzes, track their progress, save content, and manage their profile — all through a clean and responsive interface.

The platform was built using **React.js** and **Tailwind CSS** on the frontend, and **Django REST Framework** with **SQLite** on the backend, following a clean client-server architecture connected through REST APIs.

<br>

## ✨ Features

- 🔐 **User Authentication** — Secure token-based login and signup
- 📊 **Personalized Dashboard** — Real-time stats, streak tracking, and daily learning card
- 🔍 **Explore Topics** — Browse topics with detailed lesson modal and curriculum view
- 📖 **Lesson Flow** — Structured lessons with Intro, Content, and Key Takeaways
- 🧠 **Quiz System** — Multiple choice and True/False questions with auto scoring
- 📈 **Progress Analytics** — Circular progress bar, per-topic progress, and recent activity
- 🔖 **Saved Lessons** — Bookmark lessons with search and category filter
- 🔔 **Notifications** — Real-time notification system with polling and mark-as-read
- 👤 **Profile Management** — View and edit profile with backend persistence
- 📱 **Fully Responsive UI** — Works across mobile, tablet, and desktop

<br>

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | Component-based UI development |
| Tailwind CSS | Responsive styling and layout |
| Axios | API communication with backend |
| React Hooks | State and lifecycle management |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| Django | Web framework |
| Django REST Framework | REST API development |
| Token Authentication | Secure user session management |

### Database
| Technology | Purpose |
|---|---|
| SQLite | Development database |

### Tools
| Tool | Purpose |
|---|---|
| VS Code | Development environment |
| Git and GitHub | Version control |
| Django Admin | Content and lesson management |

<br>

## 📁 Project Structure

```
microlearn-platform/
│
├── api/                        ← Django App
│   ├── models.py               ← Database models
│   ├── serializers.py          ← JSON conversion
│   ├── views.py                ← API logic
│   ├── admin.py                ← Admin panel config
│   └── migrations/             ← Database migrations
│
├── core/                       ← Django Project Config
│   ├── settings.py             ← Project settings
│   └── urls.py                 ← URL routing
│
├── src/                        ← React Application
│   ├── components/
│   │   ├── common/             ← AuthModal, MainHeader, NotificationDropdown
│   │   ├── dashboard/          ← Dashboard, Sidebar, StatsCards, DailyLearning
│   │   ├── explore/            ← ExplorePage, TopicCard, TopicGrid, TopicModal
│   │   ├── lesson/             ← LessonController, Quiz, Steps, UI
│   │   ├── analytics/          ← ProgressStats, ProgressHero, RecentActivity
│   │   ├── saved/              ← SavedTopics
│   │   ├── profile/            ← ProfilePage, EditForm, ViewFields
│   │   ├── contact/            ← ContactForm, ContactInfo
│   │   ├── review/             ← ReviewForm, ReviewList, ReviewCard
│   │   └── pages/              ← About, Contact, Review, Privacy, Terms
│   ├── App.jsx                 ← Root component and routing
│   └── main.jsx                ← React entry point
│
├── manage.py                   ← Django management script
├── requirements.txt            ← Python dependencies
├── package.json                ← Node dependencies
└── README.md
```

<br>

## ⚙️ How to Run Locally

### Prerequisites
- Python 3.x installed
- Node.js installed
- Git installed

### Backend Setup
```bash
# 1. Clone the repository
git clone https://github.com/Nehmuk/microlearn-platform.git

# 2. Go to project folder
cd microlearn-platform

# 3. Create virtual environment
python -m venv venv

# 4. Activate virtual environment
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac or Linux

# 5. Install Python dependencies
pip install -r requirements.txt

# 6. Run database migrations
python manage.py migrate

# 7. Create admin user (optional)
python manage.py createsuperuser

# 8. Start Django server
python manage.py runserver
```

### Frontend Setup
```bash
# 1. Install Node dependencies
npm install

# 2. Start React development server
npm run dev
```

### Access the Application
```
Frontend  →  http://localhost:5173
Backend   →  http://localhost:8000
Admin     →  http://localhost:8000/admin
```

<br>

## 🗄️ Database Models

| Model | Purpose |
|---|---|
| **Topic** | Stores learning topics, categories, icons, and descriptions |
| **Lesson** | Stores lesson content as JSON including quiz questions |
| **UserLessonProgress** | Tracks per-lesson completion for each user |
| **UserProgress** | Stores streak, total points, and lessons completed |
| **UserProfile** | Extended profile — bio, location, occupation, gender, age |
| **SavedLesson** | Tracks lessons bookmarked by each user |
| **Notification** | Stores notifications generated for each user |
| **Review** | Stores star ratings and comments from users |

<br>

## 🔌 API Endpoints

| Method | Endpoint | Auth Required | Purpose |
|---|---|---|---|
| POST | `/api/login/` | ❌ | User login |
| POST | `/api/signup/` | ❌ | User registration |
| GET | `/api/topics/` | ❌ | Fetch all topics with curriculum |
| GET | `/api/user-stats/` | ✅ | Fetch streak, points, lessons done |
| POST | `/api/complete-lesson/` | ✅ | Mark lesson complete and update stats |
| GET | `/api/lesson-progress/` | ✅ | Fetch per-lesson completion records |
| GET | `/api/saved-lessons/` | ✅ | Fetch user saved lessons |
| POST | `/api/lessons/toggle-save/` | ✅ | Save or unsave a lesson |
| GET | `/api/notifications/` | ✅ | Fetch user notifications |
| POST | `/api/notifications/mark-read/` | ✅ | Mark one notification as read |
| POST | `/api/notifications/mark-all-read/` | ✅ | Mark all notifications as read |
| GET | `/api/profile/` | ✅ | Fetch user profile |
| PUT | `/api/profile/update/` | ✅ | Update user profile |
| GET | `/api/reviews/` | ✅ | Fetch all reviews |
| POST | `/api/reviews/` | ✅ | Post a new review |
| POST | `/api/contact/` | ❌ | Submit contact message |

<br>

## 🔐 Authentication Flow

1. User signs up → Django creates user → Token generated → Stored in localStorage
2. User logs in → Django verifies credentials → Token returned → Stored in localStorage
3. Every API request → Token sent in Authorization header → Django validates → Response returned
4. User logs out → Token removed from localStorage → Session cleared

<br>

## 📊 Key Technical Concepts Used

- **Component-based Architecture** — React components for every UI section
- **React Hooks** — useState, useEffect, useCallback for state and lifecycle
- **Token Authentication** — Secure session management without cookies
- **REST API Design** — Clean endpoints following REST conventions
- **Custom Events** — statsUpdated, progressUpdated, savedUpdated for real-time sync
- **Optimistic UI** — Instant UI updates before backend confirmation
- **Promise.all** — Parallel API calls for faster page loading
- **Django Serializers** — Clean JSON conversion with validation
- **OneToOneField** — UserProfile and UserProgress linked one-to-one with User
- **JSONField** — Lesson content and quiz data stored as flexible JSON

<br>

## 🚀 Future Scope

- AI-based personalized lesson recommendations
- Video lessons and interactive learning materials
- Certificates and achievement badges
- Email notifications and reminder systems
- Mobile application for Android and iOS
- Deployment on Vercel and Railway with PostgreSQL

<br>

## 👩‍💻 Developer

**Neha Mukhopadhyay**
B.E. Computer Science and Engineering
GSSSIETW, Mysuru — 4GW22CS073

**Internship at VrishankSoft OPC Pvt Ltd**
External Guide — Mr. Santosh Khot, Managing Director
Internal Guide — Mrs. Harshitha B, Assistant Professor

Duration — February 2026 to May 2026 (15 Weeks)

<br>

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
