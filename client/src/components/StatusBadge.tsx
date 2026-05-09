import type { JobStatus } from '../types'
import { STATUS_COLORS } from '../utils/statusColors'

export function StatusBadge({ status }: { status: JobStatus }) {
  const colors = STATUS_COLORS[status] ?? { bg: '#1c1d26', color: '#6c7086' }
  return (
    <span
      className="status-badge"
      data-status={status}
      style={{ background: colors.bg, color: colors.color }}
    >
      {status}
    </span>
  )
}
