# Blog post format (automation)

Match existing entries in `scripts/blog-posts-YYYY.mjs` (see 2026 for the current style).

## Required fields

| Field | Rules |
|-------|--------|
| `slug` | `YYYY-<service-or-topic-kebab>` unique; include year prefix |
| `serviceSlug` | Exact catalog slug from the schedule slot |
| `publishedAt` | ISO datetime from the schedule slot (do not invent a new time) |
| `imageUrl` | Tech-themed Unsplash URL (`auto=format&fit=crop&w=1400&q=80` or cover helper style) |
| `title` | Clear, enterprise tone; name the service theme |
| `excerpt` | 1–2 sentences, concrete, no hype fluff |
| `content` | HTML string: short intro `<p>`, 2–3 `<h2>` sections with `<p>` bodies, closing `<p>` that mentions PrequaliQ |

## Tone and constraints

- English only
- Enterprise / Stockholm IT partner voice
- Ground claims in plausible industry practice for the publish year — no fabricated customer names, logos, or metrics
- Do **not** invent individual PrequaliQ team member names
- Tie the piece to the scheduled `serviceSlug`
- Prefer concrete engineering / delivery language over marketing buzzwords

## Cover images

- Add a unique mapping in `scripts/blog-cover-images.mjs` for the new slug
- Prefer downloading/caching the JPEG under `static_resources/images/blog/covers/` using the naming pattern used by recent posts (`YYYY-…jpg`)
- Do not reuse another post’s Unsplash photo id in the same year if avoidable

## Module shape

Keep `export const blogPosts = [ ... ]` as a flat array. Append new objects before the closing `];`. Preserve formatting style of neighboring entries.
