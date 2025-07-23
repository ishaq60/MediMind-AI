# 🧠 MediMind AI

Smart Health. AI Powered. Human Centered.

![Banner](https://i.ibb.co/0Rxkj3b4/Banner.png)

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/medimind-ai?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Gemini API](https://img.shields.io/badge/Gemini%20API-AI%20Powered-blueviolet?style=flat-square)

---

## 📌 Project Overview

**MediMind AI** is a full-stack medical web platform for smart diagnostics, appointment scheduling, patient records, and AI-driven insights using the **Google Gemini API**.

It supports **three user roles**:

- **Admin:** Manage users, doctors, reports, analytics.
- **Doctor:** Handle appointments, view diagnosis reports.
- **Patient/User:** Book appointments, view AI results, access health records.

The platform integrates AI-powered analytics, weather alerts, modern UI, and secure role-based access.

---

## 🚀 Tech Stack

| Tech             | Description                                     |
| ---------------- | ----------------------------------------------- |
| **Next.js**      | React framework for SSR/SSG apps                |
| **React**        | UI Library                                      |
| **MongoDB**      | NoSQL database for storing users, reports, etc. |
| **Tailwind CSS** | Utility-first CSS framework                     |
| **JWT**          | Secure authentication and role-based access     |
| **NextAuth**     | Session and authentication handling             |
| **Gemini API**   | AI-driven medical diagnosis & insights          |
| **shadcn/ui**    | Beautiful, accessible components                |
| **Lucide-react** | Icons                                           |
| **Axios**        | HTTP client for API requests                    |

---

## 🔐 Environment Variables

Create a `.env.local` file at the root of your project:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medimind?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweather_api_key (optional)
| Role          | Description                            | Email              | Password    |
| ------------- | -------------------------------------- | ------------------ | ----------- |
| 🧑‍💼 Patient | Book appointments, view AI reports     | `user@gmail.com`   | `user@123`  |
| 🧑‍⚕️ Doctor  | Manage appointments, patients, reports | `doctor@gmail.com` | `doctor123` |
| 🛡️ Admin     | Manage users, doctors, analytics, data | `admin@gmail.com`  | `admin@123` |
