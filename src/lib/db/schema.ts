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

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
});

export const deliveryPersons = pgTable("delivery_persons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 13 }).notNull(),
  warehouse_id: integer("warehouse-id").references(
    () => {
      return warehouses.id;
    },
    { onDelete: "cascade" }
  ),
  order_id: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const inventories = pgTable("inventories", {
  id: serial("id").primaryKey(),
  sku: varchar("sku", { length: 8 }).unique().notNull(),
  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "set null",
  }),
  warehouse_id: integer("warehouse_id").references(() => warehouses.id, {
    onDelete: "cascade",
  }),
  product_id: integer("produt_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
