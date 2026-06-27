CREATE TABLE IF NOT EXISTS "career_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"linked_in" varchar(500),
	"message" text,
	"cv_file_name" varchar(255) NOT NULL,
	"cv_mime_type" varchar(100) NOT NULL,
	"cv_data" text NOT NULL,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
