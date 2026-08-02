# Deployment guide

## Preview-first policy

Deploy from `next-portfolio/` to a Vercel Preview deployment first. Do not assign the existing `rishin-portfolio.vercel.app` production alias until the preview checklist has passed and the owner has explicitly approved promotion.

## Current preview record

- Vercel project: `ono4/next-portfolio` (separate from the existing React deployment)
- Verified Preview: `https://next-portfolio-exk5blml0-ono4.vercel.app`
- Preview deployment ID: `dpl_GCiYxEkj9EhnU4vCHpK5LvyaVeZs`
- Inspector: `https://vercel.com/ono4/next-portfolio/GCiYxEkj9EhnU4vCHpK5LvyaVeZs`
- Status at verification: `READY`, target `Preview`
- Access: Vercel Deployment Protection is enabled; authenticated Vercel requests are required.

Vercel treats the first deployment of a newly created project as that new project's production target. The isolated project's initial deployment (`dpl_9wxcwyQE49JZrnN15mqhQEFEmY6d`) did not alter or replace `rishin-portfolio.vercel.app`. A second deployment was created and verified as the true Preview listed above. Neither deployment is connected to the existing production domain.

## Preview deployment

1. Check out `nextjs-editorial-redesign` and confirm the working tree is clean.
2. From `next-portfolio/`, run `npm ci`, `npm run lint`, `npm run typecheck`, and `npm run build`.
3. Authenticate with Vercel using an account authorized to create a separate preview project or deployment.
4. Run `vercel` from `next-portfolio/` and answer **No** when asked to deploy to production. If linking manually, set the framework preset to Next.js and leave the root directory as `next-portfolio` when the Vercel project is configured from the repository root.
5. Configure only the environment variables listed below for the Preview environment.
6. Verify the generated `*.vercel.app` URL before any domain or production-alias change.

## Environment variables

| Variable | Required | Visibility | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | No | Browser-visible | Trusted form-provider submission endpoint. Leave unset to use the validated `mailto:` fallback. Never place credentials or secret tokens here. |

No server secrets are required. An unset optional endpoint is a supported configuration, not a deployment error.

## Domain configuration

The checked-in canonical URL is `https://rishin-portfolio.vercel.app`. A Vercel preview intentionally keeps this production canonical until approval. After preview review:

1. Confirm the target Vercel project and deployment are correct.
2. Record the currently serving production deployment for rollback.
3. Promote the reviewed deployment or assign the existing domain in Vercel.
4. Confirm DNS and TLS are healthy.
5. Re-run the production verification checklist.

Do not configure the production domain on an unreviewed preview project.

## Production verification checklist

- [ ] Vercel build completes with no warnings requiring action.
- [ ] Home, About, Work, Experience, Creative, Contact, all project slugs, and the 404 page load on direct refresh.
- [ ] Navigation, browser history, mobile menu focus management, page transitions, scroll reveals, and reduced-motion behavior work.
- [ ] Portrait, Creative images, resume, favicon, Open Graph image, sitemap, and robots file load.
- [ ] Canonical, description, Open Graph, Twitter, and JSON-LD metadata are correct.
- [ ] Contact validation works; the configured provider succeeds or the default mail-client fallback opens safely.
- [ ] GitHub, LinkedIn, Instagram, WhatsApp, email, project, and resume links are correct.
- [ ] 320 px, 375 px, 430 px, tablet, landscape mobile, desktop, and large-desktop layouts have no horizontal overflow.
- [ ] Keyboard-only navigation and visible focus states work.
- [ ] Browser console has no application errors, hydration errors, or failed first-party assets.
- [ ] No secrets, private URLs, private repositories, customer information, internal screenshots, or confidential implementation details are exposed.

## Rollback

Vercel deployments are immutable. If verification fails after promotion, immediately reassign the production domain/alias to the recorded previous production deployment in the Vercel dashboard or redeploy that known-good deployment. The legacy React application remains preserved in the repository and can be redeployed independently if needed. Do not delete the previous deployment until the new production version has remained stable.
