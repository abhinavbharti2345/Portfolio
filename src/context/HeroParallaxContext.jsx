import { createContext, useContext } from 'react'

/** @type {React.Context<React.MutableRefObject<{ x: number; y: number }> | null>} */
export const HeroParallaxRefContext = createContext(null)

const fallbackParallaxRef = { current: { x: 0, y: 0 } }

export function useHeroParallaxRef() {
  return useContext(HeroParallaxRefContext) ?? fallbackParallaxRef
}
