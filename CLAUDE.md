# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Lucy Terry Prince: African American Experiences in Early Rural New England" — an interactive historical education app. Currently a work-in-progress wireframe; only the "Community Within Community" moment section is drafted to review level.

## Commands

```bash
npm run dev       # Dev server at localhost:5173
npm run prod      # Dev server at 0.0.0.0:8080
npm run build     # Production build
npm run preview   # Preview production build
```

No test framework is configured.

## Stack

- **SvelteKit v1** with `@sveltejs/adapter-node` (deployed to DigitalOcean App Platform)
- **Vite v4** build tool
- No TypeScript, no linting tools configured

## Architecture

### Data Sources

The app pulls from two sources:

1. **Remote Django API** at `https://lucy-proto.deerfield-ma.org/` — serves people, evidence, maps, topics, myths, and models. Endpoints follow the pattern `/{section}/api/` and `/{section}/api/{slug}`.

2. **Local JSON files** in `src/` — `moments.json` (timeline data) and `deerfieldMapPops.json` (SVG map popups).

### Route & Data Pattern

Every section follows the same SvelteKit pattern:
- `+page.server.js` — `load()` fetches from API or imports local JSON, returns data
- `+page.svelte` — receives `data` prop, renders content
- `[slug]/+page.server.js` / `[slug]/+page.svelte` — detail pages for individual items

### Key Data Shapes

**Moments** (local JSON): `slug`, `title`, `date`, `storyIntro`, `historyIntro`, `frames[]` — each frame has `imageName`, `storyAudio`, `soundFx`, `storyText`, `moreLinks[]`

**People/Evidence/Topics/Maps** (API): standard fields like `first_name`, `last_name`, `birth_year`, `death_year`, `bio.html`, `relateds[]`; Evidence adds `full_text.html`, `transcript`, `item_type`

### Notable Components

- **`Moment.svelte`** — scroll-linked image frame sequences with audio playback; most complex component
- **`DeerfieldMap.svelte`** — SVG-based interactive map with popup overlays
- **`MoreModal.svelte`** — modal for expanded detail content
- **`MainNav.svelte`** — global navigation with hamburger menu for mobile
- **`src/lib/stores.js`** — minimal store; currently only `isScrollMode`

### Asset Hosting

Images and audio are served from the Django backend: `/assets/{type}/images/` and `/assets/moments/audio/`.
