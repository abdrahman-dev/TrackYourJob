import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StatCard } from './StatCard'
import { StatusBadge } from '../../components/StatusBadge'
import { EmptyState } from '../../components/EmptyState'
import { getStats } from '../../db'
import { useJobs } from '../../hooks/useJobs'
import { formatDate } from '../../utils/formatDate'
import { STATUS_COLORS } from '../../utils/statusColors'
import type { Stats } from '../../types'

const CARD_DATA: { label: string; color: string; key: keyof Stats }[] = [
  { label: 'TOTAL',     color: '#cdd6f4', key: 'total' },
  { label: 'APPLIED',   color: '#4f8ef7', key: 'applied' },
  { label: 'INTERVIEW', color: '#c4b5fd', key: 'interview' },
  { label: 'OFFER',     color: '#a6e3a1', key: 'offer' },
  { label: 'REJECTED',  color: '#f38ba8', key: 'rejected' },
  { label: 'SAVED',     color: '#f9e2af', key: 'saved' },
]

const EMPTY_ART = `
  ┌─────────────────┐
  │   NO DATA YET   │
  │   ············  │
  │   ············  │
  └─────────────────┘`

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const { jobs } = useJobs()
  const navigate = useNavigate()

  useEffect(() => {
    getStats().then(setStats).catch(console.error)
  }, [jobs])

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="dashboard-grid">
        {stats && CARD_DATA.map((card, i) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={stats[card.key]}
            color={card.color}
            index={i}
          />
        ))}
      </div>

      <div>
        <div className="dashboard-recent-header">
          <div className="dashboard-recent-title">RECENT APPLICATIONS</div>
          <span className="dashboard-view-all" style={{ cursor: 'pointer' }} onClick={() => navigate('/app/jobs')}>
            VIEW ALL →
          </span>
        </div>

        {recentJobs.length === 0 ? (
          <EmptyState
            art={EMPTY_ART}
            message="NO APPLICATIONS YET"
            subtitle="Start tracking your job search journey"
            actionLabel="+ ADD FIRST JOB"
            actionTo="/app/jobs/new"
          />
        ) : (
          <div className="dashboard-recent-list">
            {recentJobs.map((job) => {
              const sc = STATUS_COLORS[job.status]
              return (
                <div
                  key={job.id}
                  className="dashboard-recent-item"
                  onClick={() => navigate(`/app/jobs/${job.id}`)}
                >
                  <span className="dashboard-recent-dot" style={{ background: sc.color }} />
                  <span className="dashboard-recent-role">{job.role}</span>
                  <span className="dashboard-recent-sep">—</span>
                  <span className="dashboard-recent-company">{job.company}</span>
                  {job.location && (
                    <>
                      <span className="dashboard-recent-divider">//</span>
                      <span className="dashboard-recent-loc">{job.location}</span>
                    </>
                  )}
                  <span style={{ marginLeft: 'auto' }}>
                    <StatusBadge status={job.status} />
                  </span>
                  <span className="dashboard-recent-divider" style={{ marginLeft: 8 }}>
                    {formatDate(job.date_applied)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
