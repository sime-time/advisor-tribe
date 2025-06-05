CREATE TABLE "event_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"duration" integer NOT NULL,
	"url" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"video_call_software" text DEFAULT 'Google Meet',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_type_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "isActive" boolean;--> statement-breakpoint
ALTER TABLE "event_type" ADD CONSTRAINT "event_type_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;