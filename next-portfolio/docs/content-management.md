# Portfolio content management

All editable portfolio records are exposed through `src/data/index.ts`. Keep the records in the focused files below; application code should import them from `@/data`.

## Where to edit

- `src/data/site.ts`: name, website URL, biography summary, navigation, email, phone/WhatsApp, social profiles, résumé path, technologies, and services.
- `src/data/projects.ts`: projects and case studies. Add a complete `Project` object to the `projects` array; its `slug` becomes `/work/[slug]` automatically.
- `src/data/experience.ts`: professional experience, education, leadership, and workshops. Use `kind` to place an entry in the correct Experience section.
- `src/data/creative.ts`: creative gallery entries, thumbnails, categories, durations, and Instagram source links.
- `src/data/content.ts`: page metadata, homepage copy, About copy, capabilities, and homepage featured-project selection.

## Feature a project on the homepage

Add its exact project `slug` to `homeContent.featuredProjectSlugs` in `src/data/content.ts`. Do not use an array index: slug-based selection remains correct if projects are reordered.

## Add a project

Add an object to `projects` in `src/data/projects.ts`. Required fields are enforced by the `Project` TypeScript type. Do not add private URLs, employer screenshots, internal implementation details, or unverified outcomes.

## Update contact information or résumé

Edit `siteConfig` and `socials` in `src/data/site.ts`. Place the replacement résumé in `public/` and update `siteConfig.resumeUrl` to match its public path.

## Validate an edit

Run:

```bash
npm run lint
npm run typecheck
npm run build
```
