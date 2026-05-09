```
████████╗██╗   ██╗     ██╗
   ██╔══╝╚██╗ ██╔╝     ██║
   ██║    ╚████╔╝      ██║
   ██║     ╚██╔╝  ██   ██║
   ██║      ██║   ╚█████╔╝
   ╚═╝      ╚═╝    ╚════╝
```

**Track Your Journey — Job Application Tracker**

[![React 18](https://img.shields.io/badge/React-18-4f8ef7?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055ff?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-local-2a7a3b?style=flat-square&logo=sqlite)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

A private, offline-first job application tracker built with React and TypeScript. All your data stays on your device — no servers, no subscriptions, no tracking.

---

## 🚀 Features

- **Dark pixel UI** — Retro game-inspired design with JetBrains Mono and Space Mono fonts
- **Light/Dark mode** — Toggle between themes, persisted to localStorage
- **Full CRUD job tracking** — Log applications, update status, add notes
- **CV manager** — Upload PDF/DOCX files, mark as general, download anytime
- **Cover letter tracking** — Toggle and store cover letter text per application
- **Status pipeline** — Track through Saved → Applied → Interview → Offer → Rejected
- **Dashboard analytics** — At-a-glance stats with recent applications list
- **Search & filter** — Search by company/role, filter by status
- **Import/Export JSON** — Full backup and restore with replace or merge mode
- **Toast notifications** — Snappy, auto-dismissing feedback on all actions
- **Animated transitions** — Framer Motion page transitions and staggered lists
- **Keyboard-friendly forms** — Validation with error states on required fields
- **Docker support** — One-command deploy via Docker Compose

---

## 📦 Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript 6 | Type safety |
| Vite 8 | Build tool and dev server |
| React Router v6 | Client-side routing |
| idb | IndexedDB wrapper for persistent storage |
| Framer Motion 11 | Declarative animations |
| Plain CSS | Styling (no Tailwind, no UI libraries) |
| Docker / Nginx | Production deployment |

---

## 📁 Project Structure

```
TrackYourJob/
├── client/
│   ├── public/
│   │   └── favicon.svg          # Pixel-style SVG favicon
│   ├── src/
│   │   ├── api/
│   │   │   ├── jobs.ts          # API stubs — wraps DB calls, ready for axios
│   │   │   └── cvs.ts           # API stubs for CV operations
│   │   ├── components/
│   │   │   ├── AnimatedBackground.tsx  # Subtle floating pixel particles
│   │   │   ├── EmptyState.tsx         # ASCII-art empty state with CTA
│   │   │   ├── Sidebar.tsx            # Fixed 220px navigation sidebar
│   │   │   ├── StatusBadge.tsx        # Colored status pill component
│   │   │   ├── Toast.tsx              # Toast notification container
│   │   │   └── Topbar.tsx             # Fixed top bar with title + actions
│   │   ├── context/
│   │   │   └── ThemeContext.tsx        # Light/dark theme provider
│   │   ├── db/
│   │   │   └── index.ts              # All IndexedDB operations via idb
│   │   ├── features/
│   │   │   ├── cvs/
│   │   │   │   ├── CVCard.tsx         # Single CV display card
│   │   │   │   └── CVManager.tsx      # CV upload, list, delete
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.tsx      # Stats grid + recent applications
│   │   │   │   └── StatCard.tsx       # Animated stat card
│   │   │   └── jobs/
│   │   │       ├── JobCard.tsx        # Job list item with stagger
│   │   │       ├── JobDetail.tsx      # Job edit/delete wrapper
│   │   │       ├── JobForm.tsx        # Full job create/edit form
│   │   │       └── JobList.tsx        # Search, filter, sort job list
│   │   ├── hooks/
│   │   │   ├── ToastContext.tsx       # Toast state context + provider
│   │   │   ├── useCVs.ts             # CV data fetching hook
│   │   │   ├── useJobs.ts            # Job data fetching hooks
│   │   │   └── useToast.ts           # Toast consumption hook
│   │   ├── pages/
│   │   │   └── Settings.tsx          # Import/export page
│   │   ├── routes/
│   │   │   └── index.tsx             # All route definitions with animations
│   │   ├── styles/
│   │   │   ├── components.css        # Reusable component styles
│   │   │   ├── cvs.css               # CV manager page styles
│   │   │   ├── dashboard.css         # Dashboard grid + recent list
│   │   │   ├── globals.css           # CSS variables + base reset
│   │   │   ├── jobs.css              # Job list, form, detail styles
│   │   │   ├── sidebar.css           # Fixed sidebar layout
│   │   │   └── topbar.css            # Fixed top bar layout
│   │   ├── types/
│   │   │   └── index.ts              # All shared TypeScript types
│   │   ├── utils/
│   │   │   ├── formatDate.ts         # Date formatting helpers
│   │   │   ├── importExport.ts       # JSON backup/restore logic
│   │   │   └── statusColors.ts       # Status → color mapping
│   │   ├── App.tsx                   # Root component with layout
│   │   └── main.tsx                  # Entry point
│   ├── index.html                    # SEO-optimized HTML shell
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

### Dashboard (`/`)

Six stat cards show your pipeline totals at a glance. Below, the five most recent applications are listed. Click any row to jump to the detail view, or "VIEW ALL" to see the full list.

### Jobs (`/jobs`)

Search by company, role, or location. Filter by status with the toggle buttons. Sort is always newest-first. Click any card to edit. Use "+ ADD JOB" in the top bar to create a new entry.

### Job Detail / New Job (`/jobs/:id`, `/jobs/new`)

Fill in company, role, location, date applied, status, and optional notes. Toggle cover letter tracking to reveal a text area. Select an uploaded CV from the dropdown. Required fields show red borders on validation failure. Use "✕ CANCEL" to discard changes, or "DELETE JOB" (edit mode only) to remove an entry after confirmation.

### CV Manager (`/cvs`)

Drag-and-drop or click to upload PDF/DOCX files (max 10 MB). Give each CV a label and optionally mark it as "General" — these get a highlighted left border. Download any CV with one click, or delete to remove it. General CVs are tagged with a "★ GENERAL" badge.

### Settings (`/settings`)

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
      "file_data": "JVBERi0xLjcN...",   // base64 encoded
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

- [ ] Backend API (Node.js + Express)
- [ ] Authentication and multi-user support
- [ ] Email reminders for follow-ups
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard with charts

---

## 📄 License

MIT © Abdrahman Walied
