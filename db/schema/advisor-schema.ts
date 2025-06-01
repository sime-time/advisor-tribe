import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const category = pgTable("category", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export const advisor = pgTable("advisor", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	bio: text("bio").notNull(),
	city: text("city").notNull(),
	state: text("state").notNull(),
	country: text("country").notNull(),
	userId: integer("user_id").unique().notNull().references(() => user.id),
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
