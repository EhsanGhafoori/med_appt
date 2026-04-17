# StayHealthy — front-end (Go Digital initiative)

Fictitious non-profit healthcare platform for the final project: responsive React UI for patients in remote and underserved areas to discover doctors and book appointments.

## Tech stack

- React 18 + Vite 5
- React Router v6
- Plain CSS (accessible, patient-friendly layout)

## Setup

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview   # optional local preview of dist/
```

## Environment

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your real API when the back end is available. Until then, the app calls placeholder endpoints and surfaces errors in the in-app notification banner.

## PDF sample report

```bash
npm run pdf
```

Writes `public/patient_report.pdf` (also copied to repo root for submission if needed).

## Project structure (key files)

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Routes + **NotificationProvider** (application-wide notifications) |
| `src/Navbar.jsx` | Navigation + **logout** |
| `src/Sign_Up.jsx` | **Registration** API (`POST /api/auth/register`) |
| `src/Login.jsx` | **Login** API (`POST /api/auth/login`) |
| `src/FindDoctorSearch.jsx` | **Doctor search** for appointment booking |
| `src/AppointmentForm.jsx` | Appointment fields: **name, phone, date, time** |
| `src/AppointmentFormIC.jsx` | **Name + phone only** (initial contact) |
| `src/GiveReviews.jsx` | Review form; **disabled after successful submit** |
| `src/ProfileCard.jsx` | Profile card + **edit form** |
| `src/DoctorCard.jsx` | Doctor row + **cancel appointment** API |
| `index.html` | **SEO** meta tags |

## Screenshots for submission

Place course screenshots under `screenshots/` (`navbar_design.png`, `signup_form_design.png`, `login_form_design.png`, `launch.png`, and `screenshots-folder.png` for the folder view task).
