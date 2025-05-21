import { sql } from "drizzle-orm";
import { boolean, check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const category = pgTable("category", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export const advisor = pgTable("advisor", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	bio: text("bio").notNull(),
	prefix: text("prefix"),
	userId: integer("user_id").unique().notNull().references(() => user.id),
	city: text("city"),
	state: text("state"),
	country: text("country"),
	postalCode: text("postal_code"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const advisorCategory = pgTable("advisor_category", {
	id: serial("id").primaryKey(),
	advisorId: integer("advisor_id").notNull().references(() => advisor.id),
	categoryId: integer("category_id").notNull().references(() => category.id),
	isPrimary: boolean("is_primary").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const availability = pgTable("availability", {
	id: serial("id").primaryKey(),
	advisorId: integer("advisor_id").notNull().references(() => advisor.id),
	timezone: text("timezone").notNull(),
	weekDay: text("week_day").notNull(),
	startTime: integer("start_time").notNull(),
	endTime: integer("end_time").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, table => [
	check("start_check", sql`${table.startTime} >= 0 AND ${table.startTime} <= 2400`),
	check("end_check", sql`${table.endTime} >= 0 AND ${table.endTime} <= 2400`),
]);
