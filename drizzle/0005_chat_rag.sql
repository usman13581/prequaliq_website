CREATE TABLE IF NOT EXISTS "chat_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_type" varchar(50) NOT NULL,
	"source_key" varchar(200) NOT NULL,
	"locale" varchar(5) NOT NULL,
	"title" text NOT NULL,
	"url_path" varchar(500) NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"indexed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chat_documents_source_locale_idx" ON "chat_documents" ("source_type","source_key","locale");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"chunk_index" integer NOT NULL,
	"content" text NOT NULL,
	"embedding" jsonb,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"token_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat_chunks" ADD CONSTRAINT "chat_chunks_document_id_chat_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."chat_documents"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chat_chunks_document_id_idx" ON "chat_chunks" ("document_id");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locale" varchar(5) DEFAULT 'en' NOT NULL,
	"ip_hash" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_active_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"refused" boolean DEFAULT false NOT NULL,
	"model" varchar(100),
	"latency_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chat_messages_session_id_created_at_idx" ON "chat_messages" ("session_id","created_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_message_citations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"chunk_id" uuid NOT NULL,
	"score" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat_message_citations" ADD CONSTRAINT "chat_message_citations_message_id_chat_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."chat_messages"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "chat_message_citations" ADD CONSTRAINT "chat_message_citations_chunk_id_chat_chunks_id_fk" FOREIGN KEY ("chunk_id") REFERENCES "public"."chat_chunks"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_index_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"chunks_created" integer DEFAULT 0 NOT NULL,
	"chunks_skipped" integer DEFAULT 0 NOT NULL,
	"documents_processed" integer DEFAULT 0 NOT NULL,
	"status" varchar(20) DEFAULT 'running' NOT NULL,
	"error" text
);
