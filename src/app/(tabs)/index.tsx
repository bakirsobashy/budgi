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
  fillMaxWidth,
  fillMaxSize,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import { Platform, View } from "react-native";

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
            <OutlinedButton>
              <Text>total:1500</Text>
            </OutlinedButton>
          </Column>
          <Box modifiers={[fillMaxSize()]}>
            <ScrollView>
              <Column
                verticalArrangement={{ spacedBy: 16 }}
                modifiers={[fillMaxWidth(), paddingAll(16)]}
              >
                {transactions
                  .filter(
                    (tx) =>
                      new Date(tx.date).getFullYear() ===
                        selectedMonth.getFullYear() &&
                      new Date(tx.date).getMonth() === selectedMonth.getMonth(),
                  )
                  .map((tx) => {
                    const categoryName = categories.find(
                      (c) => c.id === tx.categoryId,
                    )?.name;
                    return (
                      <TransactionCard
                        key={tx.id}
                        amount={tx.amount}
                        date={new Date(tx.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                        category={categoryName}
                        color={
                          categories.find((c) => c.id === tx.categoryId)?.color
                        }
                        icon={
                          categories.find((c) => c.id === tx.categoryId)?.icon
                        }
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
