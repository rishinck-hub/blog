export const motion = {
  duration: {
    fast: 0.18,
    normal: 0.48,
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
    image: { duration: 0.9, scaleDuration: 1.14 },
    modal: { enter: 0.72, exit: 0.42 },
    hover: 0.18,
    route: 0.46,
    divider: 0.7,
    cursor: { follow: 0.2, state: 0.18, press: 0.1 },
    scroll: { scrub: 0.65, distance: 7, smoothDuration: 1.05 },
  },
} as const;

export function shouldReduceAdvancedMotion() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 900px)").matches ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4)
  );
}
