# Project name: **StayHealthy** — Go Digital healthcare front-end

**StayHealthy** is a fictitious non-profit patient platform for the final capstone: responsive **HTML/CSS/React** UI so people in remote and underserved areas can browse care, book appointments, and sign in safely. This repository contains the **front-end** only, prepared for later connection to a Django (or other) API.

> **Coursera / autograder — repository names (important)**  
> - **Task README URL:** the rubric may require the repo name **`grihf-frontend_capstone_starter_code`**. Submit  
>   `https://github.com/<your-username>/grihf-frontend_capstone_starter_code/blob/main/README.md`  
>   Push the **same** `README.md` to that repo (mirror or rename a fork).  
> - **Tasks for React source files** (e.g. `FindDoctorSearch.jsx`, `App.jsx`, `AppointmentFormIC.jsx`, `GiveReviews.jsx`, `AppointmentForm.jsx`, `DoctorCard.jsx`): the rubric may require **`med_appt`**. Submit URLs like  
>   `https://github.com/<your-username>/med_appt/blob/main/src/...`  
> Push this project’s `main` branch to **`med_appt`** as well if needed.

---

## Project summary

- **Product:** StayHealthy web app (Home, Appointments, Sign Up, Login, profile, reviews).
- **Goals:** Accessibility-minded layout, clear navigation, appointment booking flow with doctor search, JWT-style auth hooks (`/api/auth/register`, `/api/auth/login`).
- **Stack:** React 18, Vite 5, React Router 6, plain CSS.

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

---

## Setup (clone & run locally)

```bash
git clone https://github.com/<your-username>/med_appt.git
cd med_appt
npm install
npm run dev
```

Open the URL Vite prints (default **`http://localhost:5173`**).

### Back-end API (local)

The app expects an API at **`http://localhost:8000`** by default (typical Django dev server). Endpoints used:

| Method | Path | Purpose |
|--------|------|--------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/doctors/search` | Doctor search (appointments) |
| POST | `/api/appointments` | Book appointment |
| POST | `/api/appointments/ic` | Initial contact (name + phone) |
| POST | `/api/appointments/:id/cancel` | Cancel appointment |
| POST | `/api/reviews` | Submit review |
| PUT | `/api/profile` | Update profile |

Override with `.env`:

```bash
cp .env.example .env
# edit VITE_API_BASE_URL if your API host/port differs
```

---

## Production build

```bash
npm run build
npm run preview
```

Terminal output for peers/graders is also saved in the repo file named **`build`** (no extension).

---

## Patient report PDF (submission)

```bash
npm run pdf
```

Writes **`patient_report.pdf`** in the project root (sample patient + prescription text).

---

## Key source files

| File | Role |
|------|------|
| `index.html` | SEO meta tags (title, description, Open Graph) |
| `src/App.jsx` | Routes + **NotificationProvider** (global toast) |
| `src/Navbar.jsx` | Nav links + **Logout** |
| `src/Sign_Up.jsx` | **POST `/api/auth/register`** |
| `src/Login.jsx` | **POST `/api/auth/login`** |
| `src/FindDoctorSearch.jsx` | **Doctor search** inside appointment booking |
| `src/AppointmentForm.jsx` | Name, phone, **date**, **time** |
| `src/AppointmentFormIC.jsx` | **Only name + phone** (initial contact) |
| `src/GiveReviews.jsx` | Review form; **disabled after submit** |
| `src/ProfileCard.jsx` | Profile card + edit form |
| `src/DoctorCard.jsx` | Doctor row + **cancel** + **localStorage** cleanup |

---

## Screenshots folder

Place **31** course screenshots as **`.png`** files under **`screenshots/`** (see `screenshots/SCREENSHOTS_CHECKLIST.txt`). Required names include `navbar_design.png`, `signup_form_design.png`, `login_form_design.png`, and `launch.png`.
