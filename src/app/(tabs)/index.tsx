import AddButton from "@/components/AddButton";
import AddTransactionButtomSheet from "@/components/AddTransactionButtomSheet";
import MonthSelector from "@/components/MonthSelector";
import TransactionCard from "@/components/TransactionCard";
import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Column, Text } from "@expo/ui";
import { Host } from "@expo/ui/jetpack-compose";
import { useState } from "react";

const Index = () => {
    const transactions = useFinanceStore((state) => state.transactions);
    const categories = useFinanceStore((state) => state.categories);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [showAddButtomSheet, setShowAddButtomSheet] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    return (
        <Host style={{ flex: 1 }}>
            <Column style={{ padding: 16 }} spacing={16}>
                <MonthSelector />
                {transactions.map((tx) => {
                    const categoryName = categories.find((c) => c.id === tx.categoryId)?.name;
                    return (
                        <TransactionCard
                            key={tx.id}
                            amount={tx.amount}
                            date={new Date(tx.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                            category={categoryName}
                            onPress={() => { setSelectedTransaction(tx); setShowBottomSheet(true) }} />
                    );
                })}
                <AddButton onClick={() => setShowAddButtomSheet(true)} />
            </Column>
            <BottomSheet isPresented={showBottomSheet} onDismiss={() => setShowBottomSheet(false)}>
                <Column spacing={16} style={{ padding: 16 }}>
                    <Text>Transaction Details</Text>
                    <Text>{`Description: ${selectedTransaction?.description ?? 'No description'}`}</Text>
                </Column>
            </BottomSheet>
            <AddTransactionButtomSheet showAddButtomSheet={showAddButtomSheet} setShowAddButtomSheet={setShowAddButtomSheet} />
        </Host>
    )
}

export default Index
