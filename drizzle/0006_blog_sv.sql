ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "title_sv" varchar(500);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "excerpt_sv" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "content_sv" text;
