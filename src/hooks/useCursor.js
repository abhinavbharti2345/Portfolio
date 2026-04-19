import { useEffect, useRef, useState } from 'react'

function getFinePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

export function useCursor() {
  const follower = useRef(null)
  const [enabled, setEnabled] = useState(getFinePointer)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const el = follower.current
    if (!el) return

    let frame
    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  return { followerRef: follower, enabled }
}
