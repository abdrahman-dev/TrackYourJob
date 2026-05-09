import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatCard } from './StatCard'
import { StatusBadge } from '../../components/StatusBadge'
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
    <div className="dashboard">
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
          <span className="dashboard-view-all" style={{ cursor: 'pointer' }} onClick={() => navigate('/jobs')}>
            VIEW ALL →
          </span>
        </div>

        {recentJobs.length === 0 ? (
          <div className="empty-state" style={{ padding: '24px' }}>
            <div className="empty-state-text">No applications yet</div>
          </div>
        ) : (
          <div className="dashboard-recent-list">
            {recentJobs.map((job) => {
              const sc = STATUS_COLORS[job.status]
              return (
                <div
                  key={job.id}
                  className="dashboard-recent-item"
                  onClick={() => navigate(`/jobs/${job.id}`)}
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
    </div>
  )
}
