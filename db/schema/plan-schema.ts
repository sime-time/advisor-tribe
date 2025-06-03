import { sql } from "drizzle-orm";
import { check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { advisor } from "./index";

export const plan = pgTable("plan", {
	id: serial("id").primaryKey(),
	advisorId: integer("advisor_id").notNull().references(() => advisor.id),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const planPricing = pgTable("plan_pricing", {
	id: serial("id").primaryKey(),
	planId: integer("plan_id").notNull().references(() => plan.id),
	frequency: text("frequency").notNull(),
	amount: integer("amount").notNull(),
}, table => [check("price_check", sql`${table.amount} >= 0`)]);

export const planFeature = pgTable("plan_feature", {
	id: serial("id").primaryKey(),
	planId: integer("plan_id").notNull().references(() => plan.id),
	text: text("text").notNull(),
});
