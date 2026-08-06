import AddButton from "@/components/AddButton";
import AddTransactionBottomSheet from "@/components/AddTransactionBottomSheet";
import InfoDialog from "@/components/InfoDialog";
import MonthSelector, { JSMonthPicker } from "@/components/MonthSelector";
import TransactionCard from "@/components/TransactionCard";
import TransDescBS from "@/components/TransDescBS";
import TransEditBS from "@/components/TransEditBS";
import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { ScrollView, Spacer } from "@expo/ui";
import {
  Box,
  Column,
  Host,
  Icon,
  IconButton,
  OutlinedButton,
  Row,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [showAboutSheet, setShowAboutSheet] = useState(false);

  const monthTxs = transactions.filter(
    (tx) =>
      new Date(tx.date).getFullYear() === selectedMonth.getFullYear() &&
      new Date(tx.date).getMonth() === selectedMonth.getMonth(),
  );
  // Amounts are stored in cents; sum in cents then convert to dollars for display.
  const incomeCents = monthTxs
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expenseCents = monthTxs
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalCents = incomeCents - expenseCents;
  const income = incomeCents / 100;
  const expense = expenseCents / 100;
  const total = totalCents / 100;

  const INFO_ICON = { uri: "ic_info" };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Host style={styles.host}>
          <View style={styles.aboutButton} pointerEvents="box-none"></View>
          <Column modifiers={[fillMaxSize()]} horizontalAlignment="center">
            <Spacer size={16} />
            <Box>
              <IconButton
                onClick={() => setShowAboutSheet(true)}
                colors={{
                  containerColor: "transparent",
                }}
              >
                <Icon source={INFO_ICON} size={24} tint={"black"} />
              </IconButton>
              {showAboutSheet && (
                <InfoDialog setShowAboutSheet={setShowAboutSheet}></InfoDialog>
              )}
              <Row
                horizontalArrangement="center"
                verticalAlignment="center"
                modifiers={[fillMaxWidth()]}
              >
                <MonthSelector
                  selectedMonth={selectedMonth}
                  onMonthChange={(date) => setSelectedMonth(date)}
                  onOpenPicker={() => setShowMonthPicker(true)}
                />
              </Row>
            </Box>
            <OutlinedButton>
              <Text
                style={{ fontWeight: "bold" }}
              >{`Total: ${total >= 0 ? "+" : "-"}$${Math.abs(total).toFixed(2)}`}</Text>
            </OutlinedButton>
            <OutlinedButton>
              <Text
                style={{ fontWeight: "bold" }}
              >{`Income: +$${income.toFixed(2)} | Expense: -$${expense.toFixed(2)}`}</Text>
            </OutlinedButton>

            <Box modifiers={[fillMaxSize()]}>
              <ScrollView>
                <Column
                  verticalArrangement={{ spacedBy: 16 }}
                  horizontalAlignment="center"
                  modifiers={[fillMaxWidth(), paddingAll(16)]}
                >
                  {Object.entries(
                    monthTxs.reduce(
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
                      ([a], [b]) =>
                        new Date(b).getTime() - new Date(a).getTime(),
                    )
                    .map(([dayKey, txs]) => (
                      <Column
                        key={dayKey}
                        verticalArrangement={{ spacedBy: 4 }}
                        horizontalAlignment="center"
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
                                amount={tx.amount / 100}
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
                  setType(type);
                  setShowAddButtomSheet(true);
                }}
              />
            </Box>
          </Column>

          <AddTransactionBottomSheet
            showAddButtomSheet={showAddButtomSheet}
            setShowAddButtomSheet={setShowAddButtomSheet}
            type={type}
          />
          <TransDescBS
            showBottomSheet={showDescButtomSheet}
            setShowBottomSheet={setShowDescButtomSheet}
            selectedTransaction={selectedTransaction}
          />
          <TransEditBS
            key={selectedTransaction?.id ?? "new"}
            showBottomSheet={showEditButtomSheet}
            setShowBottomSheet={setShowEditButtomSheet}
            selectedTransaction={selectedTransaction}
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
};

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
  aboutButton: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 10,
  },
});

export default Index;
