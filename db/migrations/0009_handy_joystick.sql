CREATE TABLE "availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"advisor_id" integer NOT NULL,
	"timezone" text NOT NULL,
	"week_day" text NOT NULL,
	"start_time" integer NOT NULL,
	"end_time" integer NOT NULL,
	CONSTRAINT "start_check" CHECK ("availability"."start_time" >= 0 AND "availability"."start_time" <= 2400),
	CONSTRAINT "end_check" CHECK ("availability"."end_time" >= 0 AND "availability"."end_time" <= 2400)
);
--> statement-breakpoint
ALTER TABLE "advisor" ALTER COLUMN "country" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "advisor" ADD COLUMN "postal_code" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "availability" ADD CONSTRAINT "availability_advisor_id_advisor_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;