export const aboutCopy = {
  headline: 'Curiosity-first builder, from pixels to infrastructure.',
  body: [
    'I enjoy crafting frontend experiences that feel precise and effortless, but I am equally driven by what happens underneath. I love balancing UI/UX polish with backend logic so products are not just beautiful, but dependable and fast.',
    'Outside product work, I spend a lot of time building and tuning home server setups, running Minecraft servers, and automating backup workflows. I regularly experiment with Linux environments, CasaOS, Docker containers, and rclone to make systems cleaner, safer, and easier to manage.',
    'What keeps me motivated is deep exploration: understanding how systems fail, optimizing workflows, and then translating that learning into smoother interfaces and stronger architecture.',
  ],
  education: {
    institution: 'Scaler School of Technology',
    program: 'BS in Computer Science (BITS Pilani) · Class of 2029',
  },
}

export const projects = [
  {
    id: 'synaptiq',
    name: 'Synaptiq (PLIS)',
    tagline: 'AI-powered student productivity system',
    description:
      'An intelligent workspace that helps students plan, focus, and reflect. Combines scheduling, nudges, and lightweight analytics to keep momentum without feeling noisy.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API'],
    liveUrl: 'https://synaptiq-eta.vercel.app/dashboard',
    ctaLabel: 'Open Synaptiq',
    accent: 'from-sky-500/22 to-cyan-500/10',
  },
  {
    id: 'zerix',
    name: 'Zerix',
    tagline: 'Local AI assistant for offline automation',
    description:
      'A privacy-first assistant that runs workflows on-device. Built for repeatable automations, quick commands, and calm defaults—no cloud required for the core loop.',
    stack: ['Python', 'FastAPI', 'Electron', 'SQLite', 'LLM tooling'],
    accent: 'from-blue-500/22 to-cyan-500/12',
  },
  {
    id: 'cage-game',
    name: 'Cage Game',
    tagline: 'Collaborative 2D game experience',
    description:
      'A tight, arcade-inspired 2D game shaped by iteration and pair work. Focus on feel: responsive controls, readable motion, and punchy feedback.',
    stack: ['JavaScript', 'Canvas API', 'Game loop', 'Collaboration'],
    liveUrl: 'https://cage-game.vercel.app/',
    ctaLabel: 'Open Game',
    accent: 'from-cyan-500/24 to-sky-500/12',
  },
  {
    id: 'daily-motivation',
    name: 'Daily Motivation Dashboard',
    tagline: 'Calm dashboard for streaks and rituals',
    description:
      'A minimal dashboard that tracks streaks, surfaces quotes, and keeps daily rituals lightweight. Designed to reward consistency without guilt.',
    stack: ['React', 'Tailwind', 'Charts', 'Local storage'],
    accent: 'from-blue-500/20 to-sky-500/10',
  },
  {
    id: 'task-tracker',
    name: 'Task Tracker',
    tagline: 'Fast capture, clear prioritization',
    description:
      'Opinionated task flow: capture in seconds, triage with keyboard-first UX, and stay in flow with subtle motion—not clutter.',
    stack: ['React', 'Zustand', 'REST', 'Auth'],
    accent: 'from-sky-500/18 to-blue-500/12',
  },
]

export const languages = [
  { name: 'JavaScript', level: 92 },
  { name: 'Java', level: 78 },
  { name: 'Python', level: 85 },
]

export const highlights = [
  {
    title: 'UI/UX Design',
    detail: 'Systems thinking, typography, and motion as UX—not decoration.',
  },
  {
    title: 'Frontend Engineering',
    detail: 'Performance budgets, accessible components, resilient state.',
  },
  {
    title: 'Full Stack Development',
    detail: 'APIs, persistence, and shipping end-to-end with taste.',
  },
]

export const hobbies = [
  {
    title: 'Gaming',
    copy: 'Story-driven worlds and sharp FPS sessions—great design lessons in pacing and feedback.',
    icon: 'gamepad',
  },
  {
    title: 'UI/UX craft',
    copy: 'Studying interfaces everywhere: airports, consoles, dashboards. Always chasing clarity.',
    icon: 'layout',
  },
  {
    title: 'Creative builds',
    copy: 'Side projects that mix code, visuals, and play—where ideas get room to breathe.',
    icon: 'spark',
  },
]
