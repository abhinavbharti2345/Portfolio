import { memo } from 'react'

function GlowEffectComponent({ className = '', children }) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 -z-10 opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklab, #6366f1 42%, transparent), transparent 70%), radial-gradient(closest-side at 70% 30%, color-mix(in oklab, #3b82f6 38%, transparent), transparent 72%)',
        }}
      />
      {children}
    </div>
  )
}

export const GlowEffect = memo(GlowEffectComponent)
