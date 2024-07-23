import { sql } from "drizzle-orm";
import { MySqlDateTimeString } from "drizzle-orm/mysql-core";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 80 }).unique().notNull(),
  provider: varchar("provier", { length: 20 }),
  external_id: varchar("external_id", { length: 100 }).notNull(),
  image: text("image").notNull(),
  role: varchar("role", { length: 12 }).notNull().default("customer"),
  update_at: timestamp("update_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
