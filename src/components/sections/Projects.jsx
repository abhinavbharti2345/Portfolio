import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { projects } from '../../lib/data'
import { SECTION_IDS } from '../../lib/constants'
import { modalBackdrop, modalPanel } from '../../animations/motionVariants'

function ProjectCard({ project, onOpen }) {
  return (
    <Card
      className={`cursor-pointer border border-white/8 bg-[#1f2937]/78 p-6 transition-[transform,box-shadow,border-color,background-color] duration-400 hover:-translate-y-1 sm:p-8`}
      whileHover={{
        y: -4,
        boxShadow:
          '0 14px 32px rgba(0,0,0,0.3), 0 0 0 1px rgb(var(--section-accent-rgb) / 0.28)',
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(project)
        }
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]"
      />
      <div className="relative flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-strong)]">{project.name}</h3>
          <p className="readable-copy mt-2 text-sm">{project.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-[#111827]/55 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--text-soft)]"
            >
              {t}
            </li>
          ))}
        </ul>
        <span className="section-kicker text-xs font-medium">Open detail →</span>
      </div>
    </Card>
  )
}

const MemoProjectCard = memo(ProjectCard)

function ProjectsComponent() {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, close])

  const list = useMemo(() => projects, [])

  return (
    <section
      id={SECTION_IDS.projects}
      className="theme-projects relative px-4 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="section-shell max-w-2xl p-7 sm:p-8">
          <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em]">Selected work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
            Projects with depth
          </h2>
          <p className="readable-copy mt-4 text-base">
            Product-minded builds—glass layers, motion, and calm hierarchy. Tap a card to expand.
          </p>
        </div>

        <div className="perspective-[1400px] mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-2">
          {list.map((p) => (
            <MemoProjectCard key={p.id} project={p} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/65 p-4 backdrop-blur-md sm:items-center"
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={close}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              className="relative z-[61] w-full max-w-lg rounded-3xl glass-strong p-6 shadow-[0_20px_52px_rgba(0,0,0,0.4)] sm:p-8"
              variants={modalPanel}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                Close
              </button>
              <p className="section-kicker text-xs font-medium uppercase tracking-[0.22em]">Case study</p>
              <h3 id="project-title" className="mt-3 text-2xl font-semibold text-[var(--text-strong)]">
                {active.name}
              </h3>
              <p className="readable-copy mt-2 text-sm">{active.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-200">{active.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-medium text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {active.liveUrl ? (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-strong)] transition duration-300 hover:border-[rgb(var(--section-accent-rgb)/0.55)] hover:bg-[rgb(var(--section-accent-rgb)/0.14)]"
                >
                  {active.ctaLabel || 'Open Live Site'}
                </a>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export const Projects = memo(ProjectsComponent)
