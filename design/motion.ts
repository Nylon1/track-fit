export const motion = {
  easing: {
    standard: [0.22, 0.61, 0.36, 1],
    enter: [0, 0, 0.2, 1],
    exit: [0.4, 0, 1, 1],
  },

  duration: {
    fast: 0.18,
    standard: 0.36,
    slow: 0.76,
    cinematic: 1.2,
  },
} as const;