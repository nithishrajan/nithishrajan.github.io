# ~/site: personal website

A blog ("logs"), photos and videos ("ephemera"/"the desk") and books ("the shelf").
Static Astro 5 site. Content is Markdown in the repo. No database, no UI framework.

## Design principles (keep every change on-theme)
- **A warm terminal on a lived-in desk.** Tech accents (mono labels, `~/` paths, `//` comments, commit hashes, a blinking cursor) on warm paper/amber/terracotta colors. Never cold hacker green.
- **Spontaneity is the main takeaway.** Things should shift a little on each visit: random greeting, archive pick, scattered prints, `surprise me` / the `r` key, "pick my next read". New features should find a way to add a little surprise.
- **Simple.** Plain CSS with the variables in `src/styles/global.css`, scoped `<style>` in components, and tiny vanilla `<script>`s. Don't add React/Tailwind/etc.
- Fonts: JetBrains Mono for UI chrome, Newsreader for reading text.
- All randomness happens client-side, because the site is static.
- Must work at 390px width and in both light and dark themes. Respect `prefers-reduced-motion`.

## Commands
- `npm run dev`: dev server at http://localhost:4321
- `npm run build`: build to `dist/` (fails on bad frontmatter, which is intended)
- `npm run preview`: serve the build
- Node is 20.x on this machine, so Astro is pinned to v5. Astro 6+ needs Node 22+.

## Adding content
| What | Where | Notes |
|---|---|---|
| Blog post | `src/content/blog/<slug>.md` | `title, date, description, tags[], draft?` |
| Ephemera | `src/content/ephemera/<slug>/index.md` + images in the same folder | `title, date, type: photo\|video\|gallery, images: [./x.jpg], video?: <embed URL>, caption?, location?`. For videos, `images[0]` is the poster. |
| Book | `src/content/books/<slug>.md` | `title, author, spineColor, status: read\|reading\|want, rating? 1-5, recommended?, dateRead?, blurb?, cover?, tags[]` |
| "now" box | `src/content/now.json` | reading, lastPlace, workingOn, listening, timezone, updated |
| Greetings | `src/data/greetings.ts` | one is picked at random on each visit |

Schemas live in `src/content.config.ts`. Books only show up in the home feed once they have a `dateRead`.

## Map
- `src/layouts/Base.astro`: nav, footer, theme toggle, global scripts (relative time, surprise me / `r` key)
- `src/lib/feed.ts`: collection getters and the merged "git log of life" feed
- `src/pages/random.json.ts`: the URL list that surprise me picks from
- Components: `Greeting`, `NowBlock`, `LifeLog`, `ArchivePick`, `PrintScatter`, `BookSpine`, `Rating`, `VideoEmbed`, `RelativeTime`, `SurpriseMe`

## TODO
- Set the real `site` URL in `astro.config.mjs` and the email in `src/pages/about.astro`
- Replace the seed content and placeholder images
- Deploy: push to GitHub, then connect to Cloudflare Pages or Netlify (build `npm run build`, output `dist`)
