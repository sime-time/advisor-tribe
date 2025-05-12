ALTER TABLE "plan_frequency" RENAME TO "plan_pricing";--> statement-breakpoint
ALTER TABLE "plan_pricing" RENAME COLUMN "type" TO "frequency";--> statement-breakpoint
ALTER TABLE "plan_pricing" RENAME COLUMN "price" TO "amount";--> statement-breakpoint
ALTER TABLE "plan_pricing" DROP CONSTRAINT "price_check";--> statement-breakpoint
ALTER TABLE "plan_pricing" DROP CONSTRAINT "plan_frequency_plan_id_plan_id_fk";
--> statement-breakpoint
ALTER TABLE "plan_pricing" ADD CONSTRAINT "plan_pricing_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_pricing" ADD CONSTRAINT "price_check" CHECK ("plan_pricing"."amount" >= 0);