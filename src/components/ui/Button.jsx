import { forwardRef, memo, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MotionButton = motion.button
const MotionA = motion.a

const magneticSpring = { stiffness: 220, damping: 18, mass: 0.35 }

export const Button = memo(
  forwardRef(function Button(
    {
      className = '',
      variant = 'primary',
      children,
      href,
      magnetic = false,
      ...props
    },
    ref,
  ) {
    const wrapRef = useRef(null)
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const sx = useSpring(mx, magneticSpring)
    const sy = useSpring(my, magneticSpring)

    const setRefs = useCallback(
      (node) => {
        wrapRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const onMove = useCallback(
      (e) => {
        if (!magnetic || !wrapRef.current) return
        const r = wrapRef.current.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        mx.set((e.clientX - cx) * 0.12)
        my.set((e.clientY - cy) * 0.12)
      },
      [magnetic, mx, my],
    )

    const onLeave = useCallback(() => {
      mx.set(0)
      my.set(0)
    }, [mx, my])

    const base =
      'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--section-accent-rgb)/0.78)]'

    const variants = {
      primary:
        'border border-white/10 bg-[#1f2937]/88 text-[var(--text-strong)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] hover:border-[rgb(var(--section-accent-rgb)/0.5)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_12px_28px_rgb(var(--section-accent-rgb)/0.2)]',
      ghost:
        'border border-white/8 bg-[#1f2937]/40 text-[var(--text-soft)] shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:border-[rgb(var(--section-accent-rgb)/0.38)] hover:text-[var(--text-strong)] hover:shadow-[0_10px_24px_rgb(var(--section-accent-rgb)/0.16)]',
    }

    const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`

    const motionProps = {
      whileHover: { scale: 1.03, y: -2 },
      whileTap: { scale: 0.97 },
      transition: { type: 'spring', stiffness: 400, damping: 22 },
      className: cls,
      ...(magnetic
        ? {
            onPointerMove: onMove,
            onPointerLeave: onLeave,
            style: { x: sx, y: sy },
          }
        : {}),
      ...props,
      ref: setRefs,
    }

    if (href) {
      return (
        <MotionA href={href} {...motionProps}>
          <span className="relative z-10">{children}</span>
        </MotionA>
      )
    }

    return (
      <MotionButton type="button" {...motionProps}>
        <span className="relative z-10">{children}</span>
      </MotionButton>
    )
  }),
)

Button.displayName = 'Button'
