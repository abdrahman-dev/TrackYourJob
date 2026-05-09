import { motion } from 'framer-motion'
import type { CV } from '../../types'
import { formatDate } from '../../utils/formatDate'
import { getCV } from '../../db'

interface CVCardProps {
  cv: CV
  onDelete: (id: number) => void
  index: number
}

export function CVCard({ cv, onDelete, index }: CVCardProps) {
  const handleDownload = async () => {
    const full = await getCV(cv.id!)
    if (!full) return
    const blob = new Blob([full.file_data], { type: full.file_type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = full.file_name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <motion.div
      className={`cv-card${cv.is_general ? ' general' : ''}`}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, delay: index * 0.04 }}
    >
      <div className="cv-card-label">{cv.label}</div>
      <div className="cv-card-file">{cv.file_name}</div>
      {cv.is_general && <span className="cv-card-badge">★ GENERAL</span>}
      <div className="cv-card-date">{formatDate(cv.created_at)}</div>
      <div className="cv-card-actions">
        <button className="cv-card-btn" onClick={handleDownload}>↓ DOWNLOAD</button>
        <button className="cv-card-btn danger" onClick={() => onDelete(cv.id!)}>✕ DELETE</button>
      </div>
    </motion.div>
  )
}
