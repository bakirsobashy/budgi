import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Button, Picker, TextInput } from "@expo/ui";
import { Column, DateTimePicker } from "@expo/ui/jetpack-compose";
import { useState } from "react";

type TransactionInput = {
    type: "expense" | "income";
    amount: number;
    categoryId: number;
    date: Date;
    description: string;
};
export default function AddTransactionButtomSheet({ showAddButtomSheet, setShowAddButtomSheet, type, setType }: { showAddButtomSheet: boolean, setShowAddButtomSheet: (showAddButtomSheet: boolean) => void, type: "expense" | "income", setType: (type: "expense" | "income") => void }) {
    const [transaction, setTransaction] = useState<TransactionInput>({
        type: type,
        amount: 0,
        categoryId: 1,
        date: new Date(),
        description: "",
    })
    return (
        <BottomSheet isPresented={showAddButtomSheet} onDismiss={() => setShowAddButtomSheet(false)}>
            <Column >
                <TextInput
                    placeholder="Amount"
                    defaultValue={transaction.amount.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        setTransaction({ ...transaction, amount: Number(text) })
                    }
                />
                <Picker selectedValue={transaction.categoryId} onValueChange={(value) => setTransaction({ ...transaction, categoryId: value })}>
                    {useFinanceStore((state) => state.categories).map((c) => (
                        console.log(c),
                        <Picker.Item key={c.id} label={c.name} value={c.id} />
                    ))}
                </Picker>
                <TextInput
                    placeholder="Description"
                    defaultValue={transaction.description}
                    onChangeText={(text) =>
                        setTransaction({ ...transaction, description: text })
                    }
                />
                <DateTimePicker
                    onDateSelected={date => {
                        setTransaction({ ...transaction, date: date });
                    }}
                    displayedComponents="date"
                    initialDate={transaction.date.toISOString()}
                    variant="picker"
                />
                <Button
                    label="Add Transaction"
                    onPress={() => {
                        // Add transaction to store
                        useFinanceStore.getState().addTransaction({
                            ...transaction,
                            date: transaction.date.toISOString(),
                        });
                        // Reset form
                        setTransaction({
                            type: "expense",
                            amount: 0,
                            categoryId: 1,
                            date: new Date(),
                            description: "",
                        });
                    }}
                />
            </Column>
        </BottomSheet >
    );
}
