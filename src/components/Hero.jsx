import {
  forwardRef,
  memo,
  useLayoutEffect,
  useRef,
  lazy,
  Suspense,
} from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from './ui/Button'
import { SECTION_IDS, SITE } from '../lib/constants'
import heroSrc from '../assets/hero.png'
import { smoothstep } from '../animations/starfield'

gsap.registerPlugin(ScrollTrigger)

const ParticleCanvas = lazy(() =>
  import('./ParticleCanvas.jsx').then((m) => ({ default: m.ParticleCanvas })),
)

function ScrollCue() {
  return (
    <motion.a
      href={`#${SECTION_IDS.about}`}
      className="absolute bottom-[min(14vh,140px)] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--text-muted)]">
        Scroll
      </span>
      <span className="relative flex h-10 w-5 justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <motion.span
          className="absolute top-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--section-accent-rgb))] shadow-[0_0_12px_rgb(var(--section-accent-rgb)/0.55)]"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 1.85, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.a>
  )
}

export const Hero = memo(
  forwardRef(function Hero(props, forwardedRef) {
    const rootRef = useRef(null)
    const zoomRef = useRef(null)
    const textRef = useRef(null)
    const imgRef = useRef(null)
    const portraitWrapRef = useRef(null)
    const progressRef = useRef({ p: 0 })

    const setRootRef = (node) => {
      rootRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef && 'current' in forwardedRef) forwardedRef.current = node
    }

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    useLayoutEffect(() => {
      const root = rootRef.current
      const zoom = zoomRef.current
      if (!root || !zoom || reduced) return undefined

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: '+=135%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate(self) {
            const p = self.progress
            progressRef.current.p = p

            gsap.set(zoom, {
              scale: 1 + p * 0.17,
              transformOrigin: '50% 82%',
            })

            if (textRef.current) {
              gsap.set(textRef.current, {
                opacity: 1 - p * 0.42,
                y: -p * 18,
              })
            }

            if (imgRef.current) {
              const op = 1 - smoothstep(0.2, 0.48, p)
              gsap.set(imgRef.current, {
                opacity: op,
                filter: `blur(${p * 4}px)`,
              })
            }
          },
        })
      }, root)

      const t = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        cancelAnimationFrame(t)
        ctx.revert()
      }
    }, [reduced])

    return (
      <section
        ref={setRootRef}
        id="top"
        className="theme-home relative isolate min-h-[100dvh] overflow-visible"
      >
        <div ref={zoomRef} className="relative flex min-h-[100dvh] flex-col will-change-transform">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_65%_46%_at_50%_76%,rgb(var(--section-accent-rgb)/0.08),transparent_74%)]"
          />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-6 pt-24 sm:px-10 sm:pt-28">
            <div
              ref={textRef}
              className="mx-auto w-full max-w-3xl text-center sm:text-left"
              style={reduced ? undefined : { willChange: 'opacity, transform' }}
            >
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="section-kicker mb-3 text-xs font-medium uppercase tracking-[0.28em]"
              >
                Portfolio · 2026
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.55rem]"
              >
                <span className="text-gradient">
                  {SITE.name}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="muted-copy mt-3 text-sm font-medium tracking-[0.14em]"
              >
                {SITE.dob}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="readable-copy mx-auto mt-4 max-w-xl text-base leading-relaxed sm:mx-0 sm:text-lg"
              >
                {SITE.title}
              </motion.p>
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.09, delayChildren: 0.36 },
                  },
                }}
                className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.86, y: 10 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 400, damping: 22 },
                    },
                  }}
                >
                  <Button href={`#${SECTION_IDS.projects}`} magnetic>
                    View work
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.86, y: 10 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 400, damping: 22 },
                    },
                  }}
                >
                  <Button href={`#${SECTION_IDS.contact}`} variant="ghost" magnetic>
                    Let&apos;s connect
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <div className="relative mt-auto flex flex-1 flex-col items-center justify-end pt-10">
              <div
                ref={portraitWrapRef}
                className="relative z-[15] w-[min(100vw,980px)] max-w-[980px] -mb-[min(9vh,74px)] px-1 sm:px-2"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[7%] z-0 h-[min(52vw,300px)] w-[min(76%,360px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(209,179,139,0.2),rgba(209,179,139,0.08)_48%,transparent_74%)] blur-2xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[14%] z-0 h-[min(36vw,200px)] w-[min(66%,300px)] -translate-x-1/2 rounded-full bg-[rgba(209,179,139,0.11)] blur-3xl"
                />

                <div className="relative z-10 [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]">
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -6, 0] }}
                    transition={
                      reduced
                        ? undefined
                        : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <motion.img
                      ref={imgRef}
                      src={heroSrc}
                      alt={SITE.name}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mx-auto block h-auto max-h-[min(90vh,900px)] w-full object-contain object-bottom drop-shadow-[0_24px_58px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                </div>

                <Suspense fallback={null}>
                  <ParticleCanvas
                    imageSrc={heroSrc}
                    wrapRef={portraitWrapRef}
                    progressRef={progressRef}
                  />
                </Suspense>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 left-1/2 z-[12] h-36 w-[84%] -translate-x-1/2 rounded-[100%] bg-[linear-gradient(to_bottom,rgba(11,15,26,0.08),rgba(11,15,26,0.88))] blur-2xl"
                />
              </div>
            </div>
          </div>

          <ScrollCue />
        </div>
      </section>
    )
  }),
)

Hero.displayName = 'Hero'
