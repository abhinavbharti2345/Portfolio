import { clamp01 } from './starfield'

/** Map scroll progress into disintegration phase [0, 1] between start/end. */
export function disintegrationPhase(progress, start = 0.3, end = 0.7) {
  return clamp01((progress - start) / (end - start))
}

/**
 * Object-fit contain rect for image inside box.
 * @returns {{ x: number, y: number, w: number, h: number }}
 */
export function computeContainRect(nw, nh, cw, ch) {
  if (nw <= 0 || nh <= 0 || cw <= 0 || ch <= 0) {
    return { x: 0, y: 0, w: cw, h: ch }
  }
  const ir = nw / nh
  const cr = cw / ch
  let w
  let h
  if (ir > cr) {
    w = cw
    h = cw / ir
  } else {
    h = ch
    w = ch * ir
  }
  const x = (cw - w) / 2
  const y = ch - h
  return { x, y, w, h }
}

/**
 * Sample pixel colors into particles (max ~600).
 * @param {HTMLImageElement} img
 * @param {number} stride - pixel skip
 */
export function sampleParticlesFromImage(img, stride = 5, maxPoints = 560) {
  const nw = img.naturalWidth || img.width
  const nh = img.naturalHeight || img.height
  if (!nw || !nh) return []

  const c = document.createElement('canvas')
  c.width = Math.min(320, nw)
  c.height = Math.min(400, nh)
  const ctx = c.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, c.width, c.height)
  const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height)

  const out = []
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      if (out.length >= maxPoints) return out
      const i = (y * width + x) * 4
      const a = data[i + 3] / 255
      if (a < 0.12) continue
      const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
      if (lum < 0.04 && a < 0.35) continue
      const nx = (x + 0.5) / width
      const ny = (y + 0.5) / height
      out.push({
        nx,
        ny,
        r: data[i] / 255,
        g: data[i + 1] / 255,
        b: data[i + 2] / 255,
        a,
        seed: out.length * 1.618,
      })
    }
  }
  return out
}

/** Velocity bias: mostly upward with slight outward spiral. */
export function particleOffset(px, py, phase, strength) {
  const ang = Math.atan2(py - 0.85, px - 0.5) + phase * 0.02
  const lift = -1.15 - (1 - py) * 0.35
  const spread = 0.35 + phase * 0.0015
  const ease = 1 - Math.pow(1 - strength, 1.65)
  return {
    ox: Math.cos(ang) * spread * ease * 420,
    oy: lift * ease * 520 + Math.sin(ang * 0.5) * 40 * ease,
    rot: phase * 0.004 * ease,
  }
}
