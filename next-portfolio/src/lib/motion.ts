export const motion = {
  duration: {
    fast: 0.18,
    base: 0.48,
    slow: 0.9,
    page: 0.8,
  },
  ease: "power4.out",
  cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
  stagger: {
    tight: 0.035,
    base: 0.065,
    loose: 0.1,
  },
  reveal: {
    distance: 32,
    opacity: 0,
    imageClipFrom: "inset(0 0 100% 0)",
    imageClipTo: "inset(0 0 0% 0)",
  },
  pageTransition: {
    y: 12,
    duration: 0.8,
  },
} as const;

export function shouldReduceAdvancedMotion() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4)
  );
}
