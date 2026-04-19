import { memo } from 'react'
import { motion } from 'framer-motion'
import { languages, highlights } from '../../lib/data'
import { SECTION_IDS } from '../../lib/constants'
import { fadeSlide, staggerContainer } from '../../animations/motionVariants'

function Bar({ name, level }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-zinc-300">
        <span className="font-medium">{name}</span>
        <span className="text-xs tabular-nums text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-inset ring-white/10">
        <motion.div
          className="h-full rounded-full bg-[rgb(var(--section-accent-rgb))]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function SkillsComponent() {
  return (
    <section
      id={SECTION_IDS.skills}
      className="theme-skills relative px-4 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="section-shell max-w-2xl p-7 sm:p-8">
          <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em]">Skills</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
            Languages & craft
          </h2>
          <p className="readable-copy mt-4 text-base">
            Depth where it matters—motion, typography, and systems—without losing the full stack view.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-12%' }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Languages</h3>
            <div className="mt-8 space-y-7">
              {languages.map((lang) => (
                <motion.div key={lang.name} variants={fadeSlide}>
                  <Bar {...lang} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-12%' }}
            className="space-y-4"
          >
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={fadeSlide}
                whileHover={{ y: -3, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-transparent p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-7"
              >
                <h3 className="text-lg font-semibold text-[var(--text-strong)]">{h.title}</h3>
                <p className="readable-copy mt-3 text-sm leading-relaxed">{h.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const Skills = memo(SkillsComponent)
