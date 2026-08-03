import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categories, categoryBudgets, monthlyBudgets, transactions } from "../db/schema";

// Row types (what you SELECT)
export type Category = InferSelectModel<typeof categories>;
export type Transaction = InferSelectModel<typeof transactions>;
export type MonthlyBudget = InferSelectModel<typeof monthlyBudgets>;
export type CategoryBudget = InferSelectModel<typeof categoryBudgets>;

// Insert types (what you INSERT — id is auto-generated)
export type NewCategory = InferInsertModel<typeof categories>;
export type NewTransaction = InferInsertModel<typeof transactions>;
export type NewMonthlyBudget = InferInsertModel<typeof monthlyBudgets>;
export type NewCategoryBudget = InferInsertModel<typeof categoryBudgets>;
