import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useJobs } from '../hooks/useJobs'
import { useEffect } from 'react'

const LOGO_PATTERN = [
  [1,0,1,0],
  [0,1,0,1],
  [1,0,1,0],
  [0,1,0,1],
]

const NAV_ITEMS = [
  { icon: '⬡', label: 'Dashboard', path: '/app' },
  { icon: '◧', label: 'Jobs', path: '/app/jobs', count: true },
  { icon: '◈', label: 'CVs', path: '/app/cvs' },
  { icon: '⚙', label: 'Settings', path: '/app/settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { jobs } = useJobs()

  useEffect(() => {
    onClose()
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app'
    return location.pathname.startsWith(path)
  }

  const handleNav = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <Link to="/" className="sidebar-logo" style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer' }}>
          <div className="sidebar-logo-grid">
            {LOGO_PATTERN.flat().map((on, i) => (
              <div
                key={i}
                className="sidebar-logo-cell"
                style={{ background: on ? 'var(--accent)' : 'var(--surface-2)' }}
              />
            ))}
          </div>
          <div className="sidebar-logo-text">
            TYJ
            <span>TRACK YOUR JOURNEY</span>
          </div>
        </Link>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item.path}
              className={`sidebar-link${isActive(item.path) ? ' active' : ''}${i < NAV_ITEMS.length - 1 ? ' has-sep' : ''}`}
              onClick={() => handleNav(item.path)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.count && jobs.length > 0 && (
                <span className="sidebar-badge">{jobs.length}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-dot" />
          SYSTEM ONLINE
        </div>
      </aside>
    </>
  )
}
