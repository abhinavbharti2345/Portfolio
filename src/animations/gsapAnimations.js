import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSectionReveal(root = document) {
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    })
  }, root)

  return () => ctx.revert()
}

export function initParallaxLayers(root = document) {
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0.12
      gsap.to(el, {
        yPercent: -8 * speed * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scrub: 1.1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
    })
  }, root)

  return () => ctx.revert()
}
