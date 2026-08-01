# Next.js migration plan

Date: 2026-08-01  
Branch: `nextjs-editorial-redesign`  
Baseline commit: `a1aa281`

## Chosen strategy

Use a controlled parallel migration at the repository root:

```text
portfolio/       Existing Vite/React application (preserved and deployable)
next-portfolio/  New Next.js application
docs/            Repository-level migration documentation
```

This strategy was selected because the repository already contains the Vite application in a self-contained `portfolio/` folder. Building Next.js beside it provides the safest route-by-route comparison, prevents partial App Router changes from breaking the deployed application, and allows Vercel preview deployments to target `next-portfolio/` without changing the current production project.

Renaming `portfolio/` to `legacy-react/` now would create a large, low-value file move and could disturb the current deployment. The existing folder therefore remains unchanged until the Next.js application has verified feature parity.

## Preserved files and content

- Entire `portfolio/` Vite application, including its package lock, source, public assets, build configuration, and audit.
- Pre-migration checkpoint commit `a1aa281`.
- Six-route information architecture: home, about, work, experience, creative, and contact.
- Project, experience, creative, service, technology, contact, social, and resume content documented in the audit.
- Existing public deployment and Vercel configuration outside this repository.
- Employer-related project descriptions at their current public-summary level only.

No legacy file will be deleted until the Next.js replacement passes feature parity, quality checks, and preview review.

## Migration order

1. Create the parallel Next.js foundation with TypeScript, App Router, ESLint, Tailwind CSS, `src/`, and `@/*` imports.
2. Establish root layout, metadata, shared header/footer placeholders, route files, error boundaries, 404 behavior, font loading, and typed content modules.
3. Verify lint, strict TypeScript, production build, static/dynamic routes, and Vercel compatibility.
4. Migrate existing content and approved assets without changing claims.
5. Rebuild interactive parity as isolated client components: navigation behavior, creative filtering/embed fallback, and motion primitives.
6. Perform the editorial redesign after structural parity is stable.
7. Validate accessibility, reduced motion, responsive layouts, media performance, metadata, links, hydration, runtime, and console output.
8. Deploy `next-portfolio/` as a separate Vercel preview project or preview configuration.
9. After approval, update production deployment settings to the Next.js root. Preserve the legacy app and rollback point through a post-launch observation period.
10. Remove or archive the legacy implementation only in a separately reviewed cleanup.

## Rollback procedure

Before production cutover, rollback means continuing to serve the current Vercel project rooted at `portfolio/`; no production action is necessary. During or after cutover:

1. Reassign the production domain/alias to the last known-good legacy deployment, or restore the Vercel root directory to `portfolio/`.
2. Redeploy commit `a1aa281` if an explicit source rollback is needed.
3. Keep `next-portfolio/` isolated for diagnosis; do not rewrite legacy history or delete its assets.
4. Record the failed verification and fix it on the migration branch before another preview/cutover.

## Deployment plan

- Phase development and checks run from `next-portfolio/`.
- Create a separate Vercel preview deployment with Root Directory set to `next-portfolio`.
- Do not modify the existing production domain or Vercel project during migration.
- Verify direct loading of every route, dynamic project routes, 404/error UI, resume/media paths, metadata, and build logs on preview.
- Run user review and parity checks against the still-live Vite site.
- Promote the verified Next.js deployment by changing the production project's root or domain alias only after explicit approval.

## Known risks

- Browser-only legacy features can cause hydration errors if migrated above narrow client boundaries.
- Third-party Instagram embeds and GitHub Pages images can fail independently of Vercel.
- Employer content must remain limited to approved public summaries.
- The legacy 25 MB video and large profile image need an approved optimization plan before migration.
- Next.js 16 route/error APIs differ from older versions; implementation follows the installed local documentation.
- Tailwind CSS 4 uses CSS-first configuration through `@theme` and the PostCSS plugin rather than requiring a legacy JavaScript config file.
- Google font fetching can affect builds without network/cache access; Vercel normally resolves this during build, and local validation must confirm it.
- The current official scaffold (`next@16.2.12`) reports three high-severity transitive audit findings through its pinned PostCSS `8.4.31` and optional Sharp `^0.34.5` dependencies. npm proposes an unsafe downgrade to Next `9.3.3`; patched PostCSS `8.5.25` and Sharp `0.35.3` are outside Next's current pinned/declared ranges. Do not use `npm audit fix --force` or untested overrides. Recheck for a patched stable Next.js release before preview deployment and launch.
- Deployment root selection is critical because the repository temporarily contains two independent applications.

## Phase boundaries

Phases 1–2 provide only a neutral, accessible application shell and typed content foundation. GSAP, ScrollTrigger, Lenis, SplitType, final media, and the premium editorial redesign are intentionally deferred until later phases.
