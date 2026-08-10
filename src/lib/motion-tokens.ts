/**
 * Shared motion system for the portfolio, following the "Premium" archetype
 * from the motion-design skill: one signature easing, a three-step duration
 * palette, and a single consistent entrance pattern (rise + fade + scale).
 */

export const EASE = {
  /** Signature curve used for ~80% of animations. */
  signature: [0.4, 0, 0.2, 1] as const,
  /** Gentle deceleration for large/dramatic reveals. */
  emphasized: [0.05, 0.7, 0.1, 1] as const,
  /** Sharp acceleration for exits/dismissals. */
  accelerate: [0.3, 0, 1, 1] as const,
  /** Neutral fallback for reduced-motion fades. */
  linear: "linear" as const,
};

export const DURATION = {
  quick: 0.18,
  standard: 0.42,
  slow: 0.9,
  reduced: 0.2,
};

export const STAGGER = {
  micro: 0.03,
  standard: 0.08,
  dramatic: 0.14,
};

/** Standard "rise + fade + scale" entrance, the site's one consistent pattern. */
export const entranceVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.standard, ease: EASE.signature },
  },
};

/** Reduced-motion counterpart: opacity-only, no position/scale movement. */
export const reducedEntranceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.reduced, ease: EASE.linear },
  },
};

export function getEntranceVariants(reducedMotion: boolean) {
  return reducedMotion ? reducedEntranceVariants : entranceVariants;
}

export function getEntranceTransition(reducedMotion: boolean, delay = 0) {
  return reducedMotion
    ? { duration: DURATION.reduced, ease: EASE.linear, delay: 0 }
    : { duration: DURATION.standard, ease: EASE.signature, delay };
}
