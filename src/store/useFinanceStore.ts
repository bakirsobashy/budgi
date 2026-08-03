import { and, eq } from "drizzle-orm";
import { create } from "zustand";
import { db } from "../db/client";
import {
  categories as catTable,
  categoryBudgets as catBudgetTable,
  monthlyBudgets as monthBudgetTable,
  transactions as txTable,
} from "../db/schema";
import type {
  Category,
  CategoryBudget,
  MonthlyBudget,
  NewCategory,
  NewTransaction,
  Transaction,
} from "../lib/types";

// Monotonically decreasing counter for optimistic local-only IDs. Avoids
// collisions when multiple inserts happen within the same millisecond.
let tempIdCounter = -1;
const nextTempId = () => tempIdCounter--;

interface FinanceState {
  categories: Category[];
  transactions: Transaction[];
  monthlyBudgets: MonthlyBudget[];
  categoryBudgets: CategoryBudget[];
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

  setMonthlyBudget: (yearMonth: string, amount: number) => Promise<void>;
  deleteMonthlyBudget: (yearMonth: string) => Promise<void>;
  setCategoryBudget: (
    yearMonth: string,
    categoryId: number,
    amount: number,
  ) => Promise<void>;
  deleteCategoryBudget: (
    yearMonth: string,
    categoryId: number,
  ) => Promise<void>;
  copyBudgetFromMonth: (fromYearMonth: string, toYearMonth: string) => Promise<void>;

  clear: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  categories: [],
  transactions: [],
  monthlyBudgets: [],
  categoryBudgets: [],
  isHydrated: false,

  hydrate: async () => {
    const [cats, txs, mb, cb] = await Promise.all([
      db.select().from(catTable),
      db.select().from(txTable),
      db.select().from(monthBudgetTable),
      db.select().from(catBudgetTable),
    ]);
    set({
      categories: cats,
      transactions: txs,
      monthlyBudgets: mb,
      categoryBudgets: cb,
      isHydrated: true,
    });
  },

  addCategory: async (cat) => {
    const tempId = nextTempId();
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
      set((s) => ({
        categories: s.categories.filter((c) => c.id !== tempId),
      }));
      throw e instanceof Error
        ? e
        : new Error("Failed to add category");
    }
  },

  updateCategory: async (id, patch) => {
    const prev = get().categories.find((c) => c.id === id);
    set((s) => ({
      categories: s.categories.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    }));
    try {
      await db.update(catTable).set(patch).where(eq(catTable.id, id));
    } catch (e) {
      if (prev)
        set((s) => ({
          categories: s.categories.map((c) => (c.id === id ? prev : c)),
        }));
      throw e instanceof Error
        ? e
        : new Error("Failed to update category");
    }
  },

  deleteCategory: async (id) => {
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
    } catch (e) {
      if (prev) set((s) => ({ categories: [...s.categories, prev] }));
      throw e instanceof Error
        ? e
        : new Error("Failed to delete category");
    }
  },

  addTransaction: async (tx) => {
    const tempId = nextTempId();
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
    } catch (e) {
      set((s) => ({
        transactions: s.transactions.filter((t) => t.id !== tempId),
      }));
      throw e instanceof Error
        ? e
        : new Error("Failed to add transaction");
    }
  },

  updateTransaction: async (id, patch) => {
    const prev = get().transactions.find((t) => t.id === id);
    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === id ? { ...t, ...patch } : t,
      ),
    }));
    try {
      await db.update(txTable).set(patch).where(eq(txTable.id, id));
    } catch (e) {
      if (prev)
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? prev : t)),
        }));
      throw e instanceof Error
        ? e
        : new Error("Failed to update transaction");
    }
  },

  deleteTransaction: async (id) => {
    const prev = get().transactions.find((t) => t.id === id);
    set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
    try {
      await db.delete(txTable).where(eq(txTable.id, id));
    } catch (e) {
      if (prev) set((s) => ({ transactions: [...s.transactions, prev] }));
      throw e instanceof Error
        ? e
        : new Error("Failed to delete transaction");
    }
  },

  setMonthlyBudget: async (yearMonth, amount) => {
    const existing = get().monthlyBudgets.find((b) => b.yearMonth === yearMonth);
    const prev = existing;
    // Optimistic upsert
    if (existing) {
      set((s) => ({
        monthlyBudgets: s.monthlyBudgets.map((b) =>
          b.yearMonth === yearMonth ? { ...b, amount } : b,
        ),
      }));
    } else {
      set((s) => ({
        monthlyBudgets: [
          ...s.monthlyBudgets,
          { id: nextTempId(), yearMonth, amount },
        ],
      }));
    }
    try {
      if (existing) {
        await db
          .update(monthBudgetTable)
          .set({ amount })
          .where(eq(monthBudgetTable.yearMonth, yearMonth));
      } else {
        await db
          .delete(monthBudgetTable)
          .where(eq(monthBudgetTable.yearMonth, yearMonth));
        const [inserted] = await db
          .insert(monthBudgetTable)
          .values({ yearMonth, amount })
          .returning();
        set((s) => ({
          monthlyBudgets: s.monthlyBudgets.map((b) =>
            b.yearMonth === yearMonth && b.id < 0 ? inserted : b,
          ),
        }));
      }
    } catch (e) {
      if (prev) {
        set((s) => ({
          monthlyBudgets: s.monthlyBudgets.map((b) =>
            b.yearMonth === yearMonth ? prev : b,
          ),
        }));
      } else {
        set((s) => ({
          monthlyBudgets: s.monthlyBudgets.filter(
            (b) => b.yearMonth !== yearMonth,
          ),
        }));
      }
      throw e instanceof Error ? e : new Error("Failed to set monthly budget");
    }
  },

  deleteMonthlyBudget: async (yearMonth) => {
    const prev = get().monthlyBudgets.find((b) => b.yearMonth === yearMonth);
    set((s) => ({
      monthlyBudgets: s.monthlyBudgets.filter((b) => b.yearMonth !== yearMonth),
    }));
    try {
      await db
        .delete(monthBudgetTable)
        .where(eq(monthBudgetTable.yearMonth, yearMonth));
    } catch (e) {
      if (prev)
        set((s) => ({ monthlyBudgets: [...s.monthlyBudgets, prev] }));
      throw e instanceof Error ? e : new Error("Failed to delete monthly budget");
    }
  },

  setCategoryBudget: async (yearMonth, categoryId, amount) => {
    const existing = get().categoryBudgets.find(
      (b) => b.yearMonth === yearMonth && b.categoryId === categoryId,
    );
    const prev = existing;
    if (existing) {
      set((s) => ({
        categoryBudgets: s.categoryBudgets.map((b) =>
          b.yearMonth === yearMonth && b.categoryId === categoryId
            ? { ...b, amount }
            : b,
        ),
      }));
    } else {
      set((s) => ({
        categoryBudgets: [
          ...s.categoryBudgets,
          { id: nextTempId(), yearMonth, categoryId, amount },
        ],
      }));
    }
    try {
      if (existing) {
        await db
          .update(catBudgetTable)
          .set({ amount })
          .where(
            and(
              eq(catBudgetTable.yearMonth, yearMonth),
              eq(catBudgetTable.categoryId, categoryId),
            ),
          );
      } else {
        await db
          .delete(catBudgetTable)
          .where(
            and(
              eq(catBudgetTable.yearMonth, yearMonth),
              eq(catBudgetTable.categoryId, categoryId),
            ),
          );
        const [inserted] = await db
          .insert(catBudgetTable)
          .values({ yearMonth, categoryId, amount })
          .returning();
        set((s) => ({
          categoryBudgets: s.categoryBudgets.map((b) =>
            b.yearMonth === yearMonth &&
            b.categoryId === categoryId &&
            b.id < 0
              ? inserted
              : b,
          ),
        }));
      }
    } catch (e) {
      if (prev) {
        set((s) => ({
          categoryBudgets: s.categoryBudgets.map((b) =>
            b.yearMonth === yearMonth && b.categoryId === categoryId
              ? prev
              : b,
          ),
        }));
      } else {
        set((s) => ({
          categoryBudgets: s.categoryBudgets.filter(
            (b) =>
              !(b.yearMonth === yearMonth && b.categoryId === categoryId),
          ),
        }));
      }
      throw e instanceof Error ? e : new Error("Failed to set category budget");
    }
  },

  deleteCategoryBudget: async (yearMonth, categoryId) => {
    const prev = get().categoryBudgets.find(
      (b) => b.yearMonth === yearMonth && b.categoryId === categoryId,
    );
    set((s) => ({
      categoryBudgets: s.categoryBudgets.filter(
        (b) =>
          !(b.yearMonth === yearMonth && b.categoryId === categoryId),
      ),
    }));
    try {
      await db
        .delete(catBudgetTable)
        .where(
          and(
            eq(catBudgetTable.yearMonth, yearMonth),
            eq(catBudgetTable.categoryId, categoryId),
          ),
        );
    } catch (e) {
      if (prev)
        set((s) => ({ categoryBudgets: [...s.categoryBudgets, prev] }));
      throw e instanceof Error ? e : new Error("Failed to delete category budget");
    }
  },

  copyBudgetFromMonth: async (fromYearMonth, toYearMonth) => {
    const monthlyFrom = get().monthlyBudgets.find(
      (b) => b.yearMonth === fromYearMonth,
    );
    const catBudgetsFrom = get().categoryBudgets.filter(
      (b) => b.yearMonth === fromYearMonth,
    );
    if (!monthlyFrom && catBudgetsFrom.length === 0) return;

    try {
      // Total budget
      if (monthlyFrom) {
        await get().setMonthlyBudget(toYearMonth, monthlyFrom.amount);
      }
      // Category budgets
      for (const cb of catBudgetsFrom) {
        await get().setCategoryBudget(toYearMonth, cb.categoryId, cb.amount);
      }
    } catch (e) {
      throw e instanceof Error ? e : new Error("Failed to copy budget");
    }
  },

  clear: async () => {
    set({ categories: [], transactions: [], monthlyBudgets: [], categoryBudgets: [] });
    try {
      // Delete in dependency order: transactions, category budgets, then
      // categories. Monthly budgets have no FKs so order doesn't matter.
      await db.delete(txTable);
      await db.delete(catBudgetTable);
      await db.delete(catTable);
      await db.delete(monthBudgetTable);
    } catch (e) {
      // Re-hydrate so the in-memory state reflects the actual DB contents
      // after a failed clear, rather than leaving the store empty.
      await get().hydrate();
      throw e instanceof Error
        ? e
        : new Error("Failed to clear data");
    }
  },
}));