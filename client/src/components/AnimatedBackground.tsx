import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 2,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.06 + Math.random() * 0.09,
    })
  }
  return particles
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(generateParticles(24))
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'var(--accent)',
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
