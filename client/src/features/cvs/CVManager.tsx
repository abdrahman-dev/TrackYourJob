import { useState, useRef, useCallback } from 'react'
import { CVCard } from './CVCard'
import { EmptyState } from '../../components/EmptyState'
import { useCVs } from '../../hooks/useCVs'
import { useToast } from '../../hooks/useToast'
import { createCV, removeCV } from '../../api/cvs'
import type { CV } from '../../types'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export function CVManager() {
  const { cvs, loading, refresh } = useCVs()
  const { showToast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [label, setLabel] = useState('')
  const [isGeneral, setIsGeneral] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      return 'Invalid file type. Only PDF and DOCX are allowed.'
    }
    if (f.size > MAX_SIZE) {
      return 'File too large. Maximum size is 10MB.'
    }
    return null
  }

  const handleFileSelect = useCallback((f: File) => {
    const err = validateFile(f)
    if (err) {
      showToast(err, 'error')
      return
    }
    setFile(f)
  }, [showToast])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFileSelect(f)
  }, [handleFileSelect])

  const handleUpload = async () => {
    if (!file || !label.trim()) {
      showToast('Please select a file and enter a label', 'error')
      return
    }

    setUploading(true)
    try {
      const buffer = await file.arrayBuffer()
      const cvData: Omit<CV, 'id'> = {
        label: label.trim(),
        file_name: file.name,
        file_data: buffer,
        file_type: file.type,
        is_general: isGeneral,
        created_at: new Date().toISOString(),
      }
      await createCV(cvData)
      showToast('CV uploaded successfully', 'success')
      setFile(null)
      setLabel('')
      setIsGeneral(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
      refresh()
    } catch (e) {
      console.error('Upload failed', e)
      showToast('Failed to upload CV', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await removeCV(id)
      showToast('CV deleted', 'success')
      refresh()
    } catch (e) {
      console.error('Delete failed', e)
      showToast('Failed to delete CV', 'error')
    }
  }

  if (loading) {
    return <div className="cvs-page"><div className="empty-state-text">Loading...</div></div>
  }

  return (
    <div className="cvs-page">
      <div className="cvs-upload">
        <div className="cvs-upload-title">UPLOAD CV</div>

        <div
          className={`cvs-dropzone${dragOver ? ' drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="cvs-dropzone-text">
            {file ? file.name : 'Drop a file here or click to browse'}
          </div>
          <div className="cvs-dropzone-hint">Accepted: PDF, DOCX — Max 10MB</div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFileSelect(f)
            }}
          />
        </div>

        <div className="cvs-form-row">
          <input
            className="cvs-label-input"
            placeholder="CV label (e.g. Software Engineer Resume)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <label className="cvs-checkbox">
            <input
              type="checkbox"
              checked={isGeneral}
              onChange={(e) => setIsGeneral(e.target.checked)}
            />
            General
          </label>
          <button
            className="cvs-upload-btn"
            onClick={handleUpload}
            disabled={uploading || !file || !label.trim()}
          >
            {uploading ? 'UPLOADING...' : 'UPLOAD'}
          </button>
        </div>
      </div>

      {cvs.length === 0 ? (
        <EmptyState message="NO CVs UPLOADED YET" />
      ) : (
        <div className="cvs-list">
          {cvs.map((cv, i) => (
            <CVCard key={cv.id} cv={cv} onDelete={handleDelete} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
