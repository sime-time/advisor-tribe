import { sql } from "drizzle-orm";
import { boolean, check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { advisor, user } from "./index";

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

export const availability = pgTable("availability", {
	id: serial("id").primaryKey(),
	weekDay: integer("week_day").notNull(),
	user_id: integer("user_id").notNull().references(() => user.id),
	startTime: integer("start_time").notNull(),
	endTime: integer("end_time").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, table => [
	check("start_check", sql`${table.startTime} >= 0 AND ${table.startTime} <= 2400`),
	check("end_check", sql`${table.endTime} >= 0 AND ${table.endTime} <= 2400`),
	check("day_check", sql`${table.weekDay} >= 0 AND ${table.weekDay} <= 6`),
]);
