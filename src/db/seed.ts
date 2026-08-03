import { count } from "drizzle-orm";
import type { NewCategory } from "../lib/types";
import { db } from "./client";
import { categories, transactions } from "./schema";

const DEFAULT_CATEGORIES: NewCategory[] = [
  { name: "Groceries", type: "expense", color: "#4CAF50", icon: "grocery" },
  { name: "Salary", type: "income", color: "#4CAF50", icon: "money" },
];

export async function seedCategories() {
  const [{ catTotal }] = await db
    .select({ catTotal: count() })
    .from(categories);
  const [{ txTotal }] = await db
    .select({ txTotal: count() })
    .from(transactions);

  // Only seed defaults on a completely fresh database. If the user has ever
  // had transactions, we assume the app has been initialized and we should
  // not recreate default categories they may have intentionally removed.
  if (catTotal === 0 && txTotal === 0) {
    await db.insert(categories).values(DEFAULT_CATEGORIES);
  }
}
