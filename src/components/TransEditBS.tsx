import { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Spacer, Text, TextInput } from "@expo/ui";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import {
  BasicTextField,
  Box,
  Button,
  Column,
  OutlinedButton,
  Row,
} from "@expo/ui/jetpack-compose";
import {
  background,
  clip,
  fillMaxWidth,
  padding,
  paddingAll,
  Shapes,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import CatSelectDM from "./CatSelectDM";

type TransactionInput = {
  type: "expense" | "income";
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
};
export default function TransEditBS({
  showBottomSheet,
  setShowBottomSheet,
  selectedTransaction,
}: {
  showBottomSheet: boolean;
  setShowBottomSheet: (showBottomSheet: boolean) => void;
  selectedTransaction: Transaction | null;
}) {
  const [transaction, setTransaction] = useState<TransactionInput>({
    type: selectedTransaction?.type || "expense",
    amount: selectedTransaction?.amount ?? 0,
    categoryId: selectedTransaction?.categoryId ?? 1,
    date: selectedTransaction?.date
      ? new Date(selectedTransaction.date)
      : new Date(),
    description: selectedTransaction?.description || "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  const categories = useFinanceStore((state) => state.categories).filter(
    (c) => c.type === transaction.type,
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

  return (
    <BottomSheet
      isPresented={showBottomSheet}
      onDismiss={() => setShowBottomSheet(false)}
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
        <BasicTextField
          onValueChange={(text) =>
            setTransaction({ ...transaction, description: text })
          }
          cursorColor="#7c3aed"
          modifiers={[
            fillMaxWidth(),
            clip(Shapes.RoundedCorner(12)),
            background("#e3e2e2ff"),
            padding(12, 10, 12, 10),
          ]}
        >
          <BasicTextField.DecorationBox>
            <Box>
              <BasicTextField.Placeholder>
                <Text>Description</Text>
              </BasicTextField.Placeholder>
              <BasicTextField.InnerTextField />
            </Box>
          </BasicTextField.DecorationBox>
        </BasicTextField>
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
        {error ? <Text textStyle={{ color: "red" }}>{error}</Text> : null}
        <Row>
          <Button
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            onClick={() => {
              if (!selectedTransaction?.id) {
                setError("No transaction selected");
                return;
              }
              useFinanceStore
                .getState()
                .deleteTransaction(selectedTransaction.id);
              setShowBottomSheet(false);
            }}
          >
            <Text>Delete</Text>
          </Button>
          <Spacer flexible />
          <Button
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            onClick={() => {
              const validationError = validate();
              if (validationError) {
                setError(validationError);
                return;
              }
              if (!selectedTransaction?.id) {
                setError("No transaction selected");
                return;
              }
              setError("");
              useFinanceStore.getState().updateTransaction(selectedTransaction.id, {
                ...transaction,
                date: transaction.date.toISOString(),
              });
              setShowBottomSheet(false);
              setShowDatePicker(false);
            }}
          >
            <Text>Done</Text>
          </Button>
        </Row>
      </Column>
    </BottomSheet>
  );
}
