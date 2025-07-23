![Next.js](https://img.shields.io/badge/Next.js-13-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.0-38B2AC?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

<p align="center">
  <img src="https://i.ibb.co/0Rxkj3b4/Banner.png" alt="MediMind AI Banner" width="100%" />
</p>

# 🧠 MediMind AI  
**Smart Health. AI Powered. Human Centered.**

---

## 📌 Project Overview

**MediMind AI** is a full-stack medical web platform for:
- 🧠 AI-powered smart diagnostics (Google Gemini API)
- 📅 Appointment booking & management
- 🗂️ Patient record keeping
- ☁️ Weather-based health alerts
- 🔒 Secure role-based dashboards for **Admin**, **Doctor**, **Patient**

---

## 👥 Roles & Demo Passwords

| Role   | Email | Password | Access |
|--------|-------|----------|--------|
| 🛡️ **Admin** | `admin@medimind.ai` | `Admin@123` | Manage users, doctors, reports, AI analytics |
| 👨‍⚕️ **Doctor** | `doctor@medimind.ai` | `Doctor@123` | Manage appointments, patient records, view AI reports |
| 👤 **Patient** | `user@medimind.ai` | `User@123` | Book appointments, view AI diagnosis, use AI chatbot |

> 🔑 *Use these credentials for demo/testing. Replace with your own when live.*

---

## 🚀 Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js** | Full-stack React framework (SSR/SSG) |
| **React** | UI Library |
| **MongoDB** | NoSQL DB for users & records |
| **Tailwind CSS** | Utility-first styling |
| **NextAuth** | Secure session auth |
| **JWT** | Token-based authentication |
| **Gemini API** | AI-driven medical chatbot |
| **shadcn/ui** | Modern UI components |
| **Lucide-react** | Icon set |
| **Axios** | HTTP requests |

---

## 📂 Folder Structure

mediMind-ai/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── dashboard/
│ ├── admin/
│ ├── doctor/
│ └── user/
├── components/
│ ├── Sidebar.tsx
│ ├── Header.tsx
│ ├── WeatherWidget.tsx
│ └── AIChat.tsx
├── lib/
│ ├── auth.ts
│ ├── db.ts
│ └── ai.ts
├── models/
│ ├── userModel.ts
│ ├── appointmentModel.ts
│ └── reportModel.ts
├── utils/
│ └── roles.ts
├── public/
├── styles/
│ └── globals.css
├── .env.local
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🔐 Environment Variables

Create a **`.env.local`** file in your project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medimind?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_nextauth_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
WEATHER_API_KEY=your_openweather_api_key
🛠️ Installation
bash
Copy
Edit
# Clone this repository
git clone https://github.com/yourusername/medimind-ai.git

# Go to the project folder
cd medimind-ai

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
🤖 Gemini AI Chatbot
The AIChat component connects to Google Gemini API:

Ask health questions naturally

Get smart symptom analysis & advice

Receive personalized tips

Example:

User: “I have a fever and sore throat. What should I do?”
Gemini AI: Suggests possible causes, precautions & next steps.

🌦️ Smart Features
✅ Weather Alerts: Warn patients about weather-related health risks
✅ Role-Based Dashboards: Admin, Doctor, Patient
✅ AI Analytics: Track reports & trends
✅ Secure Authentication: NextAuth + JWT

🖼️ Screenshots
Description	Preview
Banner	
Admin Dashboard	
Doctor Dashboard	
User Dashboard	
Diagnosis Report	
AI Chatbox	

🚀 Deployment
1️⃣ Push code to GitHub

bash
Copy
Edit
git add .
git commit -m "Initial commit"
git push origin main
2️⃣ Deploy on Vercel

Go to vercel.com/import

Link your GitHub repo

Add Environment Variables

Click Deploy

🤝 Contributing
bash
Copy
Edit
# Contribute steps:
1️⃣ Fork this repo  
2️⃣ Create a new branch: git checkout -b feature/YourFeature  
3️⃣ Make your changes  
4️⃣ Commit & push: git commit -m "Add feature"  
5️⃣ Open Pull Request
📜 License
MIT License © 2025 MediMind AI

🔗 Useful Links
Next.js Docs

Tailwind CSS

shadcn/ui

Gemini API

MongoDB Atlas

