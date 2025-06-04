import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { advisor, user } from "./index";

export const group = pgTable("group", {
  id: serial("id").primaryKey(),
  name: text("name"),
  leaderUserId: integer("leader_user_id").notNull().references(() => user.id),
  leaderRole: text("leader_role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const groupMember = pgTable("group_member", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => group.id),
  groupRole: text("group_role").notNull(),
  userId: integer("user_id").notNull().references(() => user.id),
  advisorId: integer("advisor_id").notNull().references(() => advisor.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
