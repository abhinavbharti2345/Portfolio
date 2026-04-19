import { memo, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SECTION_IDS } from '../../lib/constants'

const links = [
  { id: SECTION_IDS.about, label: 'About' },
  { id: SECTION_IDS.projects, label: 'Projects' },
  { id: SECTION_IDS.skills, label: 'Skills' },
  { id: SECTION_IDS.hobbies, label: 'Life' },
  { id: SECTION_IDS.contact, label: 'Connect' },
]

const navIds = ['top', ...links.map((l) => l.id)]

function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')

  const handleLogoClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = window.__portfolioLenis

    if (lenis && !prefersReduced) {
      lenis.stop?.()
      lenis.scrollTo(0, {
        duration: 0.62,
        easing: (t) => 1 - (1 - t) ** 3,
        lock: true,
        force: true,
        onComplete: () => lenis.start?.(),
      })
      return
    }

    const behavior = prefersReduced ? 'auto' : 'smooth'
    document.documentElement.scrollTo({ top: 0, behavior })
    window.scrollTo({ top: 0, left: 0, behavior })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (y < 96) setActive('top')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = navIds
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement)

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      { root: null, rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.08, 0.2, 0.35, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.dataset.section = active
  }, [active])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'surface-divider bg-[#111827]/62 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-lg'
            : 'border-white/[0.08] bg-[#111827]/48 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-lg'
        }`}
      >
        <motion.button
          type="button"
          onClick={handleLogoClick}
          whileTap={{ scale: 0.985 }}
          aria-label="Scroll to top"
          className="group cursor-pointer text-sm font-semibold tracking-tight text-[var(--text-strong)] transition-opacity duration-300 hover:opacity-70"
        >
          AB<span className="text-[rgb(var(--section-accent-rgb))] transition-colors duration-300">.</span>
        </motion.button>
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`group relative rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                    isActive ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)] hover:text-[var(--text-soft)]'
                  }`}
                >
                  {l.label}
                  {!isActive ? (
                    <span className="pointer-events-none absolute inset-x-3 bottom-1.5 z-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[rgb(var(--section-accent-rgb))] to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                  ) : (
                    <motion.span
                      layoutId="nav-active-line"
                      className="absolute inset-x-2 bottom-1.5 z-0 h-[2px] rounded-full bg-[rgb(var(--section-accent-rgb))] shadow-[0_0_16px_rgb(var(--section-accent-rgb)/0.52)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
        <a
          href={`#${SECTION_IDS.contact}`}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-[rgb(var(--section-accent-rgb)/0.55)] hover:text-white md:hidden"
        >
          Connect
        </a>
      </nav>
    </motion.header>
  )
}

export const Navbar = memo(NavbarComponent)
