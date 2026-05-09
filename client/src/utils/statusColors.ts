import type { JobStatus } from '../types'

export const STATUS_COLORS: Record<JobStatus, { bg: string; color: string }> = {
  applied:   { bg: '#1e2a4a', color: '#4f8ef7' },
  interview: { bg: '#2a1f3d', color: '#c4b5fd' },
  offer:     { bg: '#1a2e1a', color: '#a6e3a1' },
  rejected:  { bg: '#2e1a1a', color: '#f38ba8' },
  saved:     { bg: '#2e2a1a', color: '#f9e2af' },
}
