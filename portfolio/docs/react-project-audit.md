# React project audit

Date: 2026-08-01  
Phase: 0 (audit only)  
Working branch: `nextjs-editorial-migration`

## Executive summary

The current site is a JavaScript React 19 single-page application built with Vite 8. React Router supplies six client-side routes. Styling is two global hand-written CSS files; Tailwind and TypeScript are not present. Motion is implemented with CSS transitions/keyframes, browser scroll handlers, IntersectionObserver, requestAnimationFrame, and a custom Three.js/WebGL hero. There is no GSAP, Lenis, SplitType, Framer Motion, form backend, environment-variable usage, test suite, or explicit Vercel configuration.

The content model is already reasonably centralized in `src/data/index.js`, and the page/section split is useful. Those content records and several presentational interfaces can be migrated. Router-specific components, all browser-only effects, image/video delivery, metadata, accessibility behavior, and the large global CSS layer require rewriting or deliberate adaptation for the Next.js App Router.

Important baseline facts:

- The repository was on `new-theme` at the same commit as `main` when this audit began. Two uncommitted user changes already existed in `src/App.jsx` and `src/styles/refresh.css`; they add route-enter animation and reduced-motion handling. They were preserved unchanged and carried onto the requested migration branch.
- `npm run lint` passes.
- A production build passes when directed to a fresh writable output directory. The normal `dist` build could not clean an existing sandbox-protected `dist` directory; that is an environment/filesystem condition, not a compilation error.
- The production bundle is large: about 879.15 kB minified JavaScript / 247.77 kB gzip, with Vite's >500 kB chunk warning. Three.js and the hero implementation are the likely primary contributors.
- The supplied Vercel URL could not be fetched by the audit browser (reported as unsafe/non-retryable), so live rendering and live-route parity could not be independently confirmed. Local source, build output, and link targets were audited. The design reference was inspected only to understand its high-level editorial rhythm; none of its content or assets are proposed for reuse.

## Current architecture

### Tooling and versions

| Concern | Current implementation |
| --- | --- |
| Build system | Vite `8.0.10`, `@vitejs/plugin-react` `6.0.1` |
| UI | React and React DOM `19.2.5` |
| Routing | `react-router-dom` `7.18.1`, declarative `BrowserRouter`/`Routes` |
| 3D | Three.js `0.184.0` |
| Language | JavaScript/JSX; no TypeScript source or `tsconfig.json` |
| Styling | Global CSS: `src/styles/index.css` plus override layer `src/styles/refresh.css` |
| Linting | ESLint `10.3.0`, React Hooks and React Refresh plugins |
| Package manager | npm with committed `package-lock.json` |
| Tests | None configured |

`src/main.jsx` mounts `App` into `#root`, wraps it in `React.StrictMode` and `BrowserRouter`, and loads both CSS files. `src/App.jsx` owns routing and the shared navigation, cursor, main wrapper, scroll reset, and footer. Pages compose reusable section components. Content arrays live in `src/data/index.js` except the technology list and contact links, which remain local to sections.

### Folder structure

```text
portfolio/
├─ public/                 static video, profile image, resume, SVG files
├─ src/
│  ├─ assets/              duplicate profile/resume plus unused starter assets
│  ├─ components/          navigation, cursor, reveal, marquee, page header, links, WebGL
│  ├─ data/index.js        projects, experience, services, reels, marquee, resume URL
│  ├─ hooks/               greeting and IntersectionObserver hooks
│  ├─ pages/               six route-level compositions
│  ├─ sections/            hero, about, work, skills, experience, reels, contact
│  ├─ styles/              base global CSS and later override CSS
│  ├─ App.jsx              shared shell and route table
│  └─ main.jsx             browser entry point
├─ index.html
├─ vite.config.js
├─ eslint.config.js
└─ package.json
```

There is no separate layout component; `App.jsx` is the implicit shared layout. There is no API/server code.

## Existing routes

| Route | Page | Main content |
| --- | --- | --- |
| `/` | `HomePage` | Hero, marquee, compact about, 3 projects, 4 capabilities, 2 experience entries, 3 reels, contact CTA |
| `/about` | `AboutPage` | Page header, full technology/about section, full capabilities |
| `/work` | `WorkPage` | Page header and all projects |
| `/experience` | `ExperiencePage` | Page header and complete professional/education/workshop timeline |
| `/creative` | `CreativePage` | Video-backed header and all Instagram reel entries |
| `/contact` | `ContactPage` | Page header, contact links, portrait, resume download |
| `*` | inline fallback | Client-side redirect to `/`; not a true 404 response |

Navigation is duplicated as desktop quick links and sidebar links from a shared local array. `SectionLink` handles internal route CTAs. Hash links inside the home hero/intro target page section IDs. `ScrollToTop` calls `window.scrollTo` after pathname changes.

## Existing content inventory

### Identity and positioning

- Name: Mohammed Rishin C K.
- Current positioning: software developer intern; Laravel/React full-stack developer; B.Tech Computer Science graduate.
- Intro copy emphasizes fast, elegant, maintainable applications and production-ready full-stack work.
- Availability statement: “Available for opportunities.” This should be verified before publication because it is time-sensitive.

### Capabilities and technology claims

- Services: full-stack development, backend development, database design, DevOps/cloud, and digital marketing/video editing.
- Technologies named across content: PHP, Laravel, Python, JavaScript, React, Next.js (spelled “Next js”), Django, MySQL, PostgreSQL, MongoDB, SQL, REST APIs, Docker, CI/CD, Azure, Git/GitHub, Vercel, Render, Flutter, Firebase, Flask, DaVinci Resolve, and Tailwind CSS.
- “Learning” is explicitly attached to Docker/cloud in the service data and should not be upgraded into an experience claim.

### Projects

Seven records exist:

1. Employee Management System — internship contribution; no public link.
2. OnlineCheckWriter.com Backend — internship contribution; no public link.
3. Cash Splitter — public Vercel URL and PDF export claim.
4. Clinic Management App — React/Django REST/PostgreSQL/Vercel/Render.
5. Clinic Management System — React/Django REST/MySQL/PythonAnywhere.
6. File Management System — Flask/Azure/Python.
7. Bus Management App — Flutter/Firebase.

Only Cash Splitter currently has a project URL. No project has a local image, repository URL, case-study route, role/date field, verified screenshots, or explicit public/private classification. The two employer-related entries must remain text-only unless approved public assets and wording are supplied; do not invent metrics or disclose internal details.

### Experience, education, and workshops

Seven records cover the Zil Money internship, Dawa Clinic application, Faith Infotech training, B.Tech education, department association leadership, an IIT Delhi workshop, and a CET workshop. Preserve the exact claims until the user verifies chronology and tense. In particular, the 2021–2025 B.Tech record still says “Pursuing” while the hero says “graduate,” and the internship uses “Present”; both are content-review items, not facts to silently rewrite.

### Creative content

Six reel records point to Instagram and externally hosted GitHub Pages thumbnails: Cinematic Short, Brand Promo, Travel Vlog, Event Coverage, Music Edit, and Instagram Reel. Two records reuse the same Instagram URL. Durations and titles appear editorially assigned and should be verified against the source videos. The creative page also loads local `public/0722.mp4` as a decorative background.

### Contact and social links

- Email: `rishinkpm@gmail.com`
- LinkedIn: full Mohammed Rishin C K profile URL
- GitHub: `rishinck-hub`
- Instagram: `_rishin___ck`
- WhatsApp: `+91 623 863 4185`
- Resume: `/Mohammed_Rishin_C_K_Software_Developer.pdf`

Contact is link-only; there is no form, validation, API route, email provider, analytics, or spam protection.

### Fonts and visual assets

- Google Fonts CSS imports Barlow, Barlow Condensed, and DM Serif Display from `fonts.googleapis.com`.
- `public/profile.png`: 2.32 MB, used by hero CSS.
- `public/0722.mp4`: 25.02 MB, used by the creative page header.
- `public/dsijf.svg`: 3.31 MB, apparently unused.
- `public/icons.svg`: 5 KB SVG symbol sheet, apparently unused.
- `public/favicon.svg`: used by `index.html`.
- Public resume PDF: about 107 KB, used by navigation/contact downloads.
- `src/assets/profile.png` and the source resume are byte-for-byte duplicates of their public equivalents and are unused.
- `src/assets/hero.png`, `react.svg`, and `vite.svg` appear unused starter/legacy assets.
- Three profile/portrait backgrounds and all six reel thumbnails are externally hosted at `rishinck-hub.github.io`; the contact image is also external.

The external image inventory creates availability, privacy, optimization, and Next.js remote-image configuration risks. Asset ownership/publication permission must be confirmed before copying them locally.

## Styling, motion, responsive behavior, and browser APIs

The base CSS is approximately 38 KB and the override CSS approximately 17 KB. The visual system currently uses a near-black background, orange accent, condensed uppercase typography, grids, rounded panels, glow effects, and many card-like surfaces. This conflicts materially with the requested warm-white, monochrome, serif-led editorial redesign; most selectors should be replaced rather than layered with a third override sheet.

Responsive breakpoints exist at 1024, 768, 600/480, and 380 px. The layout reduces or removes the hero side panel, WebGL hero, custom cursor, quick navigation, tags, and some metadata on smaller screens. Responsive intent is useful, but CSS is split across overlapping files, uses broad global selectors, and contains duplicated/overridden component rules, which raises regression risk.

Current motion/browser-only behavior:

- `Hero`: raw scroll listener writes a parallax transform on every scroll.
- `HeroCanvas`: WebGL renderer, animation frame loop, resize/mouse listeners, device pixel ratio, IntersectionObserver, Three.js font parsing, and randomized particles.
- `Cursor`: continuous requestAnimationFrame loop, mouse tracking, document queries, and a MutationObserver.
- `Reveal`/`useInView`: IntersectionObserver-driven CSS transitions.
- `Nav`: scroll listener, Escape handling, body scroll lock, and route location.
- `Reels`: body class mutation, Escape handling, global Instagram API, dynamic third-party script injection, and modal state.
- `ScrollToTop`: direct `window.scrollTo`.
- `useGreeting`: reads the client clock during render. In an App Router server-rendered tree this can produce server/client text mismatch unless isolated or made deterministic.
- CSS includes native smooth scrolling, marquee animation, hover transitions, page-enter animation, backdrop blur, `:has()`, and a global reduced-motion override.

Every item above requires a client component or client hook in Next.js. Three.js should be dynamically loaded only where needed, or removed if the editorial redesign no longer benefits from it. Lenis must become the only smooth-scroll mechanism; native smooth-scroll rules and manual smooth behavior should not compete with it. GSAP/ScrollTrigger should replace only timeline/scroll animation behavior, while simple hover transitions remain CSS.

## SEO, accessibility, responsive, and performance findings

### SEO

- One document title (`Rishin | Portfolio`) is defined in `index.html`; all routes share it.
- No meta description, canonical URL, Open Graph/Twitter metadata, robots policy, sitemap, structured data, per-route metadata, theme color, or social image is present.
- Client-only routing and the wildcard redirect provide no route-specific server HTML or proper 404 status.
- Page headings generally use one route-level `h1`, but home content and creative item heading levels should be reviewed as part of a semantic outline.

### Accessibility

Positive baseline features include semantic `nav`/`main`/`footer`, real buttons for menu/reel controls, `aria-current`, an `aria-expanded` menu trigger, Escape-to-close behavior, alt text on content portraits/thumbnails, decorative imagery hidden from assistive technology, and a `prefers-reduced-motion` CSS rule.

Issues to fix during redesign:

- No visible skip link.
- Menu and reel modal do not explicitly move, trap, and restore focus; sidebar `aria-hidden`/`inert` helps only while closed.
- The custom cursor elements are not marked `aria-hidden`, continuously animate even when reduced motion is requested in JavaScript, and attach duplicate event listeners whenever the MutationObserver callback runs.
- WebGL and hero parallax continue animating under reduced-motion preferences; CSS shortening alone does not stop their JavaScript loops.
- Project records without URLs are rendered as `<a>` elements without `href`, creating misleading non-interactive semantics and missing keyboard parity.
- Reel cards use an `h4` without an evident preceding `h3` for each item.
- The Instagram embed is injected into a modal without robust loading/error status or focus management.
- The navigation overlay is a clickable `div` rather than an explicit control; the hamburger/sidebar pattern needs end-to-end keyboard and screen-reader testing.
- Focus styles are not consistently defined for every interactive component; many states are hover-only.
- Text is visibly mojibake in the checked-out source/output for symbols such as ©, arrows, bullets, apostrophes, dashes, and the play icon. Files appear to contain UTF-8 text being interpreted or previously saved incorrectly; normalize encoding and verify rendered text.
- External-link behavior is inconsistent (for example, contact email is opened with `_blank` in one component).

### Responsive risks

- At <=480 px the work grid remains two columns, which can compress long project titles severely.
- Hiding information (service tags, hero panel, socials) is used frequently instead of restructuring it.
- Fixed/sticky navigation, full viewport sections, large display text, rotated portraits, sidebar width, Instagram embeds, and 25 MB video need testing at 320 px, zoomed desktop, landscape mobile, and large screens.
- Viewport-height layouts should use modern dynamic viewport units and avoid content clipping.

### Performance risks

- Main JavaScript bundle exceeds Vite's chunk threshold (879.15 kB minified / 247.77 kB gzip).
- Three.js, TextGeometry/font JSON, and all hero code are in the SPA bundle rather than route/viewport-loaded.
- `public/0722.mp4` is 25 MB; metadata preload still imposes transfer/decoding risk and no poster or alternate source is defined.
- Profile PNG is 2.32 MB and external images bypass build-time optimization.
- Google Fonts is loaded through a render-blocking CSS `@import`; migrate to `next/font` with selected subsets/weights.
- Custom cursor performs a permanent RAF loop and repeated DOM-wide listener attachment.
- Hero parallax writes inline transforms per scroll event without RAF batching.
- Backdrop filters, large blurs, continuous WebGL, fixed overlays, and many simultaneous reveal animations can be GPU-heavy.
- No route-level code splitting beyond what the SPA build naturally provides, no image sizing/loading strategy, and no measured Core Web Vitals are present.

## Broken links and external dependency review

Static source inspection found no missing local route target among the six declared routes, and the resume/video/profile/favicon paths exist. Risks and unresolved checks:

- Direct requests to nested SPA routes depend on Vercel fallback behavior; there is no checked-in `vercel.json`. This must be verified against the actual deployment configuration.
- The deployed portfolio and Cash Splitter URLs could not be fetched by the audit browser, so their HTTP status is unverified.
- External GitHub Pages images, LinkedIn, GitHub, Instagram, WhatsApp, and individual Instagram reels could not be reliably validated in this environment. Treat them as “verification required,” not confirmed broken.
- The project anchor has an undefined `href` for six of seven projects. This is a functional/semantic broken state even though it does not navigate to a bad URL.
- Hero hash links work only on the home route where matching IDs exist.
- Two creative records point to the same Instagram reel; verify whether one is incorrect.
- The contact/hero external portrait assets are single points of failure outside the Vercel deployment.

## Duplicate code and dependencies

### Duplication and unused files

- Contact/social data is repeated in `Nav`, `HomePage`, `Contact`, and `App` footer; consolidate into typed site data.
- `NAV_LINKS` and `TECHS` are local constants while related content is centralized; move them into typed data/config modules.
- Profile and resume each exist twice with identical hashes.
- `react.svg`, `vite.svg`, `hero.png`, `dsijf.svg`, and `icons.svg` appear unused.
- Several home sections and route pages correctly reuse the same section components; retain this compositional pattern.
- The CSS override architecture duplicates and contradicts base declarations. Migration should establish tokens/components once, not port both files wholesale.

### Dependency migration notes

| Current dependency | Next.js decision |
| --- | --- |
| `react`, `react-dom` | Retain at versions compatible with the chosen latest stable Next.js release. Validate peer versions before install. |
| `react-router-dom` | Remove after feature parity; replace with App Router folders, `next/link`, `usePathname`, and `not-found.tsx`. |
| `three` | Keep only if an approved redesigned section needs 3D. Dynamically import client-side; otherwise remove to reduce bundle cost. |
| Vite/plugin/react-refresh | Remove only after the Next.js build is verified; replace scripts/config with Next.js. |
| ESLint packages | Reconfigure for Next.js/TypeScript; retain only packages actually required by the selected Next.js version. |
| React type packages | Retain/update for strict TypeScript compatibility. |

Required additions for the requested stack should be limited to Next.js, TypeScript, Tailwind CSS and its required tooling, GSAP, Lenis, and optionally SplitType if a lightweight local splitter is insufficient. Do not add Framer Motion. Check current stable/peer-compatible releases immediately before the migration install because package versions are time-sensitive.

No existing dependency is obviously unused in current runtime code except that the source-level type packages are development-only and normal. Three.js is used but disproportionately expensive. There are no environment variables or secret-bearing configuration files in the repository inventory.

## Reuse versus rewrite

### Reuse or migrate with typed adaptation

- Content facts from `src/data/index.js`, subject to the content-verification notes above.
- Route information architecture: Home, About, Work, Experience, Creative, Contact.
- Page-to-section composition pattern and limited/full section variants.
- Resume download, social/contact links, project list, timeline, service list, creative reel filtering, and Instagram source-link fallback.
- Conceptual interfaces of `PageHeader`, `SectionLink`, `Reveal`, `Work`, `Experience`, `Skills`, `About`, and `Contact` as reusable components.
- Existing reduced-motion intent, Escape handling, menu state, reel filtering, and lazy/offscreen animation intent.

### Rewrite or substantially refactor

- `App.jsx`, `main.jsx`, Router setup, route fallback, shared shell, and scroll restoration.
- `Nav` for Next links, server/client boundaries, robust dialog/navigation focus behavior, and minimal editorial presentation.
- `Hero`, because its visual language and raw scroll work conflict with the requested direction.
- `HeroCanvas`, unless intentionally retained as a lazy optional editorial accent.
- `Cursor`; default recommendation is remove it unless it proves accessible, pointer-aware, reduced-motion-aware, and performance-safe.
- `Reveal`/`useInView` into a GSAP-aware, reduced-motion-safe primitive used sparingly.
- `Reels` modal and third-party script lifecycle for accessibility, privacy, error handling, and App Router compatibility.
- All global styling into Tailwind utilities plus a small token/global stylesheet; do not translate every current selector mechanically.
- Asset delivery using `next/image`, `next/font`, compressed local media, explicit dimensions, and approved remote patterns only where unavoidable.
- SEO/metadata as App Router metadata, sitemap, robots, canonical data, and real 404 handling.

## Migration risks

1. Browser-only code can cause `window is not defined`, hydration mismatch, or oversized client bundles if client boundaries are placed too high.
2. A one-shot replacement would make it difficult to compare feature parity and protect the deployed Vite app. Keep the Vite implementation intact until the Next.js build and all routes are verified.
3. Time-based greeting can hydrate differently; render it client-only or replace it with stable copy.
4. Third-party Instagram embeds can fail under privacy blockers/CSP and complicate hydration; always keep a direct source link.
5. External images may disappear or lack reuse permission. Confirm ownership and download/optimize only approved assets.
6. The 25 MB MP4 and WebGL hero threaten LCP, mobile memory, battery usage, and Vercel bandwidth.
7. Lenis, ScrollTrigger, native smooth scrolling, route scroll restoration, and pinned sections can conflict unless initialized and cleaned up in one client provider.
8. GSAP React Strict Mode cleanup must use scoped contexts/hooks to prevent duplicate triggers.
9. Current text encoding artifacts can be propagated into typed data unless normalized deliberately.
10. Employer/project statements require confidentiality review; do not add screenshots, internal URLs, unpublished outcomes, or metrics.
11. App Router static generation and remote images require explicit configuration, metadata, and deployment verification.
12. Existing dirty changes must not be overwritten. Their route animation can be used as behavioral reference, not blindly ported.

## Asset migration plan

1. Create a manifest recording source, owner/permission, usage, dimensions, byte size, alt text, and public/private status.
2. Retain the favicon and public resume initially; keep one canonical resume copy and confirm the PDF is current/public.
3. Keep one canonical profile asset only after ownership is confirmed. Convert/resize to an efficient format through the Next image pipeline; do not commit a duplicate original.
4. Replace external GitHub Pages image dependencies with approved local originals where available. Otherwise retain remote URLs temporarily and label them as migration placeholders in code/config.
5. Request real, publishable project imagery. Until supplied, use clearly labeled neutral placeholders or typography-led project layouts—never private employer screenshots.
6. Compress/replace `0722.mp4`, add a poster, and provide an accessible non-video fallback. Do not ship the current 25 MB file unchanged without a measured justification.
7. Remove unused starter/legacy assets only in a later reviewed cleanup after a reference scan and visual parity check.
8. Configure `next/image` remote patterns narrowly if any external host remains; never use a broad wildcard without need.

## Proposed Next.js folder structure

```text
portfolio/
├─ app/
│  ├─ (site)/
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ creative/page.tsx
│  │  ├─ experience/page.tsx
│  │  ├─ work/page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ layout/          site header, navigation, footer, smooth-scroll provider
│  ├─ motion/          reveal/split-text primitives and GSAP utilities
│  ├─ sections/        hero, intro, selected work, capabilities, timeline, creative, contact
│  └─ ui/              editorial link, media, divider, project index primitives
├─ content/
│  ├─ projects.ts
│  ├─ experience.ts
│  ├─ creative.ts
│  └─ site.ts
├─ lib/
│  ├─ motion.ts
│  └─ types.ts
├─ public/
│  ├─ images/
│  ├─ video/
│  └─ Mohammed_Rishin_C_K_Software_Developer.pdf
├─ docs/react-project-audit.md
├─ next.config.ts
├─ postcss.config.*
├─ tsconfig.json
└─ package.json
```

Default to server components. Add `'use client'` only to the navigation state, smooth-scroll provider, motion primitives, filters/modal, and any retained WebGL component. Keep content/data modules server-safe and strictly typed.

## Feature-parity checklist

- [ ] Six public routes render directly and through client navigation.
- [ ] Unknown routes return a designed 404 rather than silently redirecting.
- [ ] Shared minimal navigation, footer, active route state, menu Escape handling, and body scroll lock work.
- [ ] Home retains identity/availability, intro, selected work, capabilities, experience preview, creative preview, and contact CTA.
- [ ] All seven project records are preserved; unavailable links render as non-link content.
- [ ] All seven experience/education/workshop records are preserved pending verification.
- [ ] All service/technology content is preserved without strengthening claims.
- [ ] Six creative records, categories, filtering, direct Instagram links, and graceful embed fallback work.
- [ ] Email, LinkedIn, GitHub, Instagram, WhatsApp, and resume links are present and verified.
- [ ] Resume downloads with the intended filename.
- [ ] Approved profile/project/creative media appears with correct alt text and dimensions.
- [ ] Route changes restore expected scroll position without fighting Lenis.
- [ ] Keyboard navigation, focus visibility, menu/modal focus management, Escape, and focus restoration pass.
- [ ] Reduced-motion mode disables smooth scrolling, JS parallax/pinning, split animations, cursor motion, and autoplay-like decorative motion where appropriate.
- [ ] No hydration, runtime, console, failed-request, or ScrollTrigger cleanup errors.
- [ ] Route-specific title/description/canonical/OG metadata, sitemap, robots, and favicon work.
- [ ] Responsive checks pass at 320, 375, 768, 1024, 1440+ px, landscape mobile, 200% zoom, and keyboard-only use.
- [ ] Images/video/fonts are optimized; LCP/CLS/INP and bundle size are measured.
- [ ] `lint`, strict TypeScript check, production build, and representative accessibility/performance checks pass.
- [ ] Vercel preview deployment is reviewed before production alias/domain changes.
- [ ] Existing production deployment remains available until replacement verification is complete.

## Redesign roadmap

1. **Migration scaffold:** establish Next.js App Router, strict TypeScript, Tailwind, metadata shell, and parallel route parity while leaving the Vite app recoverable. Validate every route before removing Router/Vite dependencies.
2. **Typed content and assets:** migrate facts to typed modules, reconcile only user-approved content inconsistencies, create the asset manifest, and introduce optimized approved media/placeholders.
3. **Editorial foundation:** define warm-white/deep-black tokens, serif/sans typography, grid, spacing scale, dividers, responsive type, minimal header/footer, and accessible primitives.
4. **Page storytelling:** redesign home and project presentation around typography, large media, asymmetric editorial compositions, full-screen black interludes, and truthful developer case-study structure. Avoid dashboard cards and avoid copying the reference layout.
5. **Motion layer:** add Lenis solely for scrolling; add scoped GSAP/ScrollTrigger timelines and a lightweight split-text utility only where editorial hierarchy benefits. Use CSS for hover/focus transitions and implement reduced-motion fallbacks first.
6. **Creative/contact refinement:** build an accessible reel/media experience and clear contact/resume pathways with resilient third-party fallbacks.
7. **Quality and launch:** test accessibility, responsive behavior, metadata, broken links, media loading, bundle splitting, Web Vitals, hydration, console output, and Vercel preview. Promote only after parity and user review.

## Assumptions and review items

- Repository content is treated as user-provided but not automatically verified as current or public.
- No resume text was extracted or used to invent new site claims; the PDF is inventoried only.
- Existing employer wording is preserved as the maximum disclosure level until the user approves changes.
- Externally hosted portraits/reel thumbnails are not assumed to be licensed for copying into the new repository.
- The current deployment remains untouched; no Vercel project/domain action was taken.
- Package version selection is deferred to the migration phase and must be checked against current official compatibility at that time.

## Phase 0 validation record

- `npm.cmd ls --depth=0`: passed; dependency tree resolves.
- `npm.cmd run lint`: passed with no reported lint errors.
- `npm.cmd run build -- --outDir ..\phase0-build`: passed; 53 modules transformed. Output: CSS 40.75 kB (8.32 kB gzip), JS 879.15 kB (247.77 kB gzip). Vite emitted a large-chunk warning.
- Default `npm.cmd run build`: compilation began but Vite could not delete a pre-existing sandbox-protected `dist/assets` file (`EPERM`). The fresh-output build above confirms the source compiles.
- Git working tree after audit: only the two pre-existing user modifications plus this audit document; application source was not changed by Phase 0.

