# Month planner — paste into Cursor Automation instructions

Repo: usman13581/prequaliq_website (branch main). Open a PR only — never push to main.

Follow scripts/blog-automation/README.md.

When this automation runs (1st of the month):

1. Determine current year/month in Europe/Stockholm.
2. Run: `node scripts/blog-automation/pick-month-schedule.mjs YYYY MM`
3. Write stdout to `scripts/blog-schedule/YYYY-MM.json` (do not commit example-YYYY-MM.json changes).
4. Open a PR titled: `chore(blog): schedule <Month> <Year> posts (1 per service)`
5. PR body: list the 11 slots (service + publishAt). Say merge arms the day writer.

If `scripts/blog-schedule/YYYY-MM.json` already exists on main for this month, do nothing (or open no PR).
