import { eq } from "drizzle-orm";
import { create } from "zustand";
import { db } from "../db/client";
import { categories as catTable, transactions as txTable } from "../db/schema";
import type {
  Category,
  NewCategory,
  NewTransaction,
  Transaction,
} from "../lib/types";

interface FinanceState {
  categories: Category[];
  transactions: Transaction[];
  isHydrated: boolean;

  hydrate: () => Promise<void>;

  addCategory: (cat: NewCategory) => Promise<void>;
  updateCategory: (id: number, patch: Partial<NewCategory>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;

  addTransaction: (tx: NewTransaction) => Promise<void>;
  updateTransaction: (
    id: number,
    patch: Partial<NewTransaction>,
  ) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  clear: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  categories: [],
  transactions: [],
  isHydrated: false,

  hydrate: async () => {
    console.log("[useFinanceStore] hydrate() called");
    const [cats, txs] = await Promise.all([
      db.select().from(catTable),
      db.select().from(txTable),
    ]);
    set({ categories: cats, transactions: txs, isHydrated: true });
  },

  addCategory: async (cat) => {
    console.log("[useFinanceStore] addCategory() called with:", cat);
    const tempId = -Date.now();
    set((s) => ({
      categories: [
        ...s.categories,
        {
          id: tempId,
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
          color: cat.color,
        },
      ],
    }));

    try {
      const [inserted] = await db.insert(catTable).values(cat).returning();
      set((s) => ({
        categories: s.categories.map((c) => (c.id === tempId ? inserted : c)),
      }));
    } catch (e) {
      console.error("[useFinanceStore] addCategory failed:", e);
      set((s) => ({
        categories: s.categories.filter((c) => c.id !== tempId),
      }));
    }
  },

  updateCategory: async (id, patch) => {
    console.log(
      "[useFinanceStore] updateCategory() called with id:",
      id,
      "patch:",
      patch,
    );
    const prev = get().categories.find((c) => c.id === id);
    set((s) => ({
      categories: s.categories.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    }));
    try {
      await db.update(catTable).set(patch).where(eq(catTable.id, id));
    } catch {
      if (prev)
        set((s) => ({
          categories: s.categories.map((c) => (c.id === id ? prev : c)),
        }));
    }
  },

  deleteCategory: async (id) => {
    console.log("[useFinanceStore] deleteCategory() called with id:", id);
    const hasTransactions = get().transactions.some((t) => t.categoryId === id);
    if (hasTransactions) {
      throw new Error(
        "Cannot delete a category that has transactions. Reassign or delete the transactions first.",
      );
    }
    const prev = get().categories.find((c) => c.id === id);
    set((s) => ({ categories: s.categories.filter((c) => c.id !== id) }));
    try {
      await db.delete(catTable).where(eq(catTable.id, id));
    } catch {
      if (prev) set((s) => ({ categories: [...s.categories, prev] }));
      throw new Error("Failed to delete category");
    }
  },

  addTransaction: async (tx) => {
    console.log("[useFinanceStore] addTransaction() called with:", tx);
    const tempId = -Date.now();
    const optimistic: Transaction = {
      id: tempId,
      amount: tx.amount,
      type: tx.type,
      date: tx.date,
      categoryId: tx.categoryId,
      description: tx.description ?? "",
    };
    set((s) => ({ transactions: [optimistic, ...s.transactions] }));

    try {
      const [inserted] = await db.insert(txTable).values(tx).returning();
      set((s) => ({
        transactions: s.transactions.map((t) =>
          t.id === tempId ? inserted : t,
        ),
      }));
    } catch {
      set((s) => ({
        transactions: s.transactions.filter((t) => t.id !== tempId),
      }));
    }
  },

  updateTransaction: async (id, patch) => {
    console.log(
      "[useFinanceStore] updateTransaction() called with id:",
      id,
      "patch:",
      patch,
    );
    const prev = get().transactions.find((t) => t.id === id);
    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === id ? { ...t, ...patch } : t,
      ),
    }));
    try {
      await db.update(txTable).set(patch).where(eq(txTable.id, id));
    } catch {
      if (prev)
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? prev : t)),
        }));
    }
  },

  deleteTransaction: async (id) => {
    console.log("[useFinanceStore] deleteTransaction() called with id:", id);
    const prev = get().transactions.find((t) => t.id === id);
    set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
    try {
      await db.delete(txTable).where(eq(txTable.id, id));
    } catch {
      if (prev) set((s) => ({ transactions: [...s.transactions, prev] }));
    }
  },
  clear: async () => {
    console.log("[useFinanceStore] clear() called");
    set({ categories: [], transactions: [], isHydrated: false });
    try {
      await db.delete(catTable);
      await db.delete(txTable);
    } catch (e) {
      console.error("[useFinanceStore] clear failed:", e);
    }
  },
}));
