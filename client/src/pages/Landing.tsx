import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import '../styles/landing.css'

const LOGO_PATTERN = [1,0,1,0, 0,1,0,1, 1,0,1,0, 0,1,0,1]

const FEATURES = [
  { icon: '⬡', title: 'Offline First', desc: 'All data stored locally in IndexedDB. No server, no cloud, no account needed.' },
  { icon: '◈', title: 'CV Manager', desc: 'Upload and manage multiple CVs. Link specific CVs to each application.' },
  { icon: '◧', title: 'Cover Letters', desc: 'Write and store cover letters per application. Toggle on/off per job.' },
  { icon: '⟲', title: 'Import / Export', desc: 'Backup your data as JSON. Import it anywhere, anytime.' },
  { icon: '✦', title: 'Dark & Light Mode', desc: 'Easy on the eyes in any environment. Preference saved automatically.' },
  { icon: '⬢', title: 'Status Tracking', desc: 'Track every stage: Applied, Interview, Offer, Rejected, Saved.' },
]

const STEPS = [
  { num: '01', title: 'Add Your Applications', desc: 'Log every job you apply to with role, company, status, and notes.' },
  { num: '02', title: 'Track Every Stage', desc: 'Update status as you progress. From saved to offer in one place.' },
  { num: '03', title: 'Never Miss a Beat', desc: 'Export your data, link CVs, attach cover letters. Stay organized.' },
]

const FAQS = [
  { q: 'Is TYJ really free?', a: 'Yes, completely free. No subscription, no premium tier, no hidden fees.' },
  { q: 'Where is my data stored?', a: 'Entirely on your device using IndexedDB — a browser-native database. Nothing is sent to any server.' },
  { q: 'Does it work offline?', a: 'Yes. Once loaded, TYJ works completely offline. No internet connection required.' },
  { q: 'Can I use it on mobile?', a: 'Yes. TYJ is fully responsive and works on any device with a modern browser.' },
  { q: 'How do I backup my data?', a: 'Go to Settings → Export Data. Downloads a JSON file with all your jobs and CVs.' },
  { q: 'Can I import data from another device?', a: 'Yes. Use Settings → Import Data. Choose replace or merge mode.' },
  { q: 'Will there be a backend/auth system?', a: 'Planned for a future version. The API layer is already structured for easy migration.' },
  { q: 'Is it open source?', a: 'Yes. Find it on GitHub at github.com/abdrahman-dev/TrackYourJob' },
]

const MOCKUP_CARDS = [
  { role: 'Senior Frontend Engineer', company: 'Google', loc: 'Remote', status: 'applied', color: '#4f8ef7', bg: '#1e2a4a', date: 'May 2, 2026' },
  { role: 'Product Designer', company: 'Figma', loc: 'San Francisco', status: 'interview', color: '#c4b5fd', bg: '#2a1f3d', date: 'Apr 28, 2026' },
  { role: 'Backend Engineer', company: 'Vercel', loc: 'Remote', status: 'offer', color: '#a6e3a1', bg: '#1a2e1a', date: 'Apr 15, 2026' },
  { role: 'ML Engineer', company: 'OpenAI', loc: 'New York', status: 'saved', color: '#f9e2af', bg: '#2e2a1a', date: 'Apr 10, 2026' },
]

function HeroMockup() {
  return (
    <motion.div
      className="landing-hero-mockup"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="landing-hero-mockup-topbar">
        <div className="landing-hero-mockup-title">// JOBS</div>
        <div className="landing-hero-mockup-dots">
          {[0,1,2].map((i) => <div key={i} className="landing-hero-mockup-dot" />)}
        </div>
      </div>
      {MOCKUP_CARDS.map((card, i) => (
        <motion.div
          key={i}
          className="landing-hero-mockup-card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 * i + 0.2 }}
        >
          <div className="landing-hero-mockup-dot-sm" style={{ background: card.color }} />
          <span className="landing-hero-mockup-role">{card.role}</span>
          <span className="landing-hero-mockup-sep">—</span>
          <span className="landing-hero-mockup-company">{card.company}</span>
          <span className="landing-hero-mockup-badge" style={{ background: card.bg, color: card.color }}>
            {card.status}
          </span>
          <span className="landing-hero-mockup-date">{card.date}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="landing-faq-item">
      <button className="landing-faq-question" onClick={() => setOpen(!open)}>
        {q}
        <span className="landing-faq-toggle">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="landing-faq-answer">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Landing() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [featuresInView, setFeaturesInView] = useState(false)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [stepsInView, setStepsInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = featuresRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFeaturesInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = stepsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStepsInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className={`landing-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="landing-navbar-left" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="landing-navbar-logo-grid">
            {LOGO_PATTERN.map((on, i) => (
              <div key={i} className="landing-navbar-logo-cell" style={{ background: on ? 'var(--accent)' : 'var(--surface-2)' }} />
            ))}
          </div>
          <div className="landing-navbar-title">TYJ</div>
        </div>
        <div className="landing-navbar-right">
          <button className="landing-navbar-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
            FAQ
          </button>
          <button className="topbar-theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/app" className="landing-navbar-btn">
            OPEN APP →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-left">
            <div className="landing-hero-label">// TRACK YOUR JOURNEY</div>
            <h1 className="landing-hero-heading">
              Never lose track of
              <br />
              an opportunity.
            </h1>
            <p className="landing-hero-sub">
              TYJ is a private, offline-first job application tracker.
              Your data stays on your device. Always.
            </p>
            <div className="landing-hero-actions">
              <Link to="/app" className="landing-hero-btn-primary">
                ▶ START TRACKING — FREE
              </Link>
              <a href="https://github.com/abdrahman-dev/TrackYourJob" target="_blank" rel="noopener noreferrer" className="landing-hero-btn-secondary">
                ⌗ VIEW ON GITHUB
              </a>
            </div>
            <div className="landing-hero-trust">
              ✦ No account required &nbsp;✦ No data leaves your device &nbsp;✦ Open source
            </div>
          </div>
          <div className="landing-hero-right">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features" ref={featuresRef}>
        <div className="landing-section-header">
          <div className="landing-section-label">// FEATURES</div>
          <h2 className="landing-section-heading">Everything you need to track your job search.</h2>
        </div>
        <div className="landing-features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="landing-feature-card"
              initial={{ opacity: 0, y: 24 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="landing-feature-icon">{f.icon}</span>
              <div className="landing-feature-title">{f.title}</div>
              <div className="landing-feature-desc">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section landing-section-alt" id="how-it-works" ref={stepsRef}>
        <div className="landing-section-header">
          <div className="landing-section-label">// HOW IT WORKS</div>
          <h2 className="landing-section-heading">Three simple steps.</h2>
        </div>
        <div className="landing-steps">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              className="landing-step"
              initial={{ opacity: 0, y: 24 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="landing-step-number">{s.num}</div>
              <div className="landing-step-title">{s.title}</div>
              <div className="landing-step-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section" id="faq">
        <div className="landing-section-header">
          <div className="landing-section-label">// FAQ</div>
        </div>
        <div className="landing-faq-list">
          {FAQS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2 className="landing-cta-heading">
          Ready to take control
          <br />
          of your job search?
        </h2>
        <p className="landing-cta-sub">Start tracking in seconds. No signup. No setup.</p>
        <Link to="/app" className="landing-cta-btn">
          ▶ OPEN TYJ — FREE
        </Link>
        <div className="landing-cta-pixels">
          {LOGO_PATTERN.map((on, i) => (
            <div key={i} className="landing-cta-pixel" style={{ background: on ? 'var(--accent)' : 'var(--surface-2)' }} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-left">
            <strong>TYJ</strong> — Track Your Journey<br />
            Built by Abdrahman Walied
          </div>
          <div className="landing-footer-center">
            <button className="landing-footer-link" onClick={() => navigate('/app')}>DASHBOARD</button>
            <a className="landing-footer-link" href="https://github.com/abdrahman-dev/TrackYourJob" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <button className="landing-footer-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>FAQ</button>
          </div>
          <div className="landing-footer-right">
            MIT License · 2026<br />
            Made with ♥ and too much coffee
          </div>
        </div>
      </footer>
    </div>
  )
}
