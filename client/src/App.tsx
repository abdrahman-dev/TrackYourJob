import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './hooks/ToastContext'
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

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AnimatedBackground />
          <Sidebar />
          <Topbar />
          <main style={{ marginLeft: 'var(--sidebar-width)', paddingTop: 'var(--topbar-height)', minHeight: '100vh', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
            <AppRoutes />
          </main>
          <ToastContainer />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
