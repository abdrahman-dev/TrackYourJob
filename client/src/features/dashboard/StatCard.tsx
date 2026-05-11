import { motion } from 'framer-motion'

const ICON_MAP: Record<string, string> = {
  TOTAL: '◈',
  APPLIED: '◧',
  INTERVIEW: '⬡',
  OFFER: '✦',
  REJECTED: '✕',
  SAVED: '⊡',
}

interface StatCardProps {
  label: string
  value: number
  color: string
  index: number
}

export function StatCard({ label, value, color, index }: StatCardProps) {
  return (
    <motion.div
      className="stat-card"
      style={{ '--card-color': color } as React.CSSProperties}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="stat-card-icon">{ICON_MAP[label] ?? '◈'}</span>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </motion.div>
  )
}
