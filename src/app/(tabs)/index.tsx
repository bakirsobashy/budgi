import AddButton from "@/components/AddButton";
import AddTransactionButtomSheet from "@/components/AddTransactionButtomSheet";
import MonthSelector from "@/components/MonthSelector";
import TransactionCard from "@/components/TransactionCard";
import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Column } from "@expo/ui";
import { Box, Host } from "@expo/ui/jetpack-compose";
import { useState } from "react";


const Index = () => {
    const transactions = useFinanceStore((state) => state.transactions);
    const categories = useFinanceStore((state) => state.categories);
    const [showAddButtomSheet, setShowAddButtomSheet] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [type, setType] = useState<"expense" | "income">("expense");
    return (
        <Host style={{ flex: 1 }}>
            <Box>
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
                            // onPress={() => { setSelectedTransaction(tx); setShowBottomSheet(true) }}
                            />
                        );
                    })}
                </Column>
                <AddButton onClick={(type) => { setShowAddButtomSheet(true); setType(type) }} />
                <AddTransactionButtomSheet showAddButtomSheet={showAddButtomSheet} setShowAddButtomSheet={setShowAddButtomSheet} type={type} setType={setType} />
            </Box>
        </Host>
    )
}

export default Index
