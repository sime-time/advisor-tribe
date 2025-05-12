ALTER TABLE "plan_feature" DROP CONSTRAINT "plan_feature_plan_id_advisor_id_fk";
--> statement-breakpoint
ALTER TABLE "plan_feature" ADD CONSTRAINT "plan_feature_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;