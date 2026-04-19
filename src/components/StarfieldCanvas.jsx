import { memo, useEffect, useRef } from 'react'
import {
  HERO_SPACE_BG,
  fieldStarPoint,
  flowStarPoint,
  hash01,
} from '../animations/starfield'

const FLOW = 280
const FIELD = 420

function drawStar(ctx, px, py, pr, alpha, blur) {
  ctx.globalAlpha = alpha
  const g = ctx.createRadialGradient(px, py, 0, px, py, pr * (blur ? 2.2 : 1.4))
  g.addColorStop(0, `rgba(230,240,255,${0.95 * alpha})`)
  g.addColorStop(0.35, `rgba(180,200,255,${0.45 * alpha})`)
  g.addColorStop(1, 'rgba(80,120,200,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(px, py, pr * (blur ? 2.4 : 1.6), 0, Math.PI * 2)
  ctx.fill()
}

function StarfieldCanvasComponent({ className = '', progressRef, mouseRef }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return undefined

    const flow = Array.from({ length: FLOW }, (_, i) => flowStarPoint(i, FLOW))
    const field = Array.from({ length: FIELD }, (_, i) => fieldStarPoint(i))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const tick = (t) => {
      timeRef.current = t * 0.001
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      const pr = progressRef?.current?.p ?? 0
      const mx = mouseRef?.current?.x ?? 0
      const my = mouseRef?.current?.y ?? 0
      const driftX = mx * 14
      const driftY = my * 10
      const intensity = 1 + pr * 0.22

      ctx.fillStyle = HERO_SPACE_BG
      ctx.fillRect(0, 0, w, h)

      // Minimal nebula (very subtle)
      const ng = ctx.createRadialGradient(
        w * 0.35 + driftX * 0.3,
        h * 0.55 + driftY * 0.2,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.55,
      )
      ng.addColorStop(0, `rgba(55,65,120,${0.035 + pr * 0.025})`)
      ng.addColorStop(0.45, `rgba(30,40,80,${0.02 + pr * 0.015})`)
      ng.addColorStop(1, 'rgba(5,7,13,0)')
      ctx.fillStyle = ng
      ctx.fillRect(0, 0, w, h)

      const tw = timeRef.current

      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < field.length; i++) {
        const s = field[i]
        const ox = (hash01(i, 101) - 0.5) * 6
        const oy = (hash01(i, 107) - 0.5) * 4
        const px = s.x * w + ox + driftX * (0.08 + s.z * 0.12)
        const py = s.y * h + oy + driftY * (0.06 + s.z * 0.1)
        const twk = 0.65 + Math.sin(tw * s.drift + s.twinkle) * 0.35
        const alpha = (0.08 + (1 - s.z) * 0.35) * twk * intensity
        const pr = s.size * (0.6 + (1 - s.z) * 0.9)
        drawStar(ctx, px, py, pr, alpha, false)
      }

      for (let i = 0; i < flow.length; i++) {
        const s = flow[i]
        const path = tw * 0.018 * (0.5 + s.drift)
        const px =
          s.x * w +
          Math.sin(path + s.twinkle) * (12 + s.z * 18) +
          driftX * (0.1 + s.z * 0.14)
        const py =
          s.y * h +
          Math.cos(path * 0.85 + s.twinkle * 0.5) * (8 + s.z * 12) +
          driftY * (0.08 + s.z * 0.1)
        const twk = 0.55 + Math.sin(tw * s.drift * 1.2 + s.twinkle) * 0.45
        const alpha = (0.12 + s.z * 0.42) * twk * intensity
        const pr = s.size * (0.55 + s.z * 0.85)
        drawStar(ctx, px, py, pr, alpha, true)
      }

      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [progressRef, mouseRef])

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  )
}

export const StarfieldCanvas = memo(StarfieldCanvasComponent)
