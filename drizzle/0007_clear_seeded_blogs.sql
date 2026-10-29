-- Remove previously seeded / historical blog content so Insights can start clean.
-- Images cascade via blog_images.post_id ON DELETE CASCADE.
DELETE FROM "blog_posts";
