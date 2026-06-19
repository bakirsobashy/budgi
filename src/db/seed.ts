import { count } from "drizzle-orm";
import { db } from "./client";
import { categories } from "./schema";

const DEFAULT_CATEGORIES = [
  { name: "Groceries", monthlyBudget: 400 },
  { name: "Rent", monthlyBudget: 1200 },
  { name: "Utilities", monthlyBudget: 150 },
  { name: "Transport", monthlyBudget: 100 },
  { name: "Entertainment", monthlyBudget: 80 },
  { name: "Dining Out", monthlyBudget: 120 },
  { name: "Health", monthlyBudget: 60 },
  { name: "Salary", monthlyBudget: 0 }, // income category
  { name: "Freelance", monthlyBudget: 0 }, // income category
  { name: "Other", monthlyBudget: 0 },
];

export async function seedCategories() {
  const [{ total }] = await db.select({ total: count() }).from(categories);
  if (total === 0) {
    await db.insert(categories).values(DEFAULT_CATEGORIES);
  }
  console.log("Categories seeded successfully");
}
