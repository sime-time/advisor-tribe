CREATE TABLE "advisor" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"bio" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "advisor_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "advisor_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"advisor_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"role" text,
	"link_name" text,
	"time_zone" text,
	"grant_id" text,
	"grant_email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_link_name_unique" UNIQUE("link_name")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"leader_user_id" integer NOT NULL,
	"leader_role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "group_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"group_role" text NOT NULL,
	"user_id" integer NOT NULL,
	"advisor_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_day" integer NOT NULL,
	"user_id" integer NOT NULL,
	"start_time" integer NOT NULL,
	"end_time" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "start_check" CHECK ("availability"."start_time" >= 0 AND "availability"."start_time" <= 2400),
	CONSTRAINT "end_check" CHECK ("availability"."end_time" >= 0 AND "availability"."end_time" <= 2400),
	CONSTRAINT "day_check" CHECK ("availability"."week_day" >= 0 AND "availability"."week_day" <= 6)
);
--> statement-breakpoint
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
CREATE TABLE "plan_pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"frequency" text NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "price_check" CHECK ("plan_pricing"."amount" >= 0)
);
--> statement-breakpoint
ALTER TABLE "advisor" ADD CONSTRAINT "advisor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advisor_category" ADD CONSTRAINT "advisor_category_advisor_id_advisor_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advisor_category" ADD CONSTRAINT "advisor_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group" ADD CONSTRAINT "group_leader_user_id_user_id_fk" FOREIGN KEY ("leader_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_advisor_id_advisor_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability" ADD CONSTRAINT "availability_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan" ADD CONSTRAINT "plan_advisor_id_advisor_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."advisor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_feature" ADD CONSTRAINT "plan_feature_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_pricing" ADD CONSTRAINT "plan_pricing_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;