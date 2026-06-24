import AddButton from "@/components/AddButton";
import AddTransactionButtomSheet from "@/components/AddTransactionButtomSheet";
import TransactionCard from "@/components/TransactionCard";
import TransDescBS from "@/components/TransDescBS";
import TransEditBS from "@/components/TransEditBS";
import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Column, ScrollView } from "@expo/ui";
import { Box, Host } from "@expo/ui/jetpack-compose";
import { useState } from "react";

const Index = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const categories = useFinanceStore((state) => state.categories);
  const [showAddButtomSheet, setShowAddButtomSheet] = useState(false);
  const [showDescButtomSheet, setShowDescButtomSheet] = useState(false);
  const [showEditButtomSheet, setShowEditButtomSheet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [type, setType] = useState<"expense" | "income">("expense");
  return (
    <Host style={{ flex: 1 }}>
      <Box>
        <ScrollView>
          <Column style={{ padding: 16 }} spacing={16}>
            {transactions.map((tx) => {
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
                  color={categories.find((c) => c.id === tx.categoryId)?.color}
                  icon={categories.find((c) => c.id === tx.categoryId)?.icon}
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
    </Host>
  );
};

export default Index;
