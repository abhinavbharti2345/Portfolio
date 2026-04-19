import { memo } from 'react'
import { SITE } from '../../lib/constants'

function FooterComponent() {
  return (
    <footer className="surface-divider border-t py-10 text-center text-xs text-[var(--text-muted)]">
      <p>
        © {new Date().getFullYear()} {SITE.name}. Crafted with intent.
      </p>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
