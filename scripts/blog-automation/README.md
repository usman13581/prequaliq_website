# Monthly blog drafting (chat workflow)

Cursor Automations are **not** used. At the start of each month, ask in chat to draft **one post per service** (11 posts), with weekday `publishedAt` times in **09:00–17:00 Europe/Stockholm**.

## How it goes live

1. Posts are added to `scripts/blog-posts-YYYY.mjs` (and covers), then seeded to the DB as `status: "published"` with future or past `publishedAt`.
2. The **public site only lists/shows a post when `publishedAt <= now`**.
3. Past and “today” posts appear on `/blog`; future-dated posts stay hidden until their date/time (page revalidates hourly).
4. Admin can still see all posts in `/admin/blogs`.

## Helpers (optional)

```bash
node scripts/blog-automation/pick-month-schedule.mjs YYYY MM
```

Emits random weekday slots for all 11 services — useful when drafting the month’s dates in chat.

See [post-format.md](./post-format.md) for content shape.
