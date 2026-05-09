import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  art?: string
  message: string
  actionLabel?: string
  actionTo?: string
}

const DEFAULT_ART = `  ╔═══╗
  ║ ▼ ║
  ╚═╤═╝
  ──┴──`

export function EmptyState({ art, message, actionLabel, actionTo }: EmptyStateProps) {
  const navigate = useNavigate()

  return (
    <div className="empty-state">
      <div className="empty-state-art">{art ?? DEFAULT_ART}</div>
      <div className="empty-state-text">{message}</div>
      {actionLabel && actionTo && (
        <button className="empty-state-btn" onClick={() => navigate(actionTo)}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
