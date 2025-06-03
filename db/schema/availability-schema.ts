import { sql } from "drizzle-orm";
import { boolean, check, integer, pgTable, serial, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./index";

export const availability = pgTable("availability", {
	id: serial("id").primaryKey(),
	weekDay: integer("week_day").notNull(),
	userId: integer("user_id").notNull().references(() => user.id),
	startTime: integer("start_time").notNull(),
	endTime: integer("end_time").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, table => [
	check("start_check", sql`${table.startTime} >= 0 AND ${table.startTime} <= 2400`),
	check("end_check", sql`${table.endTime} >= 0 AND ${table.endTime} <= 2400`),
	check("day_check", sql`${table.weekDay} >= 0 AND ${table.weekDay} <= 6`),
	unique("user_week_day_unique").on(table.userId, table.weekDay),
]);
