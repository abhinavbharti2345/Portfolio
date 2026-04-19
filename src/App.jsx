import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import { SpaceBackground } from './components/SpaceBackground'
import { useCursor } from './hooks/useCursor'
import { initParallaxLayers, initSectionReveal } from './animations/gsapAnimations'

export default function App() {
  const { followerRef, enabled } = useCursor()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis
    let tickerFn

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true })
      window.__portfolioLenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tickerFn = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    } else {
      window.__portfolioLenis = null
    }

    const offReveal = initSectionReveal(document.body)
    const offParallax = initParallaxLayers(document.body)

    return () => {
      offReveal()
      offParallax()
      if (tickerFn) gsap.ticker.remove(tickerFn)
      lenis?.destroy()
      window.__portfolioLenis = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {enabled ? (
        <div
          ref={followerRef}
          className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white/15 bg-white/[0.07] shadow-[0_0_48px_rgb(var(--section-accent-rgb)/0.42)] backdrop-blur-[2px] will-change-transform"
          aria-hidden
        />
      ) : null}
      <SpaceBackground />
      <Navbar />
      <main className="relative pb-4">
        <Home />
      </main>
      <Footer />
    </>
  )
}
