import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./index";

export const eventType = pgTable("event_type", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => user.id),
  title: text("title").notNull(),
  duration: integer("duration").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true),
  videoCallSoftware: text("video_call_software").default("Google Meet"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
