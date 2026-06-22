import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ─── Categories ──────────────────────────────────────────────
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

// ─── Transactions ────────────────────────────────────────────
export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: real("amount").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  date: text("date").notNull(), // ISO 8601: "2026-06-18"
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  description: text("description").default(""),
});
