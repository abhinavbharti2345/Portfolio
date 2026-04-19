import { memo, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades and lifts the next section in sync with the pinned hero scroll timeline.
 * @param {{ current: HTMLElement | null }} heroSectionRef
 */
function ScrollTransitionComponent({ heroSectionRef, children }) {
  const wrapRef = useRef(null)

  useLayoutEffect(() => {
    const hero = heroSectionRef?.current
    const el = wrapRef.current
    if (!hero || !el) return undefined

    gsap.set(el, { opacity: 0.55, y: 42, willChange: 'transform, opacity' })

    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: '+=135%',
      scrub: 0.9,
        onUpdate(self) {
        const p = self.progress
        const t = gsap.utils.clamp(0, 1, (p - 0.34) / 0.44)
        gsap.set(el, { opacity: 0.55 + t * 0.45, y: 42 * (1 - t) })
      },
    })

    return () => {
      st.kill()
      gsap.set(el, { clearProps: 'opacity,y,willChange' })
    }
  }, [heroSectionRef])

  return (
    <div
      ref={wrapRef}
      className="relative z-[18] bg-transparent"
    >
      {children}
    </div>
  )
}

export const ScrollTransition = memo(ScrollTransitionComponent)
