import { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hobbies } from '../../lib/data'
import { SECTION_IDS } from '../../lib/constants'
import { fadeSlide, staggerContainer } from '../../animations/motionVariants'

const gamingStoryFavorites = [
  'Elden Ring',
  'Prince of Persia (whole series)',
  'God of War series',
  'Spider-Man series',
  'Call of Duty series (especially COD 2 & MW2)',
]

const gamingFpsFavorites = [
  'Valorant',
  'CS2 and CS:GO',
  'Battlefield',
  'Warzone',
  'PUBG PC',
]

const uxFocusAreas = [
  'Typography hierarchy and spacing rhythm',
  'Navigation clarity and task-first flows',
  'Motion that improves understanding',
  'Dark theme readability and contrast balance',
]

const creativeBuildTypes = [
  'Experimental landing pages with custom interactions',
  'Canvas/WebGL visual concepts and particle scenes',
  'Micro-product ideas with polished UI systems',
  'Game-inspired interface prototypes',
]

function Icon({ name }) {
  const common = 'h-6 w-6 text-[color:var(--section-accent-soft)]'
  if (name === 'gamepad') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 11h4M8 9v4" strokeLinecap="round" />
        <path d="M15 12h.01M18 10h.01M18 14h.01" strokeLinecap="round" />
        <rect x="2" y="6" width="20" height="12" rx="4" />
      </svg>
    )
  }
  if (name === 'layout') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.8 5.5H19l-4.5 3.3 1.7 5.2L12 15.8 7.8 13.9l1.7-5.2L5 8.5h5.2L12 3z" strokeLinejoin="round" />
    </svg>
  )
}

function HobbiesComponent() {
  const [expandedCard, setExpandedCard] = useState(null)

  return (
    <section
      id={SECTION_IDS.hobbies}
      className="theme-hobbies relative px-4 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="section-shell max-w-2xl p-7 sm:p-8">
          <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em]">Beyond the code</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
            Personality & play
          </h2>
        </div>

        <motion.div
          data-reveal
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-12 grid items-start gap-5 md:grid-cols-3"
        >
          {hobbies.map((h) => {
            const isGaming = h.title.toLowerCase() === 'gaming'
            const isUx = h.title.toLowerCase() === 'ui/ux craft'
            const isCreative = h.title.toLowerCase() === 'creative builds'
            const isExpandable = isGaming || isUx || isCreative
            const isExpanded = expandedCard === h.title

            return (
            <motion.article
              key={h.title}
              variants={fadeSlide}
              onMouseEnter={() => {
                if (isExpandable) setExpandedCard(h.title)
              }}
              onMouseLeave={() => {
                setExpandedCard((prev) => (prev === h.title ? null : prev))
              }}
              onFocusCapture={() => {
                if (isExpandable) setExpandedCard(h.title)
              }}
              onBlurCapture={() => {
                setExpandedCard((prev) => (prev === h.title ? null : prev))
              }}
              tabIndex={isExpandable ? 0 : undefined}
              whileHover={{
                y: -6,
                boxShadow:
                  '0 28px 90px rgba(0,0,0,0.55), 0 0 0 1px rgb(var(--section-accent-rgb) / 0.26)',
              }}
              className="glass self-start flex flex-col gap-4 rounded-3xl p-6 transition-colors duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Icon name={h.icon} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-strong)]">{h.title}</h3>
              <p className="readable-copy text-sm leading-relaxed">{h.copy}</p>

              <AnimatePresence initial={false}>
                {(isGaming || isUx || isCreative) && isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-white/10 pt-4"
                  >
                    {isGaming ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--section-accent-soft)]">
                          Favorite story mode games
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                          {gamingStoryFavorites.join(' • ')}
                        </p>

                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--section-accent-soft)]">
                          FPS games
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                          {gamingFpsFavorites.join(' • ')}
                        </p>
                      </>
                    ) : null}

                    {isUx ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--section-accent-soft)]">
                          What I refine most
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                          {uxFocusAreas.join(' • ')}
                        </p>
                      </>
                    ) : null}

                    {isCreative ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--section-accent-soft)]">
                          Build directions I enjoy
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                          {creativeBuildTypes.join(' • ')}
                        </p>
                      </>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export const Hobbies = memo(HobbiesComponent)
