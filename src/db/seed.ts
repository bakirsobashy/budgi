import { count } from "drizzle-orm";
import { db } from "./client";
import { categories } from "./schema";
import type { NewCategory } from "../lib/types";

const DEFAULT_CATEGORIES: NewCategory[] = [
  { name: "Groceries", type: "expense", icon: "minus_Icon.png", color: "#FF5722" },
  { name: "Rent", type: "expense", icon: "minus_Icon.png", color: "#6200EE" },
  { name: "Utilities", type: "expense", icon: "minus_Icon.png", color: "#2196F3" },
  { name: "Transport", type: "expense", icon: "minus_Icon.png", color: "#03DAC5" },
  { name: "Entertainment", type: "expense", icon: "minus_Icon.png", color: "#4CAF50" },
  { name: "Dining Out", type: "expense", icon: "minus_Icon.png", color: "#FF5722" },
  { name: "Health", type: "expense", icon: "minus_Icon.png", color: "#2196F3" },
  { name: "Salary", type: "income", icon: "plus_Icon.png", color: "#4CAF50" },
  { name: "Freelance", type: "income", icon: "plus_Icon.png", color: "#03DAC5" },
  { name: "Other", type: "expense", icon: "Check.png", color: "#6200EE" },
];

export async function seedCategories() {
  const [{ total }] = await db.select({ total: count() }).from(categories);
  if (total === 0) {
    await db.insert(categories).values(DEFAULT_CATEGORIES);
  }
  console.log("Categories seeded successfully");
}
