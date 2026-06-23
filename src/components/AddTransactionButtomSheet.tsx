import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Button, Spacer, Text, TextInput } from "@expo/ui";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { BasicTextField, Box, Column, Row } from "@expo/ui/jetpack-compose";
import {
  background,
  clip,
  fillMaxWidth,
  padding,
  paddingAll,
  Shapes,
} from "@expo/ui/jetpack-compose/modifiers";
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

  useEffect(() => {
    setTransaction((prev) => ({ ...prev, type }));
  }, [type]);

  const categories = useFinanceStore((state) => state.categories).filter(
    (c) => c.type === transaction.type,
  );

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
          <Button
            variant="outlined"
            onPress={() => setShowDatePicker(true)}
            label={transaction.date.toLocaleDateString()}
          />
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
              type: type,
              amount: 0,
              categoryId: 1,
              date: new Date(),
              description: "",
            });
            setShowAddButtomSheet(false);
            setShowDatePicker(false);
          }}
        />
      </Column>
    </BottomSheet>
  );
}
