import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '../../components/StatusBadge'
import { formatDate } from '../../utils/formatDate'
import { STATUS_COLORS } from '../../utils/statusColors'
import type { Job } from '../../types'

interface JobCardProps {
  job: Job
  index: number
}

export function JobCard({ job, index }: JobCardProps) {
  const navigate = useNavigate()
  const dotColor = STATUS_COLORS[job.status].color

  return (
    <motion.div
      className="job-card"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => navigate(`/app/jobs/${job.id}`)}
    >
      <span className="job-card-dot" style={{ background: dotColor }} />
      <span className="job-card-role">{job.role}</span>
      <span className="job-card-sep">—</span>
      <span className="job-card-company">{job.company}</span>
      {job.location && (
        <>
          <span className="job-card-sep">//</span>
          <span className="job-card-location">{job.location}</span>
        </>
      )}
      <span className="job-card-status">
        <StatusBadge status={job.status} />
      </span>
      <span className="job-card-date">{formatDate(job.date_applied)}</span>
      <span className="job-card-arrow">→</span>
    </motion.div>
  )
}
