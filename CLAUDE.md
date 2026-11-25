# Nithish Rajan: personal site

A static Astro 5 site, deployed to https://nithishrajan.github.io on every push to `main` (`.github/workflows/deploy.yml`).

## Design principles
- **Simple and quiet.** Photos come first, there's very little text, and there are no tech/terminal references (no monospace, `~/`, code jokes or commit hashes).
- **Colors:** warm cream paper, dark ink, amber accent and terracotta for highlights. Dark mode is a warm charcoal. Tokens are in `src/styles/global.css`.
- **Type:** Newsreader serif only.
- Plain CSS with scoped `<style>` blocks and no UI framework. Avoid JS unless it's really needed.
- Must work at 390px width and in light and dark mode.

## Sections (nav at top right)
| Link | URL | Content lives in |
|---|---|---|
| (home) | `/` | `src/assets/home/`: a curated photo stream, in filename order (`01.jpg`, `02.jpg`, …) |
| me | `/me/` | `src/assets/me/`: photos of me, in filename order |
| ephemera | `/ephemera/` | `src/content/ephemera/<slug>.md`: writing (`title, date, description?, draft?`) |
| snapshots | `/snapshots/` | `src/content/snapshots/<slug>/index.md` + images (`title, date, type?: photo\|gallery\|video, images: [./a.jpg], video?, caption?, location?`) |
| literature | `/literature/` | `src/content/literature/<slug>.md` (`title, author, status: reading\|read\|want, date, spineColor?, rating?, recommended?, blurb?, cover?`) |
| SF | `/sf/` | `src/data/sf-spots.json`: places I eat and drink, shown on a Leaflet map (`name, category: restaurant\|bar\|coffee\|dessert, rating, neighborhood, lat, lng`; lat/lng null = no pin) |

Books are one list sorted by `date`, newest first, so books you're currently reading sit among the finished ones. For a `reading` book, `date` is the day you started it.

Schemas are in `src/content.config.ts` and helpers in `src/lib/feed.ts`.

## Commands
- `npm run dev`: http://localhost:4321
- `npm run build`: fails on bad frontmatter, which is intended
- Publish: `git add -A && git commit -m "…" && git push`
- Node is 20.x locally, so Astro is pinned to v5.
