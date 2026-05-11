import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

function getAccentColor(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4f8ef7'
}

function initParticles(w: number, h: number, count: number, minOpacity: number, maxOpacity: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 1.5 + Math.random() * 2,
      opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
    })
  }
  return particles
}

export function AnimatedBackground({ theme, hasSidebar = true, intensity = 'normal' }: { theme: string; hasSidebar?: boolean; intensity?: 'normal' | 'high' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const accentRef = useRef<string>('#4f8ef7')
  const isHigh = intensity === 'high'

  useEffect(() => {
    accentRef.current = getAccentColor()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sidebarOffset = hasSidebar ? 220 : 0
    const count = isHigh ? 45 : 35
    const minOpacity = isHigh ? 0.18 : 0.12
    const maxOpacity = isHigh ? 0.30 : 0.22

    const resize = () => {
      canvas.width = window.innerWidth - sidebarOffset
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height, count, minOpacity, maxOpacity)
    }

    resize()
    window.addEventListener('resize', resize)

    let running = true

    const loop = () => {
      if (!running) return
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const color = accentRef.current

      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [hasSidebar, isHigh])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: hasSidebar ? 220 : 0,
        width: hasSidebar ? 'calc(100vw - 220px)' : '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
