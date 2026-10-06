<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

The Cloud Agent environment installs PostgreSQL 16 and Node dependencies, then on boot starts Postgres, applies Drizzle migrations, and runs `npm run dev` at http://127.0.0.1:3000.

- Local database (localhost trust auth, no password): `postgresql://prequaliq@127.0.0.1:5432/prequaliq_website`. Set `DATABASE_URL` to override it.
- Blog, contact, careers, projects, and admin routes read that database. Marketing pages such as `/`, `/products`, and `/services` do not.
- `npm run dev` copies `static_resources` into `public/static_resources` before Next.js starts. `npm run build` does the same via `prebuild`.
- `RESEND_API_KEY` is optional. Contact submissions are stored without it; confirmation email is skipped.
- `OPENAI_API_KEY` is optional. The site chat assistant stays unavailable until that key is set and `npm run chat:index` has been run.
- Admin login needs `ADMIN_PASSWORD` plus `ADMIN_SESSION_SECRET` (at least 32 characters). When the secret is unset, boot writes one to `/var/lib/prequaliq-dev/admin_session_secret`. With `ADMIN_PASSWORD` set, boot runs `npm run db:seed-admin`.
- Lint with `npm run lint`. Typecheck with `npx tsc --noEmit`. There is no automated test script.
