# Day writer — paste into Cursor Automation instructions

Repo: usman13581/prequaliq_website (branch main). Open a PR only — never push to main.

Follow scripts/blog-automation/README.md and scripts/blog-automation/post-format.md.

When this automation runs (daily ~08:00 Europe/Stockholm):

1. Compute today’s calendar date in Europe/Stockholm.
2. Load `scripts/blog-schedule/YYYY-MM.json` for the current month (also check previous month near the 1st).
3. Find slots where `status` is `planned` and `publishAt` date (Stockholm) equals today.
4. If none: stop with no changes / no PR.
5. For each due slot:
   - Write a fresh English post for that `serviceSlug` using the slot’s exact `publishedAt`.
   - Append to `scripts/blog-posts-YYYY.mjs` (create the year module if missing, matching prior years’ export shape).
   - Add cover mapping in `scripts/blog-cover-images.mjs` and cover JPEG under `static_resources/images/blog/covers/` when that is the current pattern.
   - Set the slot `status` to `pr_opened` in the schedule JSON.
6. Open one PR for all posts due today. Title: `Add <Month> <Year> blogs: <comma-separated-service-slugs>`
7. Do not invent team member names. Do not merge the PR.
