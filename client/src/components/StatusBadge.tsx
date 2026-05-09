import type { JobStatus } from '../types'
import { STATUS_COLORS } from '../utils/statusColors'

export function StatusBadge({ status }: { status: JobStatus }) {
  const colors = STATUS_COLORS[status]
  return (
    <span
      className="status-badge"
      style={{ background: colors.bg, color: colors.color }}
    >
      {status}
    </span>
  )
}
