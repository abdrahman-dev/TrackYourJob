import { useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { ToastProvider } from './hooks/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { ToastContainer } from './components/Toast'
import { AnimatedBackground } from './components/AnimatedBackground'
import { AppRoutes } from './routes'
import './styles/globals.css'
import './styles/sidebar.css'
import './styles/topbar.css'
import './styles/dashboard.css'
import './styles/jobs.css'
import './styles/cvs.css'
import './styles/components.css'

function AppLayout() {
  const { theme } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isApp = location.pathname.startsWith('/app')

  return (
    <ToastProvider>
      <ErrorBoundary>
        {isApp ? (
          <>
            <AnimatedBackground theme={theme} hasSidebar intensity="normal" />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />
            <main className="main-content">
              <AppRoutes />
            </main>
          </>
        ) : (
          <>
            <AnimatedBackground theme={theme} hasSidebar={false} intensity="high" />
            <AppRoutes />
          </>
        )}
        <ToastContainer />
      </ErrorBoundary>
    </ToastProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  )
}
