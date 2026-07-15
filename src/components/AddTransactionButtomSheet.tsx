import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Spacer, Text, TextInput, useNativeState } from "@expo/ui";
import DateTimePickerDefault from "@expo/ui/community/datetime-picker";
import {
  Button,
  Column,
  OutlinedButton,
  OutlinedTextField,
  Row,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import CatSelectDM from "./CatSelectDM";

type TransactionInput = {
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
};

const EMPTY_FORM: TransactionInput = {
  amount: 0,
  categoryId: 1,
  date: new Date(),
  description: "",
};

export default function AddTransactionButtomSheet({
  showAddButtomSheet,
  setShowAddButtomSheet,
  type,
}: {
  showAddButtomSheet: boolean;
  setShowAddButtomSheet: (showAddButtomSheet: boolean) => void;
  type: "expense" | "income";
  setType: (type: "expense" | "income") => void;
}) {
  const [transaction, setTransaction] = useState<TransactionInput>(EMPTY_FORM);
  const amountState = useNativeState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  const categories = useFinanceStore((state) => state.categories).filter(
    (c) => c.type === type,
  );

  const validate = () => {
    if (!transaction.amount || transaction.amount <= 0) {
      return "Amount must be greater than 0";
    }
    if (!transaction.categoryId) {
      return "Please select a category";
    }
    if (!transaction.date || isNaN(transaction.date.getTime())) {
      return "Please select a valid date";
    }
    return "";
  };

  const handleAmountChange = (text: string) => {
    // ObservableState is intentionally mutable shared state.
    // eslint-disable-next-line react-hooks/immutability
    amountState.value = text;
    const parsed = text === "" ? 0 : Number(text);
    setTransaction((prev) => ({
      ...prev,
      amount: Number.isFinite(parsed) ? parsed : 0,
    }));
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
            value={amountState}
            keyboardType="numeric"
            onChangeText={handleAmountChange}
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
            <DateTimePickerDefault
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
          onValueChange={(text) =>
            setTransaction({ ...transaction, description: text })
          }
        >
          <OutlinedTextField.Label>
            <Text>Description</Text>
          </OutlinedTextField.Label>
        </OutlinedTextField>
        {error ? <Text textStyle={{ color: "red" }}>{error}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={() => {
            const validationError = validate();
            if (validationError) {
              setError(validationError);
              return;
            }
            setError("");
            useFinanceStore.getState().addTransaction({
              ...transaction,
              type,
              date: transaction.date.toISOString(),
            });
            // Reset form
            setTransaction(EMPTY_FORM);
            // ObservableState is intentionally mutable shared state.
            // eslint-disable-next-line react-hooks/immutability
            amountState.value = "";
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
