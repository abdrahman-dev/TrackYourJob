import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const getTitle = (pathname: string): string => {
    if (pathname === '/app' || pathname === '/app/') return '// DASHBOARD'
    if (pathname.startsWith('/app/jobs/new')) return '// NEW JOB'
    if (pathname.startsWith('/app/jobs/')) return '// JOB DETAIL'
    if (pathname.startsWith('/app/jobs')) return '// JOBS'
    if (pathname.startsWith('/app/cvs')) return '// CVs'
    if (pathname.startsWith('/app/settings')) return '// SETTINGS'
    return '// TYJ'
  }

  const title = getTitle(location.pathname)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-hamburger" onClick={onMenuClick} aria-label="Toggle menu">
          ≡
        </button>
        <div className="topbar-title">{title}</div>
      </div>
      <div className="topbar-right">
        <button className="topbar-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="topbar-status">
          <span className="topbar-status-dot" />
          <span className="topbar-status-label">SYS_OK</span>
        </div>
        <button className="topbar-add-btn" onClick={() => navigate('/app/jobs/new')}>
          + ADD JOB
        </button>
      </div>
    </header>
  )
}
