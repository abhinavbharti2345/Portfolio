/** Deep space base (hero background). */
export const HERO_SPACE_BG = '#05070d'

/** Deterministic pseudo-random in [0, 1). */
export function hash01(i, seed = 0) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Spiral / curved stream sample in normalized [0,1]², depth z in [0,1].
 * @param {number} i - index 0..count-1
 * @param {number} count
 */
export function flowStarPoint(i, count) {
  const t = i / Math.max(1, count - 1)
  const spiral = t * Math.PI * 2.2 + 0.4
  const radius = 0.08 + t * 0.42
  const x = 0.5 + Math.cos(spiral) * radius * 1.15 + (hash01(i, 3) - 0.5) * 0.04
  const y = 0.42 + Math.sin(spiral) * radius * 0.55 + (hash01(i, 7) - 0.5) * 0.05
  const z = 0.15 + t * 0.85
  const size = 0.4 + z * 1.25 + (hash01(i, 11) - 0.5) * 0.35
  const twinkle = hash01(i, 13) * Math.PI * 2
  const drift = hash01(i, 17) * 0.6 + 0.2
  return { x, y, z, size, twinkle, drift }
}

/** Scattered field stars (far / mid). */
export function fieldStarPoint(i) {
  const x = hash01(i, 19)
  const y = hash01(i, 23)
  const z = Math.pow(hash01(i, 29), 1.6) * 0.95 + 0.05
  const size = 0.25 + (1 - z) * 0.9 + (hash01(i, 31) - 0.5) * 0.2
  const twinkle = hash01(i, 37) * Math.PI * 2
  const drift = hash01(i, 41) * 0.5 + 0.15
  return { x, y, z, size, twinkle, drift }
}

export function clamp01(v) {
  return Math.min(1, Math.max(0, v))
}

export function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}
