import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '../hooks/useToast'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className={`toast ${t.type}`}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => removeToast(t.id)}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
