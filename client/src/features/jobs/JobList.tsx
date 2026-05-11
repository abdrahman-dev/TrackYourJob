import { useState } from 'react'
import { JobCard } from './JobCard'
import { EmptyState } from '../../components/EmptyState'
import { useJobs } from '../../hooks/useJobs'
import type { JobStatus } from '../../types'

const ALL_STATUSES: (JobStatus | 'all')[] = [
  'all', 'applied', 'interview', 'offer', 'rejected', 'saved'
]

export function JobList() {
  const { jobs, loading } = useJobs()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<JobStatus | 'all'>('all')

  const filtered = jobs
    .filter((j) => filter === 'all' || j.status === filter)
    .filter((j) => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        j.role.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        (j.location ?? '').toLowerCase().includes(q)
      )
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  if (loading) {
    return <div className="jobs-page"><div className="empty-state-text">Loading...</div></div>
  }

  return (
    <div className="jobs-page">
      <div className="jobs-controls">
        <input
          className="jobs-search"
          placeholder="Search by role, company, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            className={`jobs-filter-btn${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={jobs.length === 0 ? 'NO APPLICATIONS YET' : 'No matching applications'}
          actionLabel={jobs.length === 0 ? '+ ADD YOUR FIRST JOB' : undefined}
          actionTo={jobs.length === 0 ? '/app/jobs/new' : undefined}
        />
      ) : (
        <div className="jobs-list">
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
