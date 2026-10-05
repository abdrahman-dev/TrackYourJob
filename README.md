```
████████╗██╗   ██╗     ██╗
   ██╔══╝╚██╗ ██╔╝     ██║
   ██║    ╚████╔╝      ██║
   ██║     ╚██╔╝  ██   ██║
   ██║      ██║   ╚█████╔╝
   ╚═╝      ╚═╝    ╚════╝
```

# Track Your Journey — Job Application Tracker

[![CI](https://github.com/abdrahman-dev/TrackYourJob/actions/workflows/deploy.yml/badge.svg)](https://github.com/abdrahman-dev/TrackYourJob/actions/workflows/deploy.yml)
[![React 19](https://img.shields.io/badge/React-19-4f8ef7?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055ff?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![IndexedDB](https://img.shields.io/badge/IndexedDB-local-2a7a3b?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ed?style=flat-square&logo=docker)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

**Track Your Journey (TYJ)** is a modern, offline-first job application tracker built around
privacy and local storage. Log every application, manage your CVs, store cover letters, and
watch your pipeline — with no account, no server, and no data ever leaving your device.

🌐 **Live demo:** [tyj.app](https://tyj.app)

---

## 📸 Screenshots

> Screenshots are placeholders — drop your captures into [`screenshots/`](screenshots/) using the
> filenames listed in [`screenshots/README.md`](screenshots/README.md).

| Landing | Dashboard (dark) |
| :---: | :---: |
| ![Landing page](screenshots/landing.png) | ![Dashboard dark](screenshots/dashboard-dark.png) |

| Dashboard (light) | Jobs list |
| :---: | :---: |
| ![Dashboard light](screenshots/dashboard-light.png) | ![Jobs list](screenshots/jobs.png) |

| Job detail | CV manager |
| :---: | :---: |
| ![Job detail](screenshots/job-detail.png) | ![CV manager](screenshots/cv-manager.png) |

| Settings | Mobile |
| :---: | :---: |
| ![Settings](screenshots/settings.png) | ![Mobile](screenshots/mobile.png) |

---

## ✨ Features

- **Landing page** — Full marketing landing with animated hero mockup, features grid, how-it-works steps, FAQ accordion, and CTA section
- **Dark pixel UI** — Retro game-inspired design with JetBrains Mono and Space Mono fonts, sharp 0px border-radius throughout
- **Warm parchment light mode** — Toggle between dark and light themes. Light mode uses a warm, muted, eye-friendly palette (never pure white). Persisted to localStorage
- **Canvas animated background** — Subtle floating particle system rendered on HTML5 Canvas with requestAnimationFrame. Particles drift slowly and wrap around edges. Reads the CSS `--accent` color dynamically
- **Mobile-responsive layout** — Hamburger sidebar overlay on mobile, responsive grids, compact cards, adaptive typography
- **Error boundaries** — React Error Boundary wrapping the app with styled fallback UI and restart button
- **404 page** — Dedicated page with Space Mono heading, descriptive text, and return-to-dashboard button
- **Full CRUD job tracking** — Log applications, update status, add notes and cover letters
- **CV manager** — Upload PDF/DOCX files (max 10 MB), mark as general, download with one click
- **Cover letter tracking** — Per-application toggle with text area for storing cover letter content
- **Status pipeline** — Track through Saved → Applied → Interview → Offer → Rejected
- **Dashboard analytics** — Six animated stat cards with icons, gradient backgrounds, hover effects + recent applications list
- **Search & filter** — Full-text search by company/role/location, filter by status, sorted newest-first
- **Import/Export JSON** — Full backup and restore with replace or merge mode. CV file data is base64-encoded
- **Toast notifications** — Snappy, auto-dismissing (3s) feedback on all actions
- **Animated transitions** — Framer Motion page transitions, staggered list animations, toast enter/exit
- **Auth route stubs** — Login and Register routes scaffolded for future backend integration
- **SEO optimized** — Open Graph, Twitter Card, JSON-LD structured data, and canonical URL
- **Keyboard-friendly forms** — Validation with red border errors on required fields
- **Docker support** — One-command deploy via Docker Compose with Nginx
- **CI/CD** — GitHub Actions type-checks, builds, and deploys to Vercel on every push to `main`

---

## 🧰 Tech Stack

| Tool                    | Version    | Purpose                                  |
| ----------------------- | ---------- | ---------------------------------------- |
| React                   | 19.2       | UI framework                             |
| TypeScript              | 6.0        | Type safety (`strict` mode enabled)      |
| Vite                    | 8.0        | Build tool and dev server                |
| React Router            | 7.15       | Client-side routing                      |
| idb                     | 8.0        | IndexedDB wrapper for persistent storage |
| Framer Motion           | 12.38      | Declarative animations                   |
| HTML5 Canvas            | —          | Animated background particle system      |
| Plain CSS               | —          | Styling (no Tailwind, no UI libraries)   |
| Docker / Nginx          | —          | Containerised production deployment      |
| GitHub Actions + Vercel | —          | CI/CD and hosting                        |

---

## 📁 Project Structure

```
TrackYourJob/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md         # Bug issue template
│   │   └── feature_request.md    # Feature issue template
│   └── workflows/
│       └── deploy.yml            # Type check + build + Vercel deploy
├── client/
│   ├── public/
│   │   └── favicon.svg            # Pixel-style SVG favicon (dark bg, accent TYJ grid)
│   ├── src/
│   │   ├── api/
│   │   │   ├── jobs.ts            # API layer — wraps DB calls, swap to axios later
│   │   │   └── cvs.ts             # API layer for CV operations
│   │   ├── components/
│   │   │   ├── AnimatedBackground.tsx  # Canvas particle system (requestAnimationFrame)
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
│   │   │   ├── useCVs.ts              # CV data fetching with loading state
│   │   │   ├── useJobs.ts             # Job data fetching (list + single) with loading state
│   │   │   └── useToast.ts            # Toast consumption hook
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx          # Login placeholder (coming soon)
│   │   │   │   └── Register.tsx       # Register placeholder (coming soon)
│   │   │   ├── Landing.tsx            # Landing page: hero, features, how-it-works, FAQ, footer
│   │   │   ├── NotFound.tsx           # 404 page with "// PAGE NOT FOUND" heading
│   │   │   └── Settings.tsx           # Import/export page with replace/merge
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
│   │   │   └── statusColors.ts       # Status → colour mapping for dark mode inline styles
│   │   ├── App.tsx                   # Root layout: ThemeProvider → AnimatedBackground + Sidebar + Topbar + Routes
│   │   └── main.tsx                  # Entry point, initDB with error fallback UI
│   ├── .gitignore                    # Client-specific ignore rules
│   ├── eslint.config.js              # ESLint flat config (js + tseslint + react-hooks)
│   ├── index.html                    # SEO-optimized: OG tags, Twitter Card, JSON-LD, preconnect fonts
│   ├── package.json                  # App manifest, scripts, deps
│   ├── package-lock.json             # Locked dependency tree (lockfileVersion 3)
│   ├── tsconfig.json                 # Solution-style config with project references
│   ├── tsconfig.app.json             # App compiler options (strict mode)
│   ├── tsconfig.node.json            # Compiler options for vite.config.ts
│   └── vite.config.ts                # Vite + React plugin config
├── screenshots/                       # README screenshot placeholders (see screenshots/README.md)
├── .dockerignore                     # Keeps node_modules/dist out of the Docker build context
├── .editorconfig                     # Consistent whitespace and newlines across editors
├── .gitignore                        # Root ignore rules
├── Dockerfile                        # Multi-stage build: Node build → Nginx alpine
├── docker-compose.yml                # One-command local containerised run on :3000
├── LICENSE                           # MIT
├── nginx.conf                        # Nginx config: gzip, immutable asset caching, SPA fallback
├── package.json                      # Root convenience scripts that delegate to ./client
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js `^20.19.0 || >=22.12.0`** (required by Vite 8)
- **npm 10+**
- **Docker** (optional, for containerised deployment)

### Option 1 — from the repo root (recommended)

```bash
npm run install:all   # installs dependencies in ./client
npm run dev           # starts Vite at http://localhost:5173
```

### Option 2 — directly in `client/`

```bash
cd client
npm install
npm run dev
```

### Scripts

| Command          | Location  | Description                              |
| ---------------- | --------- | ---------------------------------------- |
| `npm run dev`    | either    | Start the Vite dev server                |
| `npm run build`  | either    | Type check (`tsc -b`) + production build |
| `npm run preview`| either    | Serve the production build locally       |
| `npm run lint`   | either    | Run ESLint                              |
| `npm run typecheck` | either | Run the TypeScript project build (types only) |

Production output goes to `client/dist/`.

### Docker

```bash
docker compose up --build
```

Opens at `http://localhost:3000` behind an Nginx reverse proxy. The `Dockerfile` uses a
multi-stage build: Node 20 Alpine compiles the Vite bundle, then `nginx:alpine` serves the
static assets with gzip, immutable asset caching, and SPA history fallback.

---

## 📖 Usage

### Route Overview

| Path            | Page          |
| --------------- | ------------- |
| `/`             | Landing Page  |
| `/app`          | Dashboard     |
| `/app/jobs`     | Job List      |
| `/app/jobs/new` | New Job       |
| `/app/jobs/:id` | Job Detail    |
| `/app/cvs`      | CV Manager    |
| `/app/settings` | Settings      |
| `/login`        | Login (stub)  |
| `/register`     | Register (stub) |
| `*`             | 404 Not Found |

### Landing (`/`)

Full marketing page with animated hero mockup, features grid, how-it-works section, FAQ
accordion, CTA, and footer. Includes theme toggle and smooth scroll navigation.

### Dashboard (`/app`)

Six animated stat cards with icons and gradient backgrounds show your pipeline totals
(Total, Applied, Interview, Offer, Rejected, Saved) with staggered Framer Motion entrance.
Below, the five most recent applications are listed. Click any row to jump to the detail
view, or "VIEW ALL →" to see the full list.

### Jobs (`/app/jobs`)

Search by company, role, or location with the search input. Filter by status using the
toggle buttons (ALL, APPLIED, INTERVIEW, OFFER, REJECTED, SAVED). Sort is always
newest-first by creation date. Click any card to open the detail view. Use "+ ADD JOB" in
the top bar to create a new entry.

### Job Detail / New Job (`/app/jobs/:id`, `/app/jobs/new`)

Fill in company (\*), role (\*), location, job URL, date applied (\*), status, and optional
notes. Toggle "Cover letter used" to reveal a text area for pasting cover letter content.
Select an uploaded CV from the dropdown. Required fields show red borders on validation
failure. Use "✕ CANCEL" to discard changes and navigate back. In edit mode, "DELETE JOB"
removes the entry after a confirmation dialog.

### CV Manager (`/app/cvs`)

Drag-and-drop or click to upload PDF/DOCX files (max 10 MB). Give each CV a label and
optionally mark it as "General" — these get a highlighted left border. Download any CV with
one click (blob URL is revoked after 100ms). General CVs are tagged with a "★ GENERAL" badge.

### Settings (`/app/settings`)

**Export**: Downloads all jobs and CVs as a single JSON file (`tyj-backup-YYYY-MM-DD.json`).
CV file data is base64-encoded.

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
      "file_data": "JVBERi0xLjcN...",
      "file_type": "application/pdf",
      "is_general": false,
      "created_at": "2026-03-01T08:00:00.000Z"
    }
  ]
}
```

> `file_data` is base64-encoded. Keep backups small enough to survive email/Drive limits —
> CVs are stored in full.

---

## 🔒 Privacy

Everything lives in your browser's IndexedDB. There is no backend, no analytics, and no
account. Because data is local:

- Data is tied to the browser profile and origin — use **Settings → Export** before clearing
  site data, switching browsers, or moving to another machine.
- Private/incognito windows will lose data on close.
- Clearing "cookies and site data" for the site deletes your jobs and CVs.

---

## 🗺 Roadmap

- [x] Landing page with hero, features, FAQ, and CTA
- [x] Light/dark mode toggle with localStorage persistence
- [x] Mobile-responsive layout with hamburger sidebar
- [x] Docker + Nginx production deployment
- [x] CI/CD via GitHub Actions → Vercel
- [x] Import/Export JSON backup with replace/merge
- [x] Error boundary and custom 404 page
- [ ] Backend API (Node.js + Express)
- [ ] Authentication (JWT)
- [ ] Email reminders for follow-ups
- [ ] PWA support (offline install)
- [ ] Analytics dashboard with charts

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Install and verify your change:
   ```bash
   npm run install:all
   npm run lint
   npm run typecheck
   npm run build
   ```
3. Keep the TypeScript `strict` mode passing — no `any`, no `@ts-ignore`.
4. Open a PR describing what changed and why.

**Please don't open an issue with personal data in it.** If you find a security or privacy
problem, please open a [private security advisory](https://github.com/abdrahman-dev/TrackYourJob/security/advisories/new)
instead of a public issue.

---

## 👤 Author

**Abdrahman Walied** — [GitHub](https://github.com/abdrahman-dev)

---

## 📄 License

Released under the [MIT License](LICENSE).