# Repository Guidelines

## Project Structure & Module Organization

- `app/` contains the Next/Vinext site: shared content in `site.ts` and `services.ts`, route pages in `page.tsx` and `services/[slug]/page.tsx`, and shared styling in `globals.css`.
- `public/` contains static images, SVGs, QR codes, crawler files, and social assets.
- `tests/` contains Node’s built-in test suite for rendered HTML, metadata, SEO/AEO signals, and deployable content.
- `scripts/` contains bounded install/build and artifact-validation helpers; `worker/` contains the Cloudflare Worker entrypoint.
- `db/`, `examples/d1/`, and `drizzle.config.ts` are optional D1/Drizzle surfaces. Planning notes belong in `docs/todo/`.

## Build, Test, and Development Commands

- `npm run dev` starts the local Vite/Vinext development server.
- `npm run build` creates and validates the Cloudflare deployable artifact.
- `npm run start` serves the built application locally.
- `npm test` runs the build plus `node:test` rendered-HTML checks.
- `npm run lint` runs ESLint across the repository.
- `npm run validate:artifact` rechecks an existing deployment artifact.

Use Node.js `>=22.13.0`. Run `npm run install:ci` only when a clean lockfile install is needed.

## Coding Style & Naming Conventions

Use TypeScript/TSX with two-space indentation, semicolons, and the existing double-quote style. Keep components small and prefer shared constants for site-wide content. Use `camelCase` for TypeScript identifiers, kebab-case slugs and asset filenames, and descriptive `aria-label`/image alt text. Match the existing compact CSS style and avoid unrelated reformatting.

## Testing Guidelines

Add or update assertions in `tests/rendered-html.test.mjs` when changing visible content, metadata, routes, or structured data. Run `npm test` and `npm run lint` before submitting changes. Visual changes should also be checked at desktop and mobile widths.

## Skill-Assisted Review

For UI or responsive design changes, use the `frontend-design` skill, then verify with local desktop/mobile screenshots. For metadata, structured data, sitemap, robots, or AI-search changes, use `seo-aeo-best-practices` and verify rendered HTML with `npm test`. Read selected skill instructions completely and use only the relevant skill.

## Commit & Pull Request Guidelines

Use concise conventional-style commits, such as `feat: 加入 LINE 預約入口`, `fix: ...`, or `style: ...`. Pull requests should explain the user-visible change, list validation commands, and include desktop/mobile screenshots for visual work. Keep deployment/config changes clearly separated from content changes when practical.

## Security & Deployment Notes

Never commit `.env.cloudflare` or tokens; use `.env.cloudflare.example` for documented variable names. A push to `main` triggers the Cloudflare deployment workflow, so verify tests and the diff before pushing.
