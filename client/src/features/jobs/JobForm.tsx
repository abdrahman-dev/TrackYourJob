import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Job, JobStatus, CV } from '../../types'

interface JobFormProps {
  initial?: Job
  cvs: CV[]
  onSave: (data: Omit<Job, 'id' | 'created_at'>) => Promise<void>
  onDelete?: () => void
}

export function JobForm({ initial, cvs, onSave, onDelete }: JobFormProps) {
  const navigate = useNavigate()
  const [company, setCompany] = useState(initial?.company ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [jobUrl, setJobUrl] = useState(initial?.job_url ?? '')
  const [dateApplied, setDateApplied] = useState(
    initial?.date_applied ? initial.date_applied.split('T')[0] : new Date().toISOString().split('T')[0]
  )
  const [status, setStatus] = useState<JobStatus>(initial?.status ?? 'applied')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [coverLetterUsed, setCoverLetterUsed] = useState(initial?.cover_letter_used ?? false)
  const [coverLetterText, setCoverLetterText] = useState(initial?.cover_letter_text ?? '')
  const [cvId, setCvId] = useState<number | undefined>(initial?.cv_id)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const errs: Record<string, boolean> = {}
    if (!company.trim()) errs.company = true
    if (!role.trim()) errs.role = true
    if (!dateApplied.trim()) errs.dateApplied = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      await onSave({
        company: company.trim(),
        role: role.trim(),
        location: location.trim() || undefined,
        job_url: jobUrl.trim() || undefined,
        date_applied: new Date(dateApplied).toISOString(),
        status,
        notes: notes.trim() || undefined,
        cover_letter_used: coverLetterUsed,
        cover_letter_text: coverLetterUsed ? (coverLetterText.trim() || undefined) : undefined,
        cv_id: cvId,
      })
    } catch (e) {
      console.error('Save failed', e)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (initial?.id) {
      navigate(`/app/jobs/${initial.id}`)
    } else {
      navigate('/app/jobs')
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div className="job-form-group">
        <label className="job-form-label">Company *</label>
        <input
          className={`job-form-input${errors.company ? ' job-form-error' : ''}`}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
        />
        {errors.company && <div className="job-form-error-msg">Company is required</div>}
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Role *</label>
        <input
          className={`job-form-input${errors.role ? ' job-form-error' : ''}`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role title"
        />
        {errors.role && <div className="job-form-error-msg">Role is required</div>}
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Location</label>
        <input
          className="job-form-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Optional location"
        />
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Job URL</label>
        <input
          className="job-form-input"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Date Applied *</label>
        <input
          type="date"
          className={`job-form-input${errors.dateApplied ? ' job-form-error' : ''}`}
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />
        {errors.dateApplied && <div className="job-form-error-msg">Date is required</div>}
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Status</label>
        <select
          className="job-form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as JobStatus)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="saved">Saved</option>
        </select>
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Notes</label>
        <textarea
          className="job-form-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes..."
          rows={4}
        />
      </div>

      <div className="job-form-group">
        <label className="job-form-checkbox">
          <input
            type="checkbox"
            checked={coverLetterUsed}
            onChange={(e) => setCoverLetterUsed(e.target.checked)}
          />
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-2)' }}>
            Cover letter used
          </span>
        </label>
      </div>

      {coverLetterUsed && (
        <div className="job-form-group">
          <label className="job-form-label">Cover Letter Text</label>
          <textarea
            className="job-form-textarea"
            value={coverLetterText}
            onChange={(e) => setCoverLetterText(e.target.value)}
            placeholder="Paste cover letter text..."
            rows={5}
          />
        </div>
      )}

      <div className="job-form-group">
        <label className="job-form-label">CV</label>
        <select
          className="job-form-select"
          value={cvId ?? ''}
          onChange={(e) => setCvId(e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">None</option>
          {cvs.map((cv) => (
            <option key={cv.id} value={cv.id}>{cv.label}</option>
          ))}
        </select>
      </div>

      <div className="job-form-actions">
        <button type="button" className="job-form-cancel" onClick={handleCancel}>
          ✕ CANCEL
        </button>
        <button type="submit" disabled={saving} style={{ background: 'var(--accent)', color: '#0b0c10', fontWeight: 700, border: '2px solid var(--accent)' }}>
          {saving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
        {onDelete && (
          <button type="button" className="job-form-delete" onClick={onDelete}>
            DELETE JOB
          </button>
        )}
      </div>
    </form>
  )
}
