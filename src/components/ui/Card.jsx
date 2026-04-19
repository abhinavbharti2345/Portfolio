import { memo, useCallback, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

const spring = { stiffness: 280, damping: 22, mass: 0.35 }

function CardComponent({ className = '', children, enableTilt = true, ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const smx = useSpring(mx, spring)
  const smy = useSpring(my, spring)
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const glow = useMotionTemplate`radial-gradient(420px circle at ${smx} ${smy}, rgb(var(--section-accent-rgb) / 0.2), transparent 62%)`

  const onMove = useCallback(
    (e) => {
      if (!enableTilt || !ref.current) return
      const r = ref.current.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      mx.set(px)
      my.set(py)
      rotateY.set((px - 0.5) * 11)
      rotateX.set((0.5 - py) * 11)
    },
    [enableTilt, mx, my, rotateX, rotateY],
  )

  const onLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    mx.set(0.5)
    my.set(0.5)
  }, [mx, my, rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-[#1f2937]/70 shadow-[0_10px_28px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.04)_inset] ${className}`}
      {...rest}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export const Card = memo(CardComponent)
