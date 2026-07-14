import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Spacer, Text, TextInput } from "@expo/ui";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import {
  Button,
  Column,
  OutlinedButton,
  OutlinedTextField,
  Row,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useEffect, useState } from "react";
import CatSelectDM from "./CatSelectDM";

type TransactionInput = {
  type: "expense" | "income";
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
};
export default function AddTransactionButtomSheet({
  showAddButtomSheet,
  setShowAddButtomSheet,
  type,
  setType,
}: {
  showAddButtomSheet: boolean;
  setShowAddButtomSheet: (showAddButtomSheet: boolean) => void;
  type: "expense" | "income";
  setType: (type: "expense" | "income") => void;
}) {
  const [transaction, setTransaction] = useState<TransactionInput>({
    type: type,
    amount: 0,
    categoryId: 1,
    date: new Date(),
    description: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTransaction((prev) => ({ ...prev, type }));
  }, [type]);

  const categories = useFinanceStore((state) => state.categories).filter(
    (c) => c.type === transaction.type,
  );

  const validate = () => {
    if (!transaction.amount || transaction.amount <= 0) {
      return "Amount must be greater than 0";
    }
    if (!transaction.categoryId || transaction.categoryId === 1) {
      return "Please select a category other than Uncategorized";
    }
    if (!transaction.date || isNaN(transaction.date.getTime())) {
      return "Please select a valid date";
    }
    return "";
  };

  return (
    <BottomSheet
      isPresented={showAddButtomSheet}
      onDismiss={() => setShowAddButtomSheet(false)}
    >
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Row modifiers={[fillMaxWidth()]}>
          <Text>Amount:</Text>
          <Spacer flexible />
          <TextInput
            modifiers={[fillMaxWidth(0.5)]}
            placeholder="Amount"
            defaultValue={transaction.amount.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              setTransaction({ ...transaction, amount: Number(text) })
            }
          />
        </Row>
        <Row>
          <Text>Category:</Text>
          <Spacer flexible />
          <CatSelectDM
            categories={categories}
            setCategory={(catId: number) =>
              setTransaction({ ...transaction, categoryId: catId })
            }
          />
        </Row>
        <Row>
          <Text>Date:</Text>
          <Spacer flexible />
          <OutlinedButton onClick={() => setShowDatePicker(true)}>
            <Text>{transaction.date.toLocaleDateString()}</Text>
          </OutlinedButton>
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
        </Row>
        <OutlinedTextField
          colors={{
            focusedIndicatorColor: "#000000",
            unfocusedIndicatorColor: "#000000",
            focusedContainerColor: "transparent",
            unfocusedContainerColor: "transparent",
            focusedLabelColor: "#000000",
            unfocusedLabelColor: "#000000",
          }}
          // value={transaction.description}
          onValueChange={(text) =>
            setTransaction({ ...transaction, description: text })
          }
        >
          <OutlinedTextField.Label>
            <Text>Description</Text>
          </OutlinedTextField.Label>
        </OutlinedTextField>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={() => {
            const validationError = validate();
            if (validationError) {
              setError(validationError);
              return;
            }
            setError("");
            // Add transaction to store
            useFinanceStore.getState().addTransaction({
              ...transaction,
              date: transaction.date.toISOString(),
            });
            // Reset form
            setTransaction({
              type: type,
              amount: 0,
              categoryId: 1,
              date: new Date(),
              description: "",
            });
            setShowAddButtomSheet(false);
            setShowDatePicker(false);
          }}
        >
          <Text>Add Transaction</Text>
        </Button>
      </Column>
    </BottomSheet>
  );
}
