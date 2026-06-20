import { count } from "drizzle-orm";
import { db } from "./client";
import { categories } from "./schema";
import type { NewCategory } from "../lib/types";

const DEFAULT_CATEGORIES: NewCategory[] = [
  { name: "Groceries", monthlyBudget: 400, type: "expense" },
  { name: "Rent", monthlyBudget: 1200, type: "expense" },
  { name: "Utilities", monthlyBudget: 150, type: "expense" },
  { name: "Transport", monthlyBudget: 100, type: "expense" },
  { name: "Entertainment", monthlyBudget: 80, type: "expense" },
  { name: "Dining Out", monthlyBudget: 120, type: "expense" },
  { name: "Health", monthlyBudget: 60, type: "expense" },
  { name: "Salary", monthlyBudget: 0, type: "income" }, // income category
  { name: "Freelance", monthlyBudget: 0, type: "income" }, // income category
  { name: "Other", monthlyBudget: 0, type: "expense" },
];

const DEFAULT_TRANSACTIONS = [
  {
    amount: 50,
    date: "2023-10-01",
    type: "expense",
    categoryId: 1, // Groceries
    description: "Weekly grocery shopping",
  },
  {
    amount: 1200,
    date: "2023-10-01",
    type: "income",
    categoryId: 8, // Salary
    description: "Monthly salary",
  },
];

export async function seedCategories() {
  const [{ total }] = await db.select({ total: count() }).from(categories);
  if (total === 0) {
    await db.insert(categories).values(DEFAULT_CATEGORIES);
  }
  // const [{ txTotal }] = await db
  //   .select({ txTotal: count() })
  //   .from(transactions);
  // if (txTotal === 0) {
  //   await db.insert(transactions).values(DEFAULT_TRANSACTIONS);
  // }
  console.log("Categories seeded successfully");
}
