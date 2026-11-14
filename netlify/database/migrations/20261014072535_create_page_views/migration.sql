CREATE TABLE "page_views" (
	"id" serial PRIMARY KEY,
	"path" text NOT NULL,
	"referrer" text,
	"country" text,
	"city" text,
	"device" text NOT NULL,
	"browser" text NOT NULL,
	"os" text NOT NULL,
	"language" text,
	"visitor_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "page_views_created_at_idx" ON "page_views" ("created_at");