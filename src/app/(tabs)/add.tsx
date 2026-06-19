import { useFinanceStore } from "@/store/useFinanceStore";
import { Button, Column, Host, Picker, Text, TextInput } from "@expo/ui";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { useState } from "react";

type TransactionInput = {
  type: "expense" | "income";
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
};

const types = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

export default function Add() {
  const categories = useFinanceStore((state) => state.categories);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transaction, setTransaction] = useState<TransactionInput>({
    type: "expense",
    amount: 0,
    categoryId: 1,
    date: new Date(),
    description: "",
  });

  return (
    <Host style={{ height: "100%", width: "100%" }}>
      <Column spacing={24} style={{ padding: 16 }}>
        <Column spacing={8}>
          <Text>Type:</Text>
          <Picker
            selectedValue={transaction.type}
            onValueChange={(value) =>
              setTransaction({ ...transaction, type: value })
            }
          >
            {types.map((t) => (
              <Picker.Item key={t.value} label={t.label} value={t.value} />
            ))}
          </Picker>
        </Column>

        <Column spacing={8}>
          <Text>Amount:</Text>
          <TextInput
            defaultValue={transaction.amount.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              setTransaction({ ...transaction, amount: Number(text) })
            }
          />
        </Column>

        <Column spacing={8}>
          <Text>Category:</Text>
          <Picker
            selectedValue={transaction.categoryId}
            onValueChange={(value) =>
              setTransaction({ ...transaction, categoryId: value })
            }
          >
            {categories.map((c) => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        </Column>

        <Column spacing={8}>
          <Text>Date:</Text>
          <Button variant="outlined" onPress={() => setShowDatePicker(true)} label={transaction.date.toLocaleDateString()} />
          {showDatePicker && (
            <DateTimePicker
              value={transaction.date}
              onChange={(event, value) => {
                setShowDatePicker(false);
                if (value) {
                  setTransaction({
                    ...transaction,
                    date: value as Date,
                  });
                }
              }}
            />
          )}
        </Column>

        <Column spacing={8}>
          <Text>Description:</Text>
          <TextInput
            defaultValue={transaction.description}
            onChangeText={(text) =>
              setTransaction({ ...transaction, description: text })
            }
          />
        </Column>

        <Button
          label="Add Transaction"
          onPress={() => {
            // Add transaction to store
            addTransaction({
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
    </Host>
  );
}
