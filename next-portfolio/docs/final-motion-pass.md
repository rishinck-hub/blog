# Final motion pass

## Scope and reference review

This document audits the existing motion architecture and maps a future polish pass to the current components. It does not authorize another redesign or copy the reference site's brand, copy, imagery, project designs, or exact compositions.

The complete 59.4-second reference recording was reviewed in sequence. Its reusable interaction principles are: a typographic progress-led entrance; layered but restrained hero depth; oversized clipped type; alternating light and dark project stages; scroll-linked image movement; occasional pinning; concise cursor labels; interactive rows; a substantial contact/footer stage; and an accessible centered contact dialog. The motion is mostly directional, uses strong easing, and lets typography and imagery carry the composition.

## Current mounted architecture

- `src/app/layout.tsx` mounts the first-visit gate, `FirstVisitLoader`, `MotionProvider`, global navigation, footer, and `CursorLabel`.
- `src/app/template.tsx` mounts `PageTransition` for App Router changes.
- `src/app/page.tsx` mounts one page-specific `HomeMotion` controller.
- About uses the shared `TextReveal` and `RevealImage` primitives.
- Creative uses `CreativeGallery`, which owns parallax and its accessible preview dialog.
- Experience and Home capability rows use native `details`/`summary`; their expansion motion is CSS-only.
- Work index, project case studies, Experience, Contact, and most non-home page sections have no page-level GSAP controller.
- Lenis, GSAP, and ScrollTrigger are installed. SplitType is not installed; `TextReveal` is the existing lightweight word-splitting equivalent.
- Several older section components and the IntersectionObserver-based `Reveal` remain in the repository but are not mounted by the current App Router pages. `Cursor` and `MagneticButton` are also currently unused. They should not be revived alongside newer equivalents without first deciding which implementation remains canonical.

## Runtime review

The current production build was exercised in Chrome across Home, About, Work, a dynamic project route, Experience, Creative, and Contact. Direct navigation, full-page scrolling, mobile menu focus handling, Creative dialog controls, expandable Experience rows, invalid contact submission, and reduced-motion mode were reviewed. No unexpected browser page errors occurred. The sandboxed local server could not reach the six public GitHub Pages Creative images and logged expected optimizer fetch failures; the same six optimized assets were already verified as HTTP 200 on the Vercel Preview during deployment testing.

Measured/observed behavior:

- The first-visit loader hides in approximately 935 ms on a capable desktop.
- The hero portrait does not currently react to pointer movement.
- The loader is skipped for coarse pointers, reduced motion, and low-core devices.
- Advanced GSAP/Lenis behavior is disabled for coarse pointers, reduced motion, viewports up to 900 px, and low-core devices.
- Browser back/forward and route changes remount the expected template/page controllers; ScrollTrigger is refreshed after pathname changes.
- Invalid Contact submission displays errors, but focus is not moved to the first invalid field because the DOM query runs before React commits `aria-invalid`. This is an existing accessibility defect to fix during implementation.

## Motion audit findings

### Loader and opening sequence

`FirstVisitLoader` uses a scoped GSAP timeline and cleans it up correctly. The before-interactive gate prevents a first-paint flash and supplies a CSS safety exit. The current loader contains a wordmark and counter, but no progress line or resolving letter sequence. Its black treatment differs from the reference's quiet warm-white opening.

The loader and `HomeMotion` start independently. The home opening timeline begins during hydration rather than after loader completion, so most of the hero reveal can occur behind the loader. This is the primary opening-sequence conflict. A shared completion signal is preferable to adding delay constants.

### Scroll and route lifecycle

`MotionProvider` correctly owns the single Lenis instance, GSAP ticker integration, ScrollTrigger updates, route scroll reset, font/image refreshes, and cleanup. There is no second smooth-scroll library. Image and resize refreshes are requestAnimationFrame-coalesced, although a burst of lazy-image loads can still cause repeated refreshes.

Page transitions are CSS entrance/wipe animations triggered by `template.tsx`. They do not intercept navigation or provide a true outgoing phase, which keeps navigation fast but limits orchestration. Reduced-motion CSS removes them correctly.

### GSAP and ScrollTrigger cleanup

Mounted page animations use `gsap.context()` and revert on unmount. Global ticker callbacks, Lenis listeners, keyboard handlers, pointer handlers, intervals, animation frames, and ScrollTrigger-owned animations have explicit cleanup. No duplicate mounted Lenis instance or leaked route listener was found.

Plugin registration is repeated in several client modules. GSAP registration is idempotent, so this is not a runtime defect, but a small client-only registration helper would make ownership clearer. Hard-coded timing and scroll values remain in `HomeMotion`, `CreativeGallery`, `CursorLabel`, and `MagneticButton` instead of consistently using `motion.ts`.

### Text and image reveals

`TextReveal` splits verified strings into accessible word wrappers and scopes selectors to its root. It is currently used only on About. `HomeMotion` separately targets hero lines and generic `.home-animate` elements, creating two reveal conventions. `RevealImage` is reusable and safe; Home duplicates similar clip-path logic through class selectors.

Because GSAP `from` states are applied in a layout effect while base CSS leaves content visible, slow hydration can briefly show final-state text before animation setup. The loader masks this on a first Home visit, but not necessarily on client navigation or non-home pages.

### Hero and pointer response

The Home hero already has suitable layered markup: portrait, shade, large type, metadata, and action links. It needs motion refinement, not a layout rewrite. There is no pointer-responsive depth, shared pointer-normalization utility, or scroll-linked hero exit. Any future depth should use `gsap.quickTo`, affect only transforms, remain subtle, and be disabled under the existing capability checks.

### Projects and section transitions

Home projects already provide large alternating visual stages and cursor labels, but their behavior is limited to one-time clip/reveal animations and CSS hover movement. There is no project pinning, project-title scrub, image-layer parallax, or coordinated dark/light handoff. Work index and case studies have no ScrollTrigger timelines.

Pinning should be desktop-only and limited to one controlled sequence. Mobile should retain normal document flow. Existing project metadata and links must remain visible without hover.

### Cursor and micro-interactions

The mounted `CursorLabel` is the correct base for `View`, `Open`, `Next`, and `Close` states. It is capability-gated, uses `quickTo`, and cleans up. The older dot/follower `Cursor` is unused and should not be mounted in parallel. Cursor labels are derived from `data-cursor-label`; there is no drag state or centralized state contract yet.

`MagneticButton` is unused and uses an elastic return that is less restrained than the current direction. If retained, its return easing should use shared editorial motion values and it should be applied only to one or two prominent actions.

### Dialogs, footer, and draggable content

`CreativeGallery` provides the strongest existing dialog pattern: semantic dialog markup, body-scroll lock, Escape and arrow controls, focus trapping, and focus restoration. Its entrance/exit is CSS-led rather than a coordinated GSAP modal timeline.

There is no general “Let's Talk” modal. The Contact page and validated mail fallback already contain the correct content/action source, so a future modal should reuse those data and accessibility patterns rather than duplicate a form endpoint.

The mounted `SiteFooter` is a compact copyright/social row. The full-screen Home CTA is visually substantial but is not part of the global footer and has no modal trigger. There is no draggable horizontal strip in the approved pages; one should be added only if existing content justifies it, with buttons/keyboard fallback and native touch scrolling.

### Mobile, performance, and hydration

The current capability gate removes Lenis and advanced animation at 900 px and below, on coarse pointers, reduced-motion devices, and lower-core hardware. This is safe but broad: tablets lose all advanced reveals rather than receiving lighter variants. CSS page transitions and simple hover transitions remain unless reduced motion is requested.

Animation code favors transforms, opacity, and clip paths. Responsive images and stable aspect ratios limit layout shift. Risks for the final pass are excessive ScrollTrigger count, multiple pinned sections, image refresh churn, and applying `will-change` permanently. New triggers should be created only inside scoped desktop match-media branches and killed on teardown.

## Implementation map

| Requested interaction | Existing owner | Planned enhancement |
| --- | --- | --- |
| Initial loader | `FirstVisitLoader`, loader gate in `layout.tsx` | Add a thin progress rule and restrained typographic resolve; keep the full sequence brief; emit a completion event/state so the hero starts afterward. |
| Hero typography reveal | `HomeMotion`, Home hero markup | Sequence lines after loader completion; add a quiet scroll-linked exit without changing content or layout. |
| Mouse-responsive hero depth | Home portrait/shade, `motion.ts` | Add one desktop-only pointer controller using `quickTo`; apply different low-amplitude transforms to portrait and type/shade layers. |
| Shared text reveals | `TextReveal`, `HomeMotion` | Standardize around the existing lightweight wrapper; avoid SplitType unless the existing equivalent proves insufficient. |
| Project presentation and pinning | Home project articles, Work index | Add one desktop-only scoped project sequence with restrained pinning and cross-speed visual/title movement; preserve normal mobile flow. |
| Project cursor states | `CursorLabel` and existing data attributes | Formalize `View project`, `Open`, `Next`, `Close`, and optional `Drag`; do not mount the old dot cursor. |
| Image movement | `RevealImage`, Home/Creative parallax | Consolidate clip/scale/parallax values in `motion.ts`; guard null images and refresh only when required. |
| Expandable rows | Home capabilities, Experience `details` | Retain native semantics; animate an inner wrapper/line while keeping keyboard behavior and reduced-motion instant state. |
| Draggable strip | No mounted equivalent | Add only around genuine Creative/project content if justified; use native horizontal scroll plus pointer drag, keyboard controls, and touch support. |
| Footer interaction | `SiteFooter`, Home CTA | Evolve the global footer into a major editorial contact stage while reusing current navigation/social data; do not duplicate the Home CTA verbatim. |
| “Let's Talk” modal | No general modal; reuse `CreativeGallery` dialog behavior and Contact data | Create one shared client dialog with backdrop, focus trap, Escape/close controls, body lock, focus restoration, and restrained GSAP entrance/exit. Link to email/contact rather than inventing a backend. |
| Page transitions | `PageTransition`, `template.tsx` | Refine the existing fast wipe and route label; do not add slow navigation interception or a competing transition framework. |
| Timing and easing | `motion.ts` | Move remaining hard-coded duration/stagger/scrub values into shared presets, including lighter mobile and reduced-motion variants. |
| Contact validation focus | `ContactForm` | Move focus after error state commits, using a field ref or effect; retain accessible live messaging. |

## Recommended implementation order

1. Fix shared lifecycle/timing foundations: loader-to-hero handoff, motion presets, registration ownership, and contact error focus.
2. Refine loader, hero reveal, pointer depth, and shared text/image primitives.
3. Add the single desktop project sequence and validate normal-flow mobile behavior.
4. Expand cursor states and restrained row/image micro-interactions.
5. Build the shared contact modal from existing contact data and evolve the footer around it.
6. Add a draggable strip only if the existing Creative content supports it without placeholders.
7. Re-run keyboard, reduced-motion, touch, route-history, console, hydration, performance, and Vercel Preview verification.

## Preserve as-is

- Approved editorial layouts, monochrome palette, typography hierarchy, responsive content order, and genuine portfolio copy.
- The single Lenis provider and GSAP/ScrollTrigger stack.
- Server Component page content and narrow client boundaries.
- Accessible mobile menu and Creative dialog behavior.
- Project confidentiality safeguards, typed data, contact fallback, metadata, and image optimization.
