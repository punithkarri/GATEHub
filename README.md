# GATEHub

> **GATE Preparation & Learning Platform**

GATEHub is an all-in-one, modern learning platform designed for GATE aspirants. It provides comprehensive syllabus tracking, official GATE 2025 CS-1 & CS-2 previous year questions with verified solutions, an interactive practice mode, a 3-hour Computer Based Test (CBT) mock simulator, a Virtual GATE Scientific Calculator, curated study resources, preparation roadmaps, a daily planner, and a student progress dashboard.

---

## 🚀 Live Demo

**[https://punithkarri.github.io/GATEHub/](https://punithkarri.github.io/GATEHub/)**

---

## ✨ Features

* 🎓 **Official GATE Exam Information**: Complete guide to eligibility, exam structure, marking scheme, score validity, and career opportunities (M.Tech, PSUs, PMRF, Foreign Universities).
* 📝 **Interactive CSE Syllabus Explorer**: Detailed coverage of all 11 GATE CS subjects with topic-level status tracking (*Not Started*, *Learning*, *Practicing*, *Strong*, *Completed*).
* 🔍 **Verified PYQ Explorer**: Official GATE 2025 CS-1 (Forenoon) and CS-2 (Afternoon) master paper questions with step-by-step math derivations, code traces, concept tested descriptions, and official key links.
* 🧮 **GATE Virtual Scientific Calculator**: Authentic scientific calculator widget supporting trigonometric, logarithmic, square root, factorial, and exponential operations.
* ⚡ **Interactive Practice Quiz Mode**: Configurable subject-wise practice sessions with instant answer evaluation.
* ⏱️ **3-Hour CBT Mock Test Simulator**: Real exam console with 180-minute countdown timer, official question status palette (*Answered*, *Not Answered*, *Marked for Review*), and complete score analytics.
* 🧭 **Where Should I Study?**: Decision recommendation matrix based on student starting level, timeline, and budget.
* 📚 **Curated Resource Directory**: Standard textbooks (CLRS, Galvin, Kurose & Ross), NPTEL video courses, Gate Overflow portal, and GeeksforGeeks notes.
* 🗺️ **Preparation Roadmaps**: 6-Month Master Plan, 3-Month Fast Track, and Last 7-Day Checklist with interactive milestone checkboxes.
* 📅 **Daily Study Planner**: Task manager and study logger with streak tracking.
* ⚡ **Revision Center**: High-yield formula sheets and flashcards.
* 📊 **Student Progress Dashboard**: Live preparation velocity, topic completion gauges, and subject readiness indicators.
* 🔎 **Global Search (Cmd + K)**: Instant search across subjects, topics, PYQs, resources, and short notes.

---

## 🛠️ Tech Stack

* **Frontend**: React 19, TypeScript
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4, Lucide React Icons
* **Deployment**: GitHub Pages + GitHub Actions

---

## 💻 Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/punithkarri/GATEHub.git
   cd GATEHub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 📦 Production Build

To test the production compilation:
```bash
npm run build
```

To preview the production build locally:
```bash
npx vite preview --port 4173 --host
```

---

## 🚢 Deployment

Automated deployment is configured using **GitHub Actions**. On every push to the `main` branch, `.github/workflows/deploy.yml` automatically builds the project using Vite and deploys the output to **GitHub Pages**.
