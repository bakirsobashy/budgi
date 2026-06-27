import { count } from "drizzle-orm";
import type { NewCategory } from "../lib/types";
import { db } from "./client";
import { categories } from "./schema";

const DEFAULT_CATEGORIES: NewCategory[] = [
  { name: "Groceries", type: "expense", color: "red", icon: "add" },
  // { name: "Rent", type: "expense" },
  // { name: "Utilities", type: "expense" },
  // { name: "Transport", type: "expense" },
  // { name: "Entertainment", type: "expense" },
  // { name: "Dining Out", color:"red", type: "expense" },
  // { name: "Health", : 60, type: "expense" },
  // { name: "Salary", : 0, type: "income" }, // income category
  // { name: "Freelance", : 0, type: "income" }, // income category
  // { name: "Other", : 0, type: "expense" },
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
