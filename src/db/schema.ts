import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// ─── Categories ──────────────────────────────────────────────
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

// ─── Transactions ────────────────────────────────────────────
// amount is stored in cents (integer) to avoid floating-point drift.
export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  amount: integer("amount").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  date: text("date").notNull(), // ISO 8601: "2026-06-18"
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  description: text("description").default(""),
});

// ─── Monthly Budgets ─────────────────────────────────────────
// One total budget per month. yearMonth is "YYYY-MM".
export const monthlyBudgets = sqliteTable("monthly_budgets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  yearMonth: text("year_month").notNull().unique(),
  amount: integer("amount").notNull(), // cents
});

// ─── Category Budgets ────────────────────────────────────────
// One budget per (month, category) pair.
export const categoryBudgets = sqliteTable(
  "category_budgets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    yearMonth: text("year_month").notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
    amount: integer("amount").notNull(), // cents
  },
  (table) => [
    uniqueIndex("category_budgets_year_month_category_id_unique").on(
      table.yearMonth,
      table.categoryId,
    ),
  ],
);
