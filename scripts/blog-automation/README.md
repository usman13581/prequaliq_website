# Blog automation

Cursor Automations drive monthly blog publishing for this repo. Agents open **PRs only** — never push to `main`.

## Cadence

- **1st of each month:** Month planner creates `scripts/blog-schedule/YYYY-MM.json` with **one slot per service** (11 services) and opens a PR.
- **Daily (~08:00 Europe/Stockholm):** Day writer checks today’s Stockholm date against merged schedules. For each due `planned` slot, it generates a post and opens a content PR.

## Services (exactly one post each per month)

- `web-and-mobile-apps`
- `custom-software`
- `ui-ux-design`
- `cloud-solutions`
- `system-integration`
- `legacy-modernization`
- `ai-solutions`
- `data-analytics`
- `dedicated-teams`
- `it-consulting`
- `maintenance-support`

## Publish times

- Weekdays only (Mon–Fri)
- Random time between **09:00 and 17:00** Europe/Stockholm
- Offset `+01:00` (CET) or `+02:00` (CEST) as appropriate for the date
- Spread slots across the month; same calendar day only if weekdays are scarce — then use different times

## PR rules

- Never commit directly to `main`
- Never force-push
- Schedule PR title: `chore(blog): schedule <Month> <Year> posts (1 per service)`
- Content PR title: `Add <Month> <Year> blogs: <service-slugs>`
- After merge, deploy (`npm start` seed chain) publishes to Postgres

## Helper

```bash
# Emit schedule JSON for a month (defaults to current UTC month)
node scripts/blog-automation/pick-month-schedule.mjs
node scripts/blog-automation/pick-month-schedule.mjs 2026 10
```

Write the printed JSON to `scripts/blog-schedule/YYYY-MM.json` in the schedule PR.

## Day writer checklist

1. Read `scripts/blog-schedule/YYYY-MM.json` for the current month (and prior month if near month boundary).
2. Select slots where Stockholm **date** is today and `status` is `planned`.
3. Skip if a post for that `serviceSlug` already exists in `scripts/blog-posts-YYYY.mjs` with the same `publishedAt` date, or an obvious duplicate slug for this month+service.
4. Follow [post-format.md](./post-format.md).
5. Append posts to `scripts/blog-posts-YYYY.mjs`, update `scripts/blog-cover-images.mjs`, add cover file under `static_resources/images/blog/covers/` when seeding expects it.
6. Set due slots to `status: "pr_opened"` in the schedule file (same PR).
7. Open one PR for all posts due that day.

## Stop

- Pause the automation in Cursor Automations
- Leave schedule or content PRs unmerged
- Close a PR to discard a draft
