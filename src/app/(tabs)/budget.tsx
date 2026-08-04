import BudgetCard from "@/components/BudgetCard";
import BudgetCatCard from "@/components/BudgetCatCard";
import BudgetCatEditBS from "@/components/BudgetCatEditBS";
import BudgetEditBS from "@/components/BudgetEditBS";
import MonthSelector, { JSMonthPicker } from "@/components/MonthSelector";
import { useFinanceStore } from "@/store/useFinanceStore";
import { ScrollView } from "@expo/ui";
import { Box, Column, Host, Text } from "@expo/ui/jetpack-compose";
import { fillMaxSize, fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useIsFocused } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Format a Date as "YYYY-MM".
const toYearMonth = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

// Get the previous month as "YYYY-MM".
const prevYearMonth = (ym: string): string => {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return toYearMonth(d);
};

export default function BudgetScreen() {
  const transactions = useFinanceStore((s) => s.transactions);
  const categories = useFinanceStore((s) => s.categories);
  const monthlyBudgets = useFinanceStore((s) => s.monthlyBudgets);
  const categoryBudgets = useFinanceStore((s) => s.categoryBudgets);

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [showCatBudgetEdit, setShowCatBudgetEdit] = useState(false);
  const [editCatId, setEditCatId] = useState<number>(0);
  const [focusKey, setFocusKey] = useState(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isFocused) {
      timeout = setTimeout(() => {
        setFocusKey((k) => k + 1);
      }, 0);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocused]);

  const yearMonth = toYearMonth(selectedMonth);
  const prevYm = prevYearMonth(yearMonth);

  // Total expense for the month (cents)
  const monthExpenseTxs = transactions.filter(
    (tx) =>
      tx.type === "expense" &&
      new Date(tx.date).getFullYear() === selectedMonth.getFullYear() &&
      new Date(tx.date).getMonth() === selectedMonth.getMonth(),
  );
  const totalSpentCents = monthExpenseTxs.reduce(
    (sum, tx) => sum + tx.amount,
    0,
  );

  // Per-category spend for the month
  const spendByCat = new Map<number, number>();
  for (const tx of monthExpenseTxs) {
    spendByCat.set(
      tx.categoryId,
      (spendByCat.get(tx.categoryId) ?? 0) + tx.amount,
    );
  }

  // Only expense categories that have spending this month, sorted by spend desc
  const catsWithSpend = categories
    .filter((c) => c.type === "expense" && spendByCat.has(c.id))
    .map((c) => ({ cat: c, spent: spendByCat.get(c.id) ?? 0 }))
    .sort((a, b) => b.spent - a.spent);

  // Budgets
  const totalBudget = monthlyBudgets.find((b) => b.yearMonth === yearMonth);
  const totalBudgetCents = totalBudget ? totalBudget.amount : null;

  // Previous month has any budget?
  const hasPrevBudget =
    monthlyBudgets.some((b) => b.yearMonth === prevYm) ||
    categoryBudgets.some((b) => b.yearMonth === prevYm);

  // Category budget for the editing category
  const editCat = categories.find((c) => c.id === editCatId);
  const editCatBudget = categoryBudgets.find(
    (b) => b.yearMonth === yearMonth && b.categoryId === editCatId,
  );
  const editCatBudgetCents = editCatBudget ? editCatBudget.amount : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Host style={styles.host}>
          <Column
            modifiers={[fillMaxSize()]}
            horizontalAlignment="center"
          >
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthChange={(date) => setSelectedMonth(date)}
              onOpenPicker={() => setShowMonthPicker(true)}
            />

            <Box modifiers={[fillMaxSize()]}>
              <ScrollView>
                <Column
                  verticalArrangement={{ spacedBy: 16 }}
                  horizontalAlignment="center"
                  modifiers={[fillMaxWidth(), paddingAll(16)]}
                >
                  <BudgetCard
                    spentCents={totalSpentCents}
                    budgetCents={totalBudgetCents}
                    onPress={() => setShowBudgetEdit(true)}
                    onCopyLastMonth={() => {
                      useFinanceStore
                        .getState()
                        .copyBudgetFromMonth(prevYm, yearMonth)
                        .catch(() => {});
                    }}
                    onStartFresh={() => setShowBudgetEdit(true)}
                    hasPrevBudget={hasPrevBudget}
                  />

                  {catsWithSpend.length === 0 ? (
                    <Text>No expenses this month</Text>
                  ) : (
                    catsWithSpend.map(({ cat, spent }) => {
                      const cb = categoryBudgets.find(
                        (b) =>
                          b.yearMonth === yearMonth &&
                          b.categoryId === cat.id,
                      );
                      return (
                        <BudgetCatCard
                          key={cat.id}
                          categoryName={cat.name}
                          categoryColor={cat.color}
                          categoryIcon={cat.icon}
                          spentCents={spent}
                          budgetCents={cb ? cb.amount : null}
                          onPress={() => {
                            setEditCatId(cat.id);
                            setShowCatBudgetEdit(true);
                          }}
                        />
                      );
                    })
                  )}
                </Column>
              </ScrollView>
            </Box>
          </Column>

          <BudgetEditBS
            key={`total-${yearMonth}`}
            open={showBudgetEdit}
            setOpen={setShowBudgetEdit}
            yearMonth={yearMonth}
            currentBudgetCents={totalBudgetCents}
          />
          <BudgetCatEditBS
            key={`cat-${yearMonth}-${editCatId}`}
            open={showCatBudgetEdit}
            setOpen={setShowCatBudgetEdit}
            yearMonth={yearMonth}
            categoryId={editCatId}
            categoryName={editCat?.name ?? ""}
            categoryColor={editCat?.color ?? "#000000"}
            categoryIcon={editCat?.icon ?? "check"}
            currentBudgetCents={editCatBudgetCents}
          />
        </Host>
      </View>

      {Platform.OS === "web" ? (
        showMonthPicker && (
          <input
            type="month"
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            ref={(input) => {
              if (input && input.showPicker) {
                input.showPicker();
              }
            }}
            onChange={(e) => {
              if (e.target.value) {
                const [year, month] = e.target.value.split("-").map(Number);
                if (year && month) {
                  setSelectedMonth(new Date(year, month - 1));
                }
              }
              setShowMonthPicker(false);
            }}
            onBlur={() => setShowMonthPicker(false)}
          />
        )
      ) : (
        <JSMonthPicker
          visible={showMonthPicker}
          value={selectedMonth}
          onChange={(date) => {
            setSelectedMonth(date);
            setShowMonthPicker(false);
          }}
          onClose={() => setShowMonthPicker(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inner: {
    flex: 1,
    width: "100%",
  },
  host: {
    flex: 1,
    width: "100%",
  },
});