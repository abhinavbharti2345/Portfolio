import { memo, useEffect, useRef } from 'react'

function SpaceBackgroundComponent() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let raf = 0
    let width = 0
    let height = 0

    const stars = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = width < 900 ? 150 : 240
      stars.length = 0
      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.15,
          speed: Math.random() * 0.28 + 0.04,
          alpha: Math.random() * 0.55 + 0.25,
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = '#0b0f1a'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = 'rgba(244,234,224,0.85)'
      for (const star of stars) {
        ctx.globalAlpha = star.alpha
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }
      }

      ctx.globalAlpha = 1

      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0.38, 'transparent')
      gradient.addColorStop(0.5, 'rgba(209,179,139,0.09)')
      gradient.addColorStop(0.62, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden />
}

export const SpaceBackground = memo(SpaceBackgroundComponent)
