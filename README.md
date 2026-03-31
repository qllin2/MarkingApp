# 📋 MarkingApp

A production-deployed full-stack web application for managing university marking workflows. Built to handle the coordination overhead between markers, subject coordinators, and students — rubric configuration, grade tracking, analytics, and automated notifications all in one place.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat)

---

## Features

- **Rubric builder** — configurable marking criteria per assignment
- **Grade entry and tracking** — real-time data entry with validation
- **Analytics dashboard** — submission statistics and marking progress visualisation
- **Automated email notifications** — Nodemailer integration for marker and student alerts
- **Role-based access** — coordinator, marker, and student views
- **Production deployment** — hosted on Render with AWS-backed infrastructure

---

## Screenshots

> EB to fix

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS + shadcn/ui |
| Backend | Node.js + Express REST API |
| Database | PostgreSQL |
| Auth | JWT-based authentication |
| Email | Nodemailer |
| Deployment | Render + AWS |

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL running locally

### Install & run

```bash
git clone https://github.com/Ricky042/MarkingApp.git
cd MarkingApp

# Backend
cd backend
npm install
node server.js

# Frontend (open a new terminal)
cd frontend-vite
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## Architecture

- **REST API** — Express endpoints for marks, rubrics, analytics, and notifications
- **PostgreSQL schema** — normalised tables for subjects, assessments, students, markers, and grades
- **React SPA** — React Router for navigation, Axios for API calls
- **Environment config** — separate local and production environment variables for safe deployment
