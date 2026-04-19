import { memo, useEffect, useRef } from 'react'
import {
  computeContainRect,
  disintegrationPhase,
  particleOffset,
  sampleParticlesFromImage,
} from '../animations/disintegration'
import { clamp01, smoothstep } from '../animations/starfield'

function ParticleCanvasComponent({ imageSrc, wrapRef, progressRef }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef(null)
  const imgRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const img = new Image()
    img.decoding = 'async'
    img.src = imageSrc
    img.onload = () => {
      particlesRef.current = sampleParticlesFromImage(img, 5, 560)
      imgRef.current = img
    }
  }, [imageSrc])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef?.current
    if (!canvas || !wrap) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

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

    const drawSpark = (px, py, pr, r, g, b, alpha) => {
      ctx.globalAlpha = alpha
      const g2 = ctx.createRadialGradient(px, py, 0, px, py, pr * 2.4)
      g2.addColorStop(0, `rgba(${Math.floor(r * 255)},${Math.floor(g * 255)},${Math.floor(b * 255)},${alpha})`)
      g2.addColorStop(0.4, `rgba(160,170,255,${alpha * 0.45})`)
      g2.addColorStop(1, 'rgba(80,100,200,0)')
      ctx.fillStyle = g2
      ctx.beginPath()
      ctx.arc(px, py, pr * 2.2, 0, Math.PI * 2)
      ctx.fill()
    }

    const tick = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      const p = progressRef?.current?.p ?? 0
      const d = disintegrationPhase(p, 0.28, 0.72)
      const img = imgRef.current
      const parts = particlesRef.current

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      if (parts?.length && img?.complete && img.naturalWidth) {
        const rect = computeContainRect(img.naturalWidth, img.naturalHeight, w, h)
        const fadeIn = smoothstep(0.28, 0.38, p)
        const fadeOut = 1 - smoothstep(0.62, 0.82, p)
        const partAlpha = fadeIn * fadeOut

        for (let i = 0; i < parts.length; i++) {
          const pt = parts[i]
          const px = rect.x + pt.nx * rect.w
          const py = rect.y + pt.ny * rect.h
          const off = particleOffset(pt.nx, pt.ny, pt.seed + i, d)
          const jitter = (Math.sin(pt.seed * 12 + d * 8) * 6 + Math.cos(pt.seed * 7 + d * 5) * 4) * d
          const x = px + off.ox + jitter * d
          const y = py + off.oy
          const base = 0.85 + d * 0.9
          const alpha = partAlpha * (0.2 + d * 0.75) * pt.a * base * (1 - d * 0.35)
          const pr = (1.2 + d * 2.4) * (0.45 + pt.a * 0.55)
          drawSpark(x, y, pr, pt.r * 0.92 + 0.08, pt.g * 0.92 + 0.1, Math.min(1, pt.b * 1.05 + 0.12), clamp01(alpha))
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [wrapRef, progressRef])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden
    />
  )
}

export const ParticleCanvas = memo(ParticleCanvasComponent)
