CREATE TABLE IF NOT EXISTS "project_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(255),
	"project_type" varchar(100) NOT NULL,
	"timeline" varchar(100),
	"budget" varchar(100),
	"description" text NOT NULL,
	"meeting_date" varchar(10),
	"meeting_time" varchar(5),
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
