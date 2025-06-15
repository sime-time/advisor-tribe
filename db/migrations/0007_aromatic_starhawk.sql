ALTER TABLE "event_type" RENAME TO "meeting_type";--> statement-breakpoint
ALTER TABLE "meeting_type" DROP CONSTRAINT "event_type_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "meeting_type" ADD CONSTRAINT "meeting_type_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;