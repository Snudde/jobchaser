import { integer, timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  headline: text("headline").notNull(),
  location: text("location"),
  deadline: text("deadline"),
  url: text("url"),
  status: text("status"),
  source: text("source").notNull().default("manual"),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
