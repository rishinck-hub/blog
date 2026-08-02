# Portfolio redesign

## Architecture overview

The portfolio is a statically generated Next.js 16 application using TypeScript, React 19, the App Router, and Tailwind CSS 4 tooling. Pages and content default to Server Components. Client Components are limited to navigation, forms, the Creative preview, smooth scrolling, and animation behavior that requires browser APIs.

The original React application remains preserved beside `next-portfolio/`. The new application is independently buildable and deployable, which keeps rollback straightforward.

## Migration summary

The previous React routes, biography, experience, projects, Creative work, portrait, resume, contact details, and social links were inventoried and migrated into typed Next.js data modules. React Router routes became App Router directories, internal navigation uses `next/link`, images use `next/image` where appropriate, and browser-only code is isolated in client components. The editorial redesign was applied only after feature parity and production builds were verified.

## Folder structure

```text
next-portfolio/
├── docs/                 project, design, contact, and deployment documentation
├── public/               portrait, resume, and favicon
└── src/
    ├── app/              routes, layouts, metadata endpoints, and route CSS
    ├── components/       animation, layout, navigation, forms, projects, sections, and UI
    ├── data/             projects, experience, Creative work, and shared site data
    ├── lib/              metadata and motion configuration
    ├── styles/           shared editorial design system
    └── types/            strict content types
```

## Routing structure

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/work` | `src/app/work/page.tsx` |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` |
| `/experience` | `src/app/experience/page.tsx` |
| `/creative` | `src/app/creative/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| unknown routes | `src/app/not-found.tsx` |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | generated App Router metadata files |

Project paths are statically generated from `src/data/projects.ts`.

## Design and typography systems

`src/styles/design-system.css` defines the warm-white and black palette, accessible inverse colors, fluid type scale, responsive gutters, editorial grid, section rhythm, dividers, image ratios, focus styles, touch targets, and reduced-motion rules. Route CSS composes those primitives without dashboard cards, bright accents, heavy shadows, or decorative effects that impair reading.

Instrument Serif is the display face and Geist is the body/interface face, loaded through `next/font`. Display, page-title, project-title, body, caption, metadata, label, and navigation treatments use fluid `clamp()` sizing to prevent narrow-screen overflow.

## Motion system

`src/lib/motion.ts` centralizes timing, distance, easing, stagger, and capability checks. GSAP and ScrollTrigger power coordinated text, image, divider, and scroll reveals. Every component scopes animations with a GSAP context and reverts it on unmount. CSS transitions handle simple hover and focus feedback.

Lenis is initialized once in the motion provider and synchronized with the GSAP ticker. ScrollTrigger is refreshed after route and layout changes. Advanced motion is disabled or simplified for reduced-motion users, touch-oriented devices, and viewports at or below 900 px. Page transitions and the first-session loader are brief and never deliberately delay application loading.

## Project data

Projects implement the strict `Project` type in `src/types/content.ts`. Each record supports a slug, title, subtitle, year, category, role, technologies, summary, optional narrative sections, optional links/media, confidentiality status, and a neutral visual tone.

### Add a project

1. Add a typed record to `src/data/projects.ts` using a unique lowercase kebab-case `slug`.
2. Use only verified descriptions, roles, technologies, dates, links, and outcomes.
3. Place approved public media in `public/` and reference it with a root-relative path, or add an approved remote host to `next.config.ts`.
4. Set `isConfidential: true` for employer-context work that requires neutral visuals and omitted details.
5. Run lint, type checking, and the production build. The case-study route and sitemap are generated automatically.

Never add customer data, internal URLs, private repositories, employer code, private screenshots, credentials, or confidential architecture details.

## Content maintenance

### Experience

Edit `src/data/experience.ts`. Preserve the `ExperienceEntry` structure and distinguish professional, education, and development entries. Do not add unverified responsibilities or dates.

### Images and Creative work

Replace the portrait at `public/profile.png` while preserving a suitable portrait crop and useful dimensions. Update Creative entries in `src/data/creative.ts`; use approved public assets and meaningful names. `GalleryImage` displays an accessible labelled fallback when remote media cannot load. Keep dimensions/aspect ratios stable to avoid layout shift.

### Resume

Replace `public/Mohammed_Rishin_C_K_Software_Developer.pdf` with the current public resume, retaining the filename, or update `resumeUrl` in `src/data/site.ts`. Verify that no private contact, customer, or employer information is included.

### Social links and contact information

Update `socials` in `src/data/site.ts` for email, LinkedIn, GitHub, Instagram, and WhatsApp. The same module controls the site name, canonical URL, description, navigation, and resume URL. Recheck JSON-LD and metadata after identity or domain changes.

The contact form uses `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` only when a trusted browser-safe provider endpoint is configured. Otherwise it validates the fields and opens a prefilled email draft. See `docs/contact-form-configuration.md`.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. The only supported variable is optional:

```dotenv
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

Because `NEXT_PUBLIC_*` values are shipped to browsers, never store API keys, access tokens, passwords, or provider secrets in this variable.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

Run commands from `next-portfolio/`. Node.js 20 or a current Vercel-supported Node runtime is recommended.

## Deployment and rollback

Deploy to a separate Vercel Preview first, validate it, and obtain explicit approval before moving the existing production domain. Environment setup, domain handling, production checks, and immutable-deployment rollback steps are documented in `docs/deployment.md`.

If rollback is needed, restore the prior Vercel deployment alias. The preserved legacy React application remains an additional recovery path until the Next.js replacement is approved and stable.

## Accessibility

Each page has one logical heading and uses the root main landmark. The site includes skip navigation, visible focus states, semantic navigation and forms, accessible validation, meaningful image alternatives, keyboard-operable dialogs, focus traps, Escape-to-close behavior, 44 px touch targets, and no essential hover-only information. Re-test using only a keyboard whenever navigation, dialogs, forms, or page hierarchy changes.

## Performance

Pages and project routes are statically generated. `next/image` supplies responsive formats and dimensions; below-the-fold media is lazy loaded. Fonts use `next/font`, browser listeners are scoped and cleaned up, motion favors transforms and opacity, and heavy behavior is reduced on smaller/touch devices. Avoid adding autoplay media, duplicate animation libraries, unnecessary client boundaries, or unused dependencies.

## Reduced motion

The motion system checks `prefers-reduced-motion` before creating advanced timelines. Global CSS removes nonessential animation and smooth scrolling for reduced-motion users. Content, navigation, dialogs, forms, and project information remain fully available without animation.

