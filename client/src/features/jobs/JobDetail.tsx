import { useParams, useNavigate } from 'react-router-dom'
import { JobForm } from './JobForm'
import { useJob } from '../../hooks/useJobs'
import { useCVs } from '../../hooks/useCVs'
import { useToast } from '../../hooks/useToast'
import { updateJobById, removeJob } from '../../api/jobs'
import type { Job } from '../../types'

export function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const numericId = parseInt(id ?? '', 10)

  const { job, loading } = useJob(numericId)
  const { cvs } = useCVs()

  if (!id || isNaN(numericId)) {
    return (
      <div className="job-detail">
        <div className="empty-state-text">Invalid job ID</div>
      </div>
    )
  }

  if (loading) {
    return <div className="job-detail"><div className="empty-state-text">Loading...</div></div>
  }

  if (!job) {
    return (
      <div className="job-detail">
        <div className="empty-state-text">Job not found</div>
      </div>
    )
  }

  const handleSave = async (data: Omit<Job, 'id' | 'created_at'>) => {
    await updateJobById(numericId, data)
    showToast('Job updated successfully', 'success')
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      await removeJob(numericId)
      showToast('Job deleted', 'success')
      navigate('/app/jobs')
    } catch (e) {
      console.error('Delete failed', e)
      showToast('Failed to delete job', 'error')
    }
  }

  return (
    <div className="job-detail">
      <JobForm
        initial={job}
        cvs={cvs}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
