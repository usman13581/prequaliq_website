-- Clear any previous blog content before seeding procurement insights.
-- Content is inserted by scripts/seed-procurement-blogs.mjs (one post per month,
-- Feb 2022–Oct 2026). Run that script after migrate on deploy/start.
DELETE FROM "blog_posts";
