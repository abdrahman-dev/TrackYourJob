import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const PAGE_TITLES: Record<string, string> = {
  '/': '// DASHBOARD',
  '/jobs': '// JOBS',
  '/cvs': '// CVs',
  '/settings': '// SETTINGS',
}

export function Topbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const basePath = '/' + (location.pathname.split('/')[1] || '')
  let title = PAGE_TITLES[basePath] || '// TYJ'

  if (location.pathname === '/jobs/new') title = '// NEW JOB'
  else if (location.pathname.match(/^\/jobs\/\d+$/)) title = '// JOB DETAIL'

  const showAdd = basePath === '/jobs' && location.pathname === '/jobs'

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <button className="topbar-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="topbar-status">
          <span className="topbar-status-dot" />
          SYS_OK
        </div>
        {showAdd && (
          <button className="topbar-add-btn" onClick={() => navigate('/jobs/new')}>
            + ADD JOB
          </button>
        )}
      </div>
    </header>
  )
}
