```
████████╗██╗   ██╗     ██╗
   ██╔══╝╚██╗ ██╔╝     ██║
   ██║    ╚████╔╝      ██║
   ██║     ╚██╔╝  ██   ██║
   ██║      ██║   ╚█████╔╝
   ╚═╝      ╚═╝    ╚════╝
```

**Track Your Journey — Job Application Tracker**

[![React 19](https://img.shields.io/badge/React-19-4f8ef7?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055ff?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-local-2a7a3b?style=flat-square&logo=sqlite)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed?style=flat-square&logo=docker)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

Track Your Journey is a modern offline-first job application tracker focused on privacy, local storage, productivity, and clean retro-inspired UI.

---

## 🚀 Features

- **Landing page** — Full marketing landing with animated hero mockup, features grid, how-it-works steps, FAQ accordion, and CTA section
- **Dark pixel UI** — Retro game-inspired design with JetBrains Mono and Space Mono fonts, sharp 0px border-radius throughout
- **Warm parchment light mode** — Toggle between dark and light themes. Light mode uses a warm, muted, eye-friendly palette (never pure white). Persisted to localStorage
- **Canvas animated background** — Subtle floating particle system rendered on HTML5 Canvas with requestAnimationFrame. Particles drift slowly and wrap around edges. Configurable intensity (normal/high) and reads the CSS `--accent` color dynamically
- **Mobile-responsive layout** — Hamburger sidebar overlay on mobile, responsive grids, compact cards, adaptive typography. Fully usable on any screen size
- **Error boundaries** — React Error Boundary wrapping the app with styled fallback UI and restart button
- **404 Not Found page** — Dedicated page with Space Mono heading, descriptive text, and return-to-dashboard button
- **Full CRUD job tracking** — Log applications, update status, add notes and cover letters
- **CV manager** — Upload PDF/DOCX files (max 10 MB), mark as general, download with one click
- **Cover letter tracking** — Per-application toggle with text area for storing cover letter content
- **Status pipeline** — Track through Saved → Applied → Interview → Offer → Rejected
- **Dashboard analytics** — Six animated stat cards with icons, gradient backgrounds, hover effects + recent applications list
- **Search & filter** — Full-text search by company/role/location, filter by status, sorted newest-first
- **Cancel on forms** — Cancel button in JobForm discards changes and navigates back
- **Import/Export JSON** — Full backup and restore with replace or merge mode. CV file data is base64-encoded
- **Toast notifications** — Snappy, auto-dismissing (3s) feedback on all actions
- **Animated transitions** — Framer Motion page transitions, staggered list animations, toast enter/exit
- **Auth system placeholder** — Login and Register route stubs ready for backend integration
- **Pixel-style favicon** — Custom SVG favicon matching the dark UI aesthetic
- **SEO optimized** — Full Open Graph, Twitter Card, JSON-LD structured data, and canonical URL
- **Keyboard-friendly forms** — Validation with red border errors on required fields
- **Docker support** — One-command deploy via Docker Compose with Nginx

---

## 📦 Tech Stack

| Tool             | Purpose                                  |
| ---------------- | ---------------------------------------- |
| React 19         | UI framework                             |
| TypeScript 6     | Type safety                              |
| Vite 8           | Build tool and dev server                |
| React Router v6  | Client-side routing                      |
| idb              | IndexedDB wrapper for persistent storage |
| Framer Motion 11 | Declarative animations                   |
| HTML5 Canvas     | Animated background particle system      |
| Plain CSS        | Styling (no Tailwind, no UI libraries)   |
| Docker / Nginx   | Production deployment                    |

---

## 📁 Project Structure

```
TrackYourJob/
├── client/
│   ├── public/
│   │   └── favicon.svg            # Pixel-style SVG favicon (dark bg, accent TYJ grid)
│   ├── src/
│   │   ├── api/
│   │   │   ├── jobs.ts            # API stubs — wraps DB calls, swap to axios later
│   │   │   └── cvs.ts             # API stubs for CV operations
│   │   ├── components/
│   │   │   ├── AnimatedBackground.tsx  # Canvas particle system (35–45 dots, requestAnimationFrame)
│   │   │   ├── EmptyState.tsx         # ASCII-art empty state with CTA button + subtitle
│   │   │   ├── ErrorBoundary.tsx      # React Error Boundary with styled fallback UI
│   │   │   ├── Sidebar.tsx            # Fixed 220px nav with pixel logo grid, active gradient
│   │   │   ├── StatusBadge.tsx        # Colored status pill with light-mode CSS overrides
│   │   │   ├── Toast.tsx              # Toast notification container with AnimatePresence
│   │   │   └── Topbar.tsx             # Fixed top bar with title, theme toggle, + ADD JOB
│   │   ├── context/
│   │   │   └── ThemeContext.tsx        # Light/dark theme provider + useTheme hook (localStorage)
│   │   ├── db/
│   │   │   └── index.ts              # All IndexedDB operations via idb (jobs + cvs stores)
│   │   ├── features/
│   │   │   ├── cvs/
│   │   │   │   ├── CVCard.tsx         # CV display card with download/delete + stagger
│   │   │   │   └── CVManager.tsx      # Dropzone upload, label input, general toggle
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.tsx      # Stats grid with icons/gradients + recent apps list
│   │   │   │   └── StatCard.tsx       # Animated stat card with icon, hover effect
│   │   │   └── jobs/
│   │   │       ├── JobCard.tsx        # Job list item with stagger animation
│   │   │       ├── JobDetail.tsx      # Job detail view wrapping JobForm in edit mode
│   │   │       ├── JobForm.tsx        # Full create/edit form with validation + cancel
│   │   │       └── JobList.tsx        # Search, filter by status, sort newest-first
│   │   ├── hooks/
│   │   │   ├── ToastContext.tsx       # Toast state context + provider
│   │   │   ├── useCVs.ts             # CV data fetching with loading state
│   │   │   ├── useJobs.ts            # Job data fetching (list + single) with loading state
│   │   │   └── useToast.ts           # Toast consumption hook
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx         # Login placeholder (coming soon)
│   │   │   │   └── Register.tsx      # Register placeholder (coming soon)
│   │   │   ├── Landing.tsx           # Full landing page: hero, features, how-it-works, FAQ, footer
│   │   │   ├── NotFound.tsx          # 404 page with "// PAGE NOT FOUND" heading
│   │   │   └── Settings.tsx          # Import/export page with replace/merge
│   │   ├── routes/
│   │   │   └── index.tsx             # All route definitions with AnimatePresence
│   │   ├── styles/
│   │   │   ├── components.css        # Badges, toasts, emptystate, settings, light-mode overrides
│   │   │   ├── cvs.css               # CV upload dropzone, list, cards
│   │   │   ├── dashboard.css         # 3-col stat grid with icons, recent items
│   │   │   ├── globals.css           # CSS reset + dark/light CSS variables + micro-interactions
│   │   │   ├── jobs.css              # Job list, form fields, detail, cancel button
│   │   │   ├── landing.css           # Landing page styles (navbar, hero, features, FAQ, footer)
│   │   │   ├── sidebar.css           # Fixed 220px sidebar with pixel logo + active gradient
│   │   │   └── topbar.css            # Fixed top bar with theme toggle button
│   │   ├── types/
│   │   │   └── index.ts              # Job, CV, Stats, Toast, ImportMode types
│   │   ├── utils/
│   │   │   ├── formatDate.ts         # ISO date to MM/DD/YYYY display
│   │   │   ├── importExport.ts       # JSON export (base64 CVs) + import (replace/merge)
│   │   │   └── statusColors.ts       # Status → color mapping for dark mode inline styles
│   │   ├── App.tsx                   # Root layout: ThemeProvider → AnimatedBackground + Sidebar + Topbar + Routes
│   │   └── main.tsx                  # Entry point, initDB with error fallback UI
│   ├── index.html                    # SEO-optimized: OG tags, Twitter Card, JSON-LD, preconnect fonts
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── README.md
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker (optional, for containerized deployment)

### Installation

```bash
cd client
npm install
```

### Run Dev

```bash
cd client
npm run dev
```

Opens at `http://localhost:5173`.

### Build

```bash
cd client
npm run build
```

Output goes to `client/dist/`.

### Docker

```bash
docker compose up --build
```

Opens at `http://localhost:3000` behind an Nginx reverse proxy.

---

## 📖 Usage

### Route Overview

| Path                    | Page             |
| ----------------------- | ---------------- |
| `/`                     | Landing Page     |
| `/app`                  | Dashboard        |
| `/app/jobs`             | Job List         |
| `/app/jobs/new`         | New Job          |
| `/app/jobs/:id`         | Job Detail       |
| `/app/cvs`              | CV Manager       |
| `/app/settings`         | Settings         |
| `/login`                | Login (stub)     |
| `/register`             | Register (stub)  |
| `*`                     | 404 Not Found    |

### Landing (`/`)

Full marketing page with animated hero mockup, features grid, how-it-works section, FAQ accordion, CTA, and footer. Includes theme toggle and smooth scroll navigation.

### Dashboard (`/app`)

Six animated stat cards with icons and gradient backgrounds show your pipeline totals (Total, Applied, Interview, Offer, Rejected, Saved) with staggered Framer Motion entrance. Below, the five most recent applications are listed. Click any row to jump to the detail view, or "VIEW ALL →" to see the full list.

### Jobs (`/app/jobs`)

Search by company, role, or location with the search input. Filter by status using the toggle buttons (ALL, APPLIED, INTERVIEW, OFFER, REJECTED, SAVED). Sort is always newest-first by creation date. Click any card to open the detail view. Use "+ ADD JOB" in the top bar to create a new entry.

### Job Detail / New Job (`/app/jobs/:id`, `/app/jobs/new`)

Fill in company (\*), role (\*), location, job URL, date applied (\*), status, and optional notes. Toggle "Cover letter used" to reveal a text area for pasting cover letter content. Select an uploaded CV from the dropdown. Required fields show red borders on validation failure. Use "✕ CANCEL" to discard changes and navigate back. In edit mode, "DELETE JOB" removes the entry after a confirmation dialog.

### CV Manager (`/app/cvs`)

Drag-and-drop or click to upload PDF/DOCX files (max 10 MB). Give each CV a label and optionally mark it as "General" — these get a highlighted left border. Download any CV with one click (blob URL is revoked after 100ms). General CVs are tagged with a "★ GENERAL" badge.

### Settings (`/app/settings`)

**Export**: Downloads all jobs and CVs as a single JSON file (`tyj-backup-YYYY-MM-DD.json`). CV file data is base64-encoded.

**Import**: Upload a backup JSON file and choose between:

- **Replace** — clears all existing data before importing
- **Merge** — skips duplicates (same company+role for jobs, same label for CVs)

---

## 💾 Import / Export Format

The backup JSON follows this structure:

```json
{
  "exported_at": "2026-05-09T12:00:00.000Z",
  "jobs": [
    {
      "company": "Acme Corp",
      "role": "Frontend Engineer",
      "location": "Remote",
      "job_url": "https://acme.com/careers/123",
      "date_applied": "2026-04-15T00:00:00.000Z",
      "status": "interview",
      "notes": "Had a great first round.",
      "cover_letter_used": true,
      "cover_letter_text": "Dear Acme...",
      "cv_id": 1,
      "created_at": "2026-04-15T10:30:00.000Z"
    }
  ],
  "cvs": [
    {
      "label": "Software Engineer Resume",
      "file_name": "resume.pdf",
      "file_data": "JVBERi0xLjcN...", // base64 encoded
      "file_type": "application/pdf",
      "is_general": false,
      "created_at": "2026-03-01T08:00:00.000Z"
    }
  ]
}
```

---

## 🐳 Docker

```bash
docker compose up --build
```

The app is served on port 3000 via Nginx. The Dockerfile uses a multi-stage build: Node for the Vite build, then Nginx alpine to serve the static assets.

---

## 🗺 Roadmap

- [x] Landing page with hero, features, FAQ, and CTA
- [x] Light/Dark mode toggle with localStorage persistence
- [x] Mobile-responsive layout with hamburger sidebar
- [x] Docker + Nginx production deployment
- [x] CI/CD via GitHub Actions
- [x] Import/Export JSON backup with replace/merge
- [ ] Backend API (Node.js + Express)
- [ ] Authentication (JWT)
- [ ] Email reminders for follow-ups
- [ ] PWA support (offline install)
- [ ] Analytics dashboard with charts

---

## 📄 License

MIT © Abdrahman Walied
