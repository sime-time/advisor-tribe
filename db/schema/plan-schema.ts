import { sql } from "drizzle-orm";
import { check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { advisor } from "./advisor-schema";

export const plan = pgTable("plan", {
	id: serial("id").primaryKey(),
	advisorId: integer("advisor_id").notNull().references(() => advisor.id),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const planFrequency = pgTable("plan_frequency", {
	id: serial("id").primaryKey(),
	planId: integer("plan_id").notNull().references(() => plan.id),
	type: text("type").notNull(),
	price: integer("price").notNull(),
}, table => [check("price_check", sql`${table.price} >= 0`)]);

export const planFeature = pgTable("plan_feature", {
	id: serial("id").primaryKey(),
	planId: integer("plan_id").notNull().references(() => advisor.id),
	text: text("text").notNull(),
});
