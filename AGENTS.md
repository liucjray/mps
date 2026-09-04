# Repository Guidelines

## Project Structure & Module Organization

- `app/` contains the Next/Vinext site: shared content in `site.ts` and `services.ts`, route pages in `page.tsx` and `services/[slug]/page.tsx`, optional GA4 integration in `google-analytics.tsx` and `google-analytics-tracker.tsx`, and shared styling in `globals.css`.
- `public/` contains static images, SVGs, QR codes, crawler files, and social assets.
- `tests/` contains Node’s built-in test suite for rendered HTML, metadata, SEO/AEO signals, and deployable content.
- `scripts/` contains bounded install/build and artifact-validation helpers; `worker/` contains the Cloudflare Worker entrypoint.
- `db/`, `examples/d1/`, and `drizzle.config.ts` are optional D1/Drizzle surfaces. Planning notes belong in `docs/todo/`.

## Build, Test, and Development Commands

- `npm run dev` starts the local Vite/Vinext development server at `http://localhost:1102`.
- `npm run build` creates and validates the Cloudflare deployable artifact.
- `npm run start` serves the built application locally at `http://localhost:1102`.
- `npm test` runs the build plus `node:test` rendered-HTML checks.
- `npm run lint` runs ESLint across the repository.
- `npm run validate:artifact` rechecks an existing deployment artifact.

Use Node.js `>=22.13.0`. Keep the local preview port fixed at `1102`; do not change the Vite `strictPort` setting. Run `npm run install:ci` only when a clean lockfile install is needed.

## Coding Style & Naming Conventions

Use TypeScript/TSX with two-space indentation, semicolons, and the existing double-quote style. Keep components small and prefer shared constants for site-wide content. Use `camelCase` for TypeScript identifiers, kebab-case slugs and asset filenames, and descriptive `aria-label`/image alt text. Match the existing compact CSS style and avoid unrelated reformatting.

## Testing Guidelines

Add or update assertions in `tests/rendered-html.test.mjs` when changing visible content, metadata, routes, structured data, or analytics markup. Run `npm test` and `npm run lint` before submitting changes. For GA4 changes, also test once with `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEST123 npm test`. Visual changes should also be checked at desktop and mobile widths.

## Shared Memory and Multi-Agent Handoff

The MPS Obsidian vault is the shared memory source for this project. Its Windows path is `C:\Users\user\obs-notes\Projects\mps` (WSL path: `/mnt/c/Users/user/obs-notes/Projects/mps`). When working in a new session or as a different agent, read these notes before making decisions:

1. `00-總覽.md` for project identity, source priority, and navigation.
2. The relevant note for the requested area (brand, service, knowledge, SEO/AEO, marketing, or technology).
3. `99-待確認/待確認事項.md` before writing public claims, health-related content, advertising copy, pricing, procedures, qualifications, contraindications, or operating rules.

When website facts, content, SEO/AEO, analytics, advertising, deployment, or operational decisions change, update the corresponding note under `Projects/mps` in the same task. Add the source, confirmation status, and update date. If a fact is unknown or conflicts with another source, record it in `99-待確認/待確認事項.md`; do not silently guess or overwrite the established source boundary.

All brand, location, contact, service-area, CTA, and public-facing copy must remain centered on the New Taipei Shuanghe Store. The teacher's Mavis Facebook page is background-only and must not be used as evidence for Shuanghe Store facts. Keep medical, legal, advertising, and privacy boundaries explicit in both code and Obsidian notes.

Before handing off work, verify that the code, public crawler files, repository docs, and relevant Obsidian notes do not contradict one another. The Obsidian vault has its own `CLAUDE.md`; follow its formatting and linking conventions. Do not automatically commit or push changes in `C:\Users\user\obs-notes`; leave vault version-control decisions to the user.

## Skill-Assisted Review

For UI or responsive design changes, use the `frontend-design` skill, then verify with local desktop/mobile screenshots. For metadata, structured data, sitemap, robots, or AI-search changes, use `seo-aeo-best-practices` and verify rendered HTML with `npm test`. Read selected skill instructions completely and use only the relevant skill.

## Dual-Model Development & Quality Gate (Mandatory Workflow)

Every development task must follow this 4-step quality gate lifecycle:

1. **agy Development & Self-Validation**:
   - Complete implementation and update tests in `tests/rendered-html.test.mjs`.
   - Run `npm run lint` and `npm test` locally to eliminate syntax, type, and assertion errors before calling review.
2. **Independent Review via `codex-review`**:
   - Invoke the `codex-review` skill using local `codex` CLI (`gpt-5.6-luna`, read-only sandbox mode) to review uncommitted changes.
3. **agy Remediation & Verification Loop**:
   - Cross-check review findings against `AGENTS.md` and regulatory/medical boundaries.
   - If genuine issues are found (anatomical accuracy, unverified claims, missing boundaries, edge cases), agy fixes the code and re-runs `npm test`.
   - Re-run review or verify until all valid P1/P2 issues are resolved.
4. **Handoff & Summary**:
   - Conclude with a clean summary of user-visible changes, test results, and review verification before handoff or commit.

## Commit & Pull Request Guidelines

Use concise conventional-style commits, such as `feat: 加入 LINE 預約入口`, `fix: ...`, or `style: ...`. Pull requests should explain the user-visible change, list validation commands, and include desktop/mobile screenshots for visual work. Keep deployment/config changes clearly separated from content changes when practical.

## Security & Deployment Notes

Never commit `.env.cloudflare`, analytics credentials, or tokens; use documented environment names and GitHub Actions Repository Variables for public build configuration. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is a public GA4 identifier, not a secret, and must be supplied at build time. A push to `main` triggers the Cloudflare deployment workflow, so verify tests and the diff before pushing.
