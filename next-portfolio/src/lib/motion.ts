export const motion = {
  duration: {
    fast: 0.18,
    normal: 0.44,
    slow: 0.9,
  },
  ease: {
    editorial: "power4.out",
    reveal: "power3.out",
    exit: "power2.inOut",
  },
  stagger: {
    tight: 0.035,
    normal: 0.065,
  },
  distance: {
    small: 14,
    medium: 32,
  },
  reveal: {
    opacity: 0,
    imageClipFrom: "inset(0 0 100% 0)",
    imageClipTo: "inset(0 0 0% 0)",
  },
  timing: {
    text: { duration: 0.72, stagger: 0.035 },
    image: { duration: 0.86, scaleDuration: 1 },
    modal: { enter: 0.58, exit: 0.34 },
    hover: 0.18,
    route: 0.46,
    divider: 0.7,
    cursor: { follow: 0.2, state: 0.18, press: 0.1 },
    scroll: { scrub: 0.5, distance: 6, smoothDuration: 0.92 },
  },
  pointer: {
    visual: { x: 12, y: 8, rotation: 0.45 },
    secondary: { x: 7, y: 4 },
    detail: { x: 3, y: 2 },
  },
} as const;

export const loaderCompleteEvent = "rishin:loader-complete";
export const modalStateEvent = "rishin:modal-state";

export type MotionLevel = "full" | "reduced" | "essential" | "off";

export function getMotionLevel(): MotionLevel {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (window.matchMedia("(max-width: 640px)").matches) return "essential";
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) return "full";
  return "reduced";
}

export function hasFullMotion() {
  return getMotionLevel() === "full";
}

export function shouldReduceAdvancedMotion() {
  return getMotionLevel() !== "full";
}
