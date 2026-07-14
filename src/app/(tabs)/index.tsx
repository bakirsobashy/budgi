import AddButton from "@/components/AddButton";
import AddTransactionButtomSheet from "@/components/AddTransactionButtomSheet";
import MonthSelector, { JSMonthPicker } from "@/components/MonthSelector";
import TransactionCard from "@/components/TransactionCard";
import TransDescBS from "@/components/TransDescBS";
import TransEditBS from "@/components/TransEditBS";
import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { ScrollView } from "@expo/ui";
import {
  Box,
  Column,
  Host,
  OutlinedButton,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import { Platform } from "react-native";

const Index = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const categories = useFinanceStore((state) => state.categories);
  const [showAddButtomSheet, setShowAddButtomSheet] = useState(false);
  const [showDescButtomSheet, setShowDescButtomSheet] = useState(false);
  const [showEditButtomSheet, setShowEditButtomSheet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [type, setType] = useState<"expense" | "income">("expense");

  // Lifted state for Month Picker
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  return (
    <>
      <Host style={{ flex: 1 }}>
        <Column>
          <Column
            modifiers={[fillMaxWidth(), padding(8, 40, 8, 0)]}
            horizontalAlignment="center"
          >
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthChange={(date) => setSelectedMonth(date)}
              onOpenPicker={() => setShowMonthPicker(true)}
            />
            {(() => {
              const monthTxs = transactions.filter(
                (tx) =>
                  new Date(tx.date).getFullYear() ===
                    selectedMonth.getFullYear() &&
                  new Date(tx.date).getMonth() === selectedMonth.getMonth(),
              );
              const income = monthTxs
                .filter((tx) => tx.type === "income")
                .reduce((sum, tx) => sum + tx.amount, 0);
              const expense = monthTxs
                .filter((tx) => tx.type === "expense")
                .reduce((sum, tx) => sum + tx.amount, 0);
              const total = income - expense;
              return (
                <>
                  <OutlinedButton>
                    <Text>{`Total: ${total >= 0 ? "+" : "-"}$${Math.abs(total).toFixed(2)}`}</Text>
                  </OutlinedButton>
                  <OutlinedButton>
                    <Text>{`Income: +$${income.toFixed(2)} | Expense: -$${expense.toFixed(2)}`}</Text>
                  </OutlinedButton>
                </>
              );
            })()}
          </Column>
          <Box modifiers={[fillMaxSize()]}>
            <ScrollView>
              <Column
                verticalArrangement={{ spacedBy: 16 }}
                modifiers={[fillMaxWidth(), paddingAll(16)]}
              >
                {Object.entries(
                  transactions
                    .filter(
                      (tx) =>
                        new Date(tx.date).getFullYear() ===
                          selectedMonth.getFullYear() &&
                        new Date(tx.date).getMonth() ===
                          selectedMonth.getMonth(),
                    )
                    .reduce(
                      (groups, tx) => {
                        const dayKey = new Date(tx.date).toDateString();
                        if (!groups[dayKey]) groups[dayKey] = [];
                        groups[dayKey].push(tx);
                        return groups;
                      },
                      {} as Record<string, Transaction[]>,
                    ),
                )
                  .sort(
                    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime(),
                  )
                  .map(([dayKey, txs]) => (
                    <Column
                      key={dayKey}
                      verticalArrangement={{ spacedBy: 4 }}
                      modifiers={[fillMaxWidth()]}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {new Date(dayKey).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </Text>
                      <Column verticalArrangement={{ spacedBy: 4 }}>
                        {txs.map((tx) => {
                          const category = categories.find(
                            (c) => c.id === tx.categoryId,
                          );
                          return (
                            <TransactionCard
                              key={tx.id}
                              amount={tx.amount}
                              category={category?.name}
                              color={category?.color}
                              icon={category?.icon}
                              type={tx.type}
                              onPress={() => {
                                setSelectedTransaction(tx);
                                setShowDescButtomSheet(true);
                              }}
                              onEditPress={() => {
                                setSelectedTransaction(tx);
                                setShowEditButtomSheet(true);
                              }}
                            />
                          );
                        })}
                      </Column>
                    </Column>
                  ))}
              </Column>
            </ScrollView>
            <AddButton
              onClick={(type) => {
                setShowAddButtomSheet(true);
                setType(type);
              }}
            />
          </Box>
          <AddTransactionButtomSheet
            showAddButtomSheet={showAddButtomSheet}
            setShowAddButtomSheet={setShowAddButtomSheet}
            type={type}
            setType={setType}
          />
          <TransDescBS
            showBottomSheet={showDescButtomSheet}
            setShowBottomSheet={setShowDescButtomSheet}
            selectedTransaction={selectedTransaction}
          />
          <TransEditBS
            showBottomSheet={showEditButtomSheet}
            setShowBottomSheet={setShowEditButtomSheet}
            selectedTransaction={selectedTransaction}
          />
        </Column>
      </Host>
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
                setSelectedMonth(new Date(e.target.value));
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
    </>
  );
};

export default Index;
