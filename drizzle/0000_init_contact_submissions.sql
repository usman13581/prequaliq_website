CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(255),
	"subject" varchar(100) NOT NULL,
	"message" text NOT NULL,
	"source" varchar(50) DEFAULT 'contact_page' NOT NULL,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
