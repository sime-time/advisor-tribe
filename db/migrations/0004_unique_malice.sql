CREATE TABLE "plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"advisor_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_feature" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_frequency" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"type" text NOT NULL,
	"price" integer NOT NULL,
	CONSTRAINT "price_check" CHECK ("plan_frequency"."price" >= 0)
);
--> statement-breakpoint
ALTER TABLE "plan" ADD CONSTRAINT "plan_advisor_id_advisor_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_feature" ADD CONSTRAINT "plan_feature_plan_id_advisor_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_frequency" ADD CONSTRAINT "plan_frequency_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;