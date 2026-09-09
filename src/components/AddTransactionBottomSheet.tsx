import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Spacer, Text } from "@expo/ui";
import DateTimePickerDefault from "@expo/ui/community/datetime-picker";
import {
  Button,
  Column,
  OutlinedButton,
  OutlinedTextField,
  Row,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import CatSelectDM from "./CatSelectDM";

type TransactionInput = {
  amount: number; // cents
  categoryId: number;
  date: Date;
  description: string;
};

const EMPTY_FORM: TransactionInput = {
  amount: 0,
  categoryId: 0,
  date: new Date(),
  description: "",
};

export default function AddTransactionBottomSheet({
  showAddButtomSheet,
  setShowAddButtomSheet,
  type,
}: {
  showAddButtomSheet: boolean;
  setShowAddButtomSheet: (showAddButtomSheet: boolean) => void;
  type: "expense" | "income";
}) {
  // Local form state. We reset it in `onDismiss` (an event handler, not an
  // effect) so the form is fresh the next time the sheet opens, without
  // remounting the component (which would break the native sheet's dismiss
  // gesture/overlay wiring).
  const [transaction, setTransaction] = useState<TransactionInput>({
    ...EMPTY_FORM,
    date: new Date(),
  });
  const amountState = useNativeState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // const resetForm = useCallback(() => {
  //   setTransaction({ ...EMPTY_FORM, date: new Date() });
  //   amountState.set("");
  //   setError("");
  //   setShowDatePicker(false);
  //   setSubmitting(false);
  // }, [amountState]);

  // Reset the form when the sheet opens, not while it is closing. Updating the
  // native text-field state during the dismiss animation can race with the
  // ModalBottomSheet's RNHostView teardown and trigger the "child already has a
  // parent" crash.
  // useEffect(() => {
  //   if (showAddButtomSheet) {
  //     resetForm();
  //   }
  // }, [showAddButtomSheet, resetForm]);

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
    // Parse the user-entered dollars into integer cents.
    const parsed = text === "" ? 0 : Math.round(Number(text) * 100);
    setTransaction((prev) => ({
      ...prev,
      amount: Number.isFinite(parsed) ? parsed : 0,
    }));
  };

  return (
    <BottomSheet
      isPresented={showAddButtomSheet}
      onDismiss={() => {
        setShowAddButtomSheet(false);
      }}
    >
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <OutlinedTextField
          keyboardOptions={{
            keyboardType: "number",
          }}
          value={amountState}
          colors={{
            focusedIndicatorColor: "#000000",
            unfocusedIndicatorColor: "#000000",
            focusedContainerColor: "transparent",
            unfocusedContainerColor: "transparent",
            focusedLabelColor: "#000000",
            unfocusedLabelColor: "#000000",
          }}
          onValueChange={handleAmountChange}
        >
          <OutlinedTextField.Label>
            <Text>Amount</Text>
          </OutlinedTextField.Label>
        </OutlinedTextField>
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
        {error ? <Text textStyle={{ color: "red" }}>{error}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={async () => {
            const validationError = validate();
            if (validationError) {
              setError(validationError);
              return;
            }
            setError("");
            setSubmitting(true);
            try {
              await useFinanceStore.getState().addTransaction({
                amount: transaction.amount,
                type,
                date: transaction.date.toISOString(),
                categoryId: transaction.categoryId,
                description: transaction.description,
              });
              setShowAddButtomSheet(false);
              setShowDatePicker(false);
            } catch (e) {
              setError(
                e instanceof Error ? e.message : "Failed to add transaction",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Text>{submitting ? "Adding..." : "Add Transaction"}</Text>
        </Button>
      </Column>
    </BottomSheet>
  );
}
