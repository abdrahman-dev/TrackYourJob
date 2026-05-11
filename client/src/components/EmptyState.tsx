import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  art?: string
  message: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
}

const DEFAULT_ART = `  ╔═══════╗
  ║  ▼ ▼  ║
  ║  ···   ║
  ╚═══╤═══╝
     ──┴──`

export function EmptyState({ art, message, subtitle, actionLabel, actionTo }: EmptyStateProps) {
  const navigate = useNavigate()

  return (
    <div className="empty-state">
      <div className="empty-state-art">{art ?? DEFAULT_ART}</div>
      <div className="empty-state-text">{message}</div>
      {subtitle && <div className="empty-state-subtitle">{subtitle}</div>}
      {actionLabel && actionTo && (
        <button className="empty-state-btn" onClick={() => navigate(actionTo)}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
