import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Dashboard } from '../features/dashboard/Dashboard'
import { JobList } from '../features/jobs/JobList'
import { JobDetail } from '../features/jobs/JobDetail'
import { JobForm } from '../features/jobs/JobForm'
import { CVManager } from '../features/cvs/CVManager'
import { Settings } from '../pages/Settings'
import { NotFound } from '../pages/NotFound'
import { useCVs } from '../hooks/useCVs'
import { useToast } from '../hooks/useToast'
import { createJob } from '../api/jobs'
import type { Job } from '../types'

function NewJobPage() {
  const { cvs } = useCVs()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSave = async (data: Omit<Job, 'id' | 'created_at'>) => {
    const payload: Omit<Job, 'id'> = { ...data, created_at: new Date().toISOString() }
    const id = await createJob(payload)
    showToast('Job created successfully', 'success')
    navigate(`/jobs/${id}`)
  }

  return (
    <div className="job-detail">
      <JobForm
        cvs={cvs}
        onSave={handleSave}
      />
    </div>
  )
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="/jobs" element={<AnimatedPage><JobList /></AnimatedPage>} />
        <Route path="/jobs/new" element={<AnimatedPage><NewJobPage /></AnimatedPage>} />
        <Route path="/jobs/:id" element={<AnimatedPage><JobDetail /></AnimatedPage>} />
        <Route path="/cvs" element={<AnimatedPage><CVManager /></AnimatedPage>} />
        <Route path="/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  )
}
