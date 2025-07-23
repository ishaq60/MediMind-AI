Smart Health. AI Powered. Human Centered.

📌 Project Overview
MediMind AI is a full-stack medical web platform designed for smart diagnostics, appointment scheduling, patient records, and AI-driven insights using Google Gemini API. It supports three distinct user roles:

Admin – manage users, doctors, and reports
Doctor – manage appointments, view diagnosis reports
Patient/User – book appointments, view AI-generated results, and access health records
The platform integrates AI-powered analytics, weather alerts, modern UI components, and secure role-based access.

🚀 Tech Stack
Tech	Description
Next.js	React framework for building SSR/SSG apps
React	UI Library
MongoDB	NoSQL database for storing users, reports, etc.
Tailwind CSS	Utility-first CSS framework
JWT	For secure authentication and role-based access
NextAuth	Session and authentication handling
Gemini API	AI-driven medical diagnosis & insights
shadcn/ui	Beautiful, accessible components
Lucide-react	Icons
Axios	HTTP client for API requests
📂 Folder Structure (Simplified)
mediMind-ai/
├── app/
│   ├── layout.tsx (global layout)
│   ├── page.tsx (homepage)
│   ├── dashboard/
│   │   ├── admin/
│   │   ├── doctor/
│   │   └── user/
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── WeatherWidget.tsx
│   └── AIChat.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── ai.ts (Gemini logic)
├── models/
│   ├── userModel.ts
│   ├── appointmentModel.ts
│   └── reportModel.ts
├── public/
├── styles/
│   └── globals.css
├── utils/
│   └── roles.ts
├── .env.local
├── package.json
└── README.md
🔐 Environment Variables
Create a .env.local file at the root of the project:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medimind?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweather_api_key (optional)
🛠️ Installation
git clone https://github.com/yourusername/medimind-ai.git
cd medimind-ai
npm install
npm run dev
Visit: http://localhost:3000

👥 Roles and Features
👩‍⚕️ User (Patient)
Book and manage appointments
View AI-based diagnosis reports
Get weather alerts and health tips
🧑‍⚕️ Doctor
View appointment schedule
Review patient records
Collaborate with AI for diagnosis
🛡️ Admin
Manage all users and roles
Control data and access
Oversee AI analytics and trends
✨ Gemini AI Integration
Uses Google Gemini API for:

Symptom-based diagnosis
Smart health tips and precautions
Personalized recommendation engine
🌦️ Smart Features
Weather Alerts: Warn users of severe weather with health implications
AI Chatbot: Conversational medical assistant
Analytics Dashboard: Track health data & trends
🖼️ UI Components (shadcn/ui)
Reusable form, cards, tabs, dialog modals, and dashboards
Modern UX with Tailwind + shadcn/ui
🚀 Deployment
Deploy to Vercel
Push to GitHub
Visit vercel.com/import
Link GitHub repo
Set environment variables
Click Deploy
📸 Screenshots / Banner
A banner or logo can be generated upon request (e.g., gradient with heart/brain icon)

🧠 Contributing
Fork this repo
Create a feature branch
Push changes and open a PR
📜 License
MIT License © 2025 MediMind A
