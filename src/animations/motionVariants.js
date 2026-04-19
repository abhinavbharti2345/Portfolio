export const fadeSlide = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

export const cardHover = {
  rest: { scale: 1, rotateX: 0, rotateY: 0, z: 0 },
  hover: {
    scale: 1.02,
    z: 12,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
}

export const modalBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const modalPanel = {
  hidden: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    filter: 'blur(8px)',
    transition: { duration: 0.22 },
  },
}
