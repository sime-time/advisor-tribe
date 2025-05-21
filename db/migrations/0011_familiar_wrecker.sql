ALTER TABLE "availability" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "availability" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;