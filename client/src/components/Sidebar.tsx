import { useLocation, useNavigate } from 'react-router-dom'
import { useJobs } from '../hooks/useJobs'

const LOGO_PATTERN = [
  [1,0,1,0],
  [0,1,0,1],
  [1,0,1,0],
  [0,1,0,1],
]

const NAV_ITEMS = [
  { icon: '◈', label: 'Dashboard', path: '/' },
  { icon: '▣', label: 'Jobs', path: '/jobs', count: true },
  { icon: '◼', label: 'CVs', path: '/cvs' },
  { icon: '⚙', label: 'Settings', path: '/settings' },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { jobs } = useJobs()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
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
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.path}
            className={`sidebar-link${isActive(item.path) ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.count && jobs.length > 0 && (
              <span className="sidebar-badge">{jobs.length}</span>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">TYJ v1.0</div>
    </aside>
  )
}
