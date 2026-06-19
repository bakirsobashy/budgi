import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { categories, transactions } from "../db/schema";

// Row types (what you SELECT)
export type Category = InferSelectModel<typeof categories>;
export type Transaction = InferSelectModel<typeof transactions>;

// Insert types (what you INSERT — id is auto-generated)
export type NewCategory = InferInsertModel<typeof categories>;
export type NewTransaction = InferInsertModel<typeof transactions>;
