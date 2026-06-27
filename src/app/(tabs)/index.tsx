import AddButton from "@/components/AddButton";
import AddTransactionButtomSheet from "@/components/AddTransactionButtomSheet";
import MonthSelector from "@/components/MonthSelector";
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
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
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
      <Column>
        <Column modifiers={[padding(8, 40, 8, 0)]} horizontalAlignment="center">
          <MonthSelector />
          <OutlinedButton>
            <Text>total:1500</Text>
          </OutlinedButton>
        </Column>
        <Box>
          <ScrollView>
            <Column
              verticalArrangement={{ spacedBy: 16 }}
              modifiers={[fillMaxWidth(), paddingAll(16)]}
            >
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
                    color={
                      categories.find((c) => c.id === tx.categoryId)?.color
                    }
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
      </Column>
    </Host>
  );
};

export default Index;
