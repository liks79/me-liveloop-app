# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at localhost:4321
npm run build        # astro check + build + pagefind index + copy to public/
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run format       # Prettier (format in place)
npm run format:check # Prettier (check only, used in CI)
npm run sync         # Sync Astro generated types
```

CI runs: `lint` → `format:check` → `build`. No dedicated test command exists.

## Architecture

**Framework**: Astro 5 static site generator based on the AstroPaper theme. All pages are statically generated at build time — no server-side rendering.

**Content**: Blog posts are Markdown files in `src/data/blog/`. They are loaded via Astro's content collections API (configured in `src/content.config.ts`). Files prefixed with `_` are excluded. The schema (Zod-validated) includes `pubDatetime`, `modDatetime`, `title`, `tags`, `description`, `featured`, `draft`, `ogImage`, and `canonicalURL`.

**Routing**: Dynamic routes use `getStaticPaths`:
- `src/pages/posts/[...page].astro` — paginated post list
- `src/pages/posts/[...slug]/index.astro` — individual post
- `src/pages/posts/[...slug]/index.png.ts` — per-post OG image (Satori → SVG → PNG via Resvg)
- `src/pages/tags/[tag]/[...page].astro` — posts filtered by tag

**Site config**: All site-wide settings live in `src/config.ts` (author, pagination limits, OG image mode, edit post URL, timezone, feature flags like `showArchives`, `dynamicOgImage`, `showBackButton`).

**Utilities** (`src/utils/`):
- `postFilter.ts` — excludes drafts; handles scheduled posts (publish after `pubDatetime - scheduledPostMargin`)
- `getSortedPosts.ts` — sorts by `modDatetime` falling back to `pubDatetime`
- `slugify.ts` — kebab-case slugs via `lodash.kebabcase`
- `generateOgImages.ts` — OG image pipeline; templates in `src/utils/og-templates/`

**Layouts** (`src/layouts/`):
- `Layout.astro` — base HTML shell with SEO meta, JSON-LD, RSS link, ClientRouter (view transitions)
- `Main.astro` — page wrapper with optional breadcrumb
- `PostDetails.astro` — post shell; injects scroll progress bar, heading anchor links, code copy buttons, prev/next navigation
- `AboutLayout.astro` — wraps `about.md`

**Styling**: Tailwind CSS v4. Dark mode via class on `<html>`. Post body uses `app-prose` class (typography plugin). Prettier auto-sorts Tailwind classes.

**Search**: Pagefind — static index built during `npm run build`, output copied to `public/pagefind/`. No backend required.

**Middleware** (`src/middleware.ts`): 301-redirects legacy `/en` and `/en/*` paths.

**Deployment**: Docker multi-stage build (Node → nginx). `docker-compose.yml` is for local dev only (runs `npm run dev`).

## Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## Commit Style

Conventional commits enforced via `cz.yaml`. Use prefixes like `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Git Rules
- Branch names must start with `claude/` (e.g., claude/feature-xxx)
- Never commit directly to the `main` or `master` branch
- Always report changes to the user and get approval before committing
- When creating a PR, remind the user to assign a reviewer

## Blog Authoring Workflow

Slash commands in `.claude/commands/` cover the full authoring loop:

| Command | What it does |
|---------|-------------|
| `/blog-research <topic>` | Web research → `research/<slug>/research.md` |
| `/blog-publish <slug>` | Research file → `src/data/blog/<slug>.md` draft |
| `/blog-preview [--dev\|--prod]` | Start local preview (`--dev` includes drafts; `--prod` builds first) |
| `/blog-pr <slug>` | Create branch, commit, open GitHub PR |
| `/image-gen <prompt> [--slug <slug>]` | Generate image via Gemini/Imagen → `research/<slug>/images/` |
| `/new-post <title>` | Create an empty post file directly |

`research/` is gitignored — it holds research notes and generated images before they are committed. See `research/GUIDE.md` for full workflow details.

## Notes

- `no-console` is an ESLint error — avoid `console.log` in source files.
- Draft posts (`draft: true`) are excluded from production builds but visible in dev.
- Dynamic OG images are controlled by `SITE.dynamicOgImage` in `src/config.ts`.
- No posts exist in the `main` branch; all posts are preserved in the `post-backup` branch.
- Hosted on Cloudflare Pages; every PR gets an automatic preview URL from Cloudflare.

