# 🧠 MediMind AI

Smart Health. AI Powered. Human Centered.

![Banner](https://i.ibb.co/0Rxkj3b4/Banner.png)

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/medimind-ai?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/medimind-ai?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Gemini API](https://img.shields.io/badge/Gemini%20API-AI%20Powered-blueviolet?style=flat-square)

---

## 📌 Project Overview

**MediMind AI** is a full-stack medical web platform designed for smart diagnostics, appointment scheduling, patient records, and AI-driven insights using Google Gemini API. It supports three distinct user roles:

* **Admin** – manage users, doctors, and reports
* **Doctor** – manage appointments, view diagnosis reports
* **Patient/User** – book appointments, view AI-generated results, and access health records

The platform integrates AI-powered analytics, weather alerts, modern UI components, and secure role-based access.

---

## 🚀 Tech Stack

| Tech             | Description                                     |
| ---------------- | ----------------------------------------------- |
| **Next.js**      | React framework for building SSR/SSG apps       |
| **React**        | UI Library                                      |
| **MongoDB**      | NoSQL database for storing users, reports, etc. |
| **Tailwind CSS** | Utility-first CSS framework                     |
| **JWT**          | For secure authentication and role-based access |
| **NextAuth**     | Session and authentication handling             |
| **Gemini API**   | AI-driven medical diagnosis & insights          |
| **shadcn/ui**    | Beautiful, accessible components                |
| **Lucide-react** | Icons                                           |
| **Axios**        | HTTP client for API requests                    |

---

## 🔐 Environment Variables

Create a `.env.local` file at the root of the project:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medimind?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweather_api_key (optional)
🛠️ Installation
bash
Copy
Edit
git clone https://github.com/yourusername/medimind-ai.git
cd medimind-ai
npm install
npm run dev
Visit: http://localhost:3000

📂 Folder Structure (Simplified)
bash
Copy
Edit
mediMind-ai/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
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
│   └── ai.ts
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
👥 Roles and Access
Role	Description	Default Password
Admin	Manage users, doctors, data, analytics	admin@123
Doctor	Handle appointments, review reports	doctor@123
Patient	Book appointments, view AI reports	user@123

### 👥 Roles & Credentials

| Role             | Description                              | **Email**               | **Password**   |
|------------------|------------------------------------------|--------------------------|----------------|
| 🧑‍💼 User (Patient) | Book appointments, view AI reports         | `user@gamil.com`       | `user@123@`     |
| 🧑‍⚕️ Doctor         | Manage appointments, patients, reports     | `doctor@gmail.com`     | `doctor123`   |
| 🛡️ Admin           | Manage users, doctors, analytics, data     | `admin@gmail.com`      | `admin@123`    |

> ⚠️ **Note:** These are sample/demo credentials. Do not use them in production environments without modification.


👩‍⚕️ User Features
👨‍💼 Patient
Book and manage appointments

View AI-based diagnosis reports

Get weather alerts and health tips

🧑‍⚕️ Doctor
View appointment schedule

Review patient records

Collaborate with AI for diagnosis

🛡️ Admin
Manage all users and roles

Oversee AI analytics and platform usage

View and manage all records

✨ Gemini AI Integration
Powered by Google Gemini API

Symptom-based diagnosis

Smart health suggestions

Personalized treatment recommendations

🌦️ Smart Features
Weather Alerts: Alerts for weather-related health risks

AI Chatbot: Chat with an AI health assistant

Health Analytics: View trends and reports

🖼️ UI Screenshots
📊 Admin Dashboard
![Admin Dashboard](https://i.ibb.co/Ng3H28Hb/admin-dashboard.png)


🧠 AI Chatbox
![AI Chatbox](https://i.ibb.co/F4R5gfd8/ai-chatbox.png)

🏥 Diagnosis Page
![Diagnosis](https://i.ibb.co/JjHwSpYb/diagones.png)
👨‍⚕️ Doctor Dashboard
![Doctor Dashboard](https://i.ibb.co/zVtRWq1n/doctor-dashboard.png)

👤 User Dashboard

![User Dashboard](https://i.ibb.co/gMYGTRXs/user-dashboard.png)

🧩 UI & Components
Reusable forms, modals, dashboards (shadcn/ui)

Built with accessibility-first design

Tailwind CSS theming and responsive layouts

🚀 Deployment
Deploy to Vercel
Push your code to GitHub

Go to vercel.com/import

Connect your GitHub repository

Add your environment variables

Click Deploy

🧠 Contributing
Fork this repository

Create a new branch: git checkout -b feature-name

Make changes and commit: git commit -m "Add new feature"

Push to your fork: git push origin feature-name

Open a Pull Request on GitHub

📜 License
MIT License © 2025 MediMind AI
