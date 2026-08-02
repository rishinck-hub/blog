# Editorial design and motion system

This document records the shared systems introduced in Phases 5–7. The migrated page content and section compositions remain unchanged; the primitives are ready for the later page redesign.

## Visual foundation

- Warm-white, monochrome color tokens and accessible text, line, surface, inverse, and focus colors live in `src/styles/design-system.css`.
- Instrument Serif is the editorial display face and Manrope is the body/interface face. Both are loaded through `next/font` in the root layout.
- Fluid type classes cover display, page, section, project, body, caption, label, navigation, and metadata roles.
- Layout tokens define a 12-column editorial grid, responsive gutters, section rhythm, full-bleed/full-viewport treatments, dividers, and image aspect ratios.
- Reusable primitives are grouped under `components/layout`, `components/ui`, and `components/projects`.

## Motion foundation

- GSAP and ScrollTrigger handle timelines and scroll reveals. Every component scopes animation with `gsap.context()` and reverts the context on unmount.
- Lenis is the only smooth-scrolling layer. It is synchronized with the GSAP ticker and triggers ScrollTrigger updates from its scroll event.
- `src/lib/motion.ts` centralizes durations, easing, stagger, reveal distance, clip presets, and page-transition timing.
- The motion provider refreshes ScrollTrigger after route changes, fonts, window load, image loads, and layout resizes.
- Advanced motion and smooth scrolling are disabled for reduced-motion users and simplified for coarse pointers, small viewports, and low-core devices.
- Text splitting is implemented locally at word boundaries, avoiding an additional dependency.

## Navigation shell

- The desktop header uses a compact wordmark, semantic navigation, active-route state, and CSS underline transitions.
- The mobile menu is a full-screen modal dialog with numbered routes, contact/social details, body scroll locking, Escape dismissal, a focus loop, route-selection dismissal, and focus restoration.
- The header gains a restrained warm-white/blur surface after scrolling while retaining visible keyboard focus styles.

## Usage notes

- Prefer CSS transitions for hover and focus feedback.
- Use the shared GSAP components only for orchestrated or scroll-driven effects.
- Keep static page and section content as server components; isolate browser APIs and animation in client components.
- Reuse the existing primitives where they clarify repeated editorial patterns, but keep ordinary semantic markup local.
