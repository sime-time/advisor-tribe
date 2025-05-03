import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const category = pgTable("category", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export const advisor = pgTable("advisor", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	bio: text("bio").notNull(),
	prefix: text("prefix"),
	city: text("city"),
	state: text("state"),
	country: text("country").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const advisorCategory = pgTable("advisor_category", {
	id: serial("id").primaryKey(),
	advisorId: text("advisor_id").notNull(),
	categoryId: integer("category_id").notNull(),
	isPrimary: boolean("is_primary").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const advisorRelations = relations(advisor, ({ many }) => ({
	advisorCategory: many(advisorCategory),
}));

export const categoryRelations = relations(category, ({ many }) => ({
	advisorCategory: many(advisorCategory),
}));

export const advisorCategoryRelations = relations(advisorCategory, ({ one }) => ({
	advisor: one(advisor, {
		fields: [advisorCategory.advisorId],
		references: [advisor.id],
	}),
	category: one(category, {
		fields: [advisorCategory.categoryId],
		references: [category.id],
	}),
}));
