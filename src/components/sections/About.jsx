import { memo } from 'react'
import { motion } from 'framer-motion'
import { aboutCopy } from '../../lib/data'
import { fadeSlide, staggerContainer } from '../../animations/motionVariants'
import { SECTION_IDS } from '../../lib/constants'

function AboutComponent() {
  return (
    <section
      id={SECTION_IDS.about}
      className="theme-about relative flex min-h-[100svh] items-center px-4 py-[clamp(4.5rem,9vh,7.5rem)] sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-12%' }}
          className="about-panel grid min-h-[62vh] w-full gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12 lg:p-12"
        >
          <motion.div variants={fadeSlide}>
            <p className="section-kicker text-xs font-medium uppercase tracking-[0.28em]">About</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
              {aboutCopy.headline}
            </h2>
            <div className="mt-4 space-y-1.5">
              <p className="text-sm font-medium text-[var(--text-strong)]">{aboutCopy.education.institution}</p>
              <p className="text-sm font-medium text-[var(--section-accent-soft)]">{aboutCopy.education.program}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeSlide} className="readable-copy space-y-6 text-base leading-relaxed">
            {aboutCopy.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export const About = memo(AboutComponent)
