-- PrequaliQ website database setup (run once as PostgreSQL superuser)
-- Keeps website data separate from the existing prequaliq_db application.

CREATE ROLE prequaliq_website_app WITH LOGIN PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
CREATE DATABASE prequaliq_website OWNER prequaliq_website_app;

\c prequaliq_website

GRANT ALL ON SCHEMA public TO prequaliq_website_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO prequaliq_website_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO prequaliq_website_app;

-- Future: optional pgvector for faster similarity at scale (v1 uses jsonb embeddings).
