import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  first_name: varchar("first_name", { length: 100 }).notNull(),
  last_name: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 80 }).unique().notNull(),
  provider: varchar("provier", { length: 20 }),
  external_id: varchar("external_id", { length: 100 }).notNull(),
  image: text("image").notNull(),
  role: varchar("role", { length: 12 }).notNull().default("customer"),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  image: text("image"),
  description: text("description"),
  price: integer("price").notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const warehouses = pgTable(
  "warehouses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 6 }).notNull(),
    updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      pincodeIdx: index("pincode_idx").on(table.pincode),
    };
  }
);
