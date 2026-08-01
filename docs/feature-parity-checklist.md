# Next.js feature-parity checklist

Date: 2026-08-01  
Branch: `nextjs-editorial-redesign`  
Applications compared: `portfolio/` (Vite legacy) and `next-portfolio/` (Next.js migration)

## Result

Phase 3 content and behavior have been migrated without starting the editorial redesign. The Next.js version preserves the legacy route structure, dark/orange visual system, typography, responsive CSS, shared content, public media, resume, contact pathways, and meaningful interactions. App Router pages are server components by default; browser behavior is isolated in client components.

## Route and content parity

- [x] `/` contains the hero, Three.js wordmark, portrait, marquee, about preview, selected work, capabilities, experience preview, creative preview, and contact CTA.
- [x] `/about` contains the existing introduction, technology list, and capability list.
- [x] `/work` contains all seven project records.
- [x] `/work/[slug]` provides a statically generated detail route for every project and returns 404 for unknown slugs.
- [x] `/experience` contains all seven professional, training, education, leadership, and workshop records.
- [x] `/creative` contains all six creative records and the existing background video.
- [x] `/contact` contains email, LinkedIn, GitHub, WhatsApp, portrait, and resume download pathways.
- [x] Existing claims were migrated without inventing employers, results, awards, metrics, screenshots, or technologies.
- [x] Employer-related work remains limited to the same public-summary wording used by the legacy application.
- [x] No environment variables existed in the legacy repository, so no `REACT_APP_*` values or secrets required migration.
- [x] No contact form existed in the legacy application; link-based contact functionality is preserved rather than inventing a backend.

## Navigation and links

- [x] React Router was removed from the Next.js application.
- [x] Internal navigation uses `next/link` and App Router folders.
- [x] Header quick links and drawer links cover all six public pages.
- [x] Section CTAs link to the corresponding App Router pages.
- [x] All project tiles link to their internal project detail routes.
- [x] Cash Splitter retains its public live-project URL on its detail page.
- [x] Email, LinkedIn, GitHub, Instagram, and WhatsApp href values match the legacy source.
- [x] The navigation drawer closes with its close button, backdrop, route selection, or Escape.
- [x] Closed drawer content is inert; focus moves into the open drawer and returns to the menu button on Escape.
- [x] Browser back/forward behavior uses native App Router history with no custom history interception. Headless route rendering passed; final human gesture testing remains part of preview review.

## Assets and fonts

- [x] `profile.png` migrated and renders as the hero portrait.
- [x] `0722.mp4` migrated and remains the creative-page background video.
- [x] Resume PDF migrated to the same public URL and download filename.
- [x] Favicon and legacy SVG resources migrated.
- [x] External creative thumbnails and contact portrait use `next/image` with a narrowly scoped GitHub Pages remote pattern.
- [x] Barlow, Barlow Condensed, and DM Serif Display use `next/font` instead of a runtime Google Fonts CSS import.
- [x] No project screenshots existed in the legacy application; none were invented.
- [x] External Instagram and GitHub Pages media retain direct-link fallbacks.

## Interaction and animation parity

- [x] Three.js hero animation migrated into a dedicated client component and disposes renderer resources/listeners.
- [x] Hero portrait parallax migrated with requestAnimationFrame batching.
- [x] IntersectionObserver reveal behavior migrated into a reusable client component.
- [x] Route-enter animation is preserved through `app/template.tsx` and legacy CSS.
- [x] Custom cursor behavior is retained for fine pointers and disabled for coarse pointers/reduced motion.
- [x] Creative category filtering and reel modal are retained.
- [x] Instagram embed script loads only when the modal is rendered; direct source links remain available.
- [x] Escape closes the reel modal and body scroll locking is cleaned up.
- [x] `prefers-reduced-motion` disables JavaScript hero/cursor motion and immediately reveals content, in addition to the CSS fallback.
- [x] No GSAP, Lenis, SplitType, or redesign animation was added during migration.

## Accessibility and responsive parity

- [x] Skip-to-content link added.
- [x] Navigation and modal controls use buttons with accessible labels.
- [x] Decorative imagery/cursor/WebGL output is hidden from assistive technology.
- [x] Content images include alt text; decorative creative background image has empty alt text.
- [x] Project records are real links rather than anchors without href values.
- [x] Mobile navigation was corrected so the hamburger remains visible at narrow widths.
- [x] Desktop 1440×1000 and mobile 390×844 screenshots were visually inspected.
- [x] Legacy breakpoints and responsive section behavior remain loaded.
- [x] The mobile hero and typography remain readable without horizontal page overflow in the inspected viewport.

## Runtime and build verification

- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run typecheck` passes with strict TypeScript.
- [x] `npm.cmd run build` passes under Next.js 16.2.12/Turbopack.
- [x] All route pages and seven project detail pages are statically generated.
- [x] Direct production-server requests to `/`, `/about`, `/work`, `/experience`, `/creative`, and `/contact` return HTTP 200.
- [x] Direct request to an unknown route returns HTTP 404.
- [x] Headless Chrome renders representative home, work, project, creative, contact, and 404 content.
- [x] Headless Chrome reports no detected React hydration, TypeError, or ReferenceError failures on representative routes.
- [x] No TypeScript, lint, compilation, or static-generation errors remain.
- [x] The successful production build uses standard Next.js output compatible with a Vercel project whose Root Directory is `next-portfolio`.
- [x] Legacy Vite application remains intact and deployable from `portfolio/`.

## External and deployment caveats

- External social, Instagram, GitHub Pages, and Cash Splitter availability depends on third-party services. Their source hrefs and fallbacks are preserved; recheck them from the Vercel preview network before production cutover.
- The current 25 MB video and 2.3 MB profile PNG are intentionally preserved for visual parity. Optimization is deferred to the redesign/performance phase.
- The official Next.js 16.2.12 dependency tree currently reports three upstream high-severity advisories through pinned PostCSS and Sharp versions. npm's proposed downgrade is unsafe; recheck for a patched stable Next.js release before preview deployment.
- A real Vercel preview has not been created in this phase, so domain, alias, and Vercel project settings remain untouched as required.

## Important migrated files

- `next-portfolio/src/app/layout.tsx`
- `next-portfolio/src/app/template.tsx`
- `next-portfolio/src/app/page.tsx`
- `next-portfolio/src/app/{about,work,experience,creative,contact}/page.tsx`
- `next-portfolio/src/components/navigation/site-navigation.tsx`
- `next-portfolio/src/components/animation/{cursor,reveal,hero-canvas}.tsx`
- `next-portfolio/src/components/sections/*`
- `next-portfolio/src/data/*`
- `next-portfolio/src/app/{legacy,legacy-refresh}.css`
- `next-portfolio/public/*`

## Approval gate

The migrated application is ready for a Vercel preview and human parity review. Do not begin the premium editorial redesign until that preview is approved or the remaining external-service checks are accepted.
