import type { Category } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Spacer, Text } from "@expo/ui";
import {
  Button,
  Column,
  ModalBottomSheet,
  OutlinedTextField,
  Row,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

import CatSelectDM from "./CatSelectDM";

export default function AddCatBudgetBS({
  open,
  setOpen,
  yearMonth,
  availableCategories,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  yearMonth: string;
  availableCategories: Category[];
}) {
  const amountState = useNativeState("");
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const resetAndClose = () => {
    amountState.set("");
    setSelectedCatId(0);
    setError("");
    setOpen(false);
  };

  return (
    <ModalBottomSheet onDismissRequest={resetAndClose}>
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Text>Set Category Budget</Text>
        <Text textStyle={{ fontWeight: "bold" }}>{yearMonth}</Text>
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
        >
          <OutlinedTextField.Label>
            <Text>Budget amount ($)</Text>
          </OutlinedTextField.Label>
        </OutlinedTextField>
        <Row>
          <Text>Category:</Text>
          <Spacer flexible />
          <CatSelectDM
            categories={availableCategories}
            setCategory={(catId: number) => setSelectedCatId(catId)}
          />
        </Row>
        {error ? <Text textStyle={{ color: "red" }}>{error}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={async () => {
            const raw = amountState.value;
            const cents = Math.round(Number(raw) * 100);
            if (!Number.isFinite(cents) || cents <= 0) {
              setError("Enter a valid amount");
              return;
            }
            if (!selectedCatId) {
              setError("Please select a category");
              return;
            }
            setError("");
            setSubmitting(true);
            try {
              await useFinanceStore
                .getState()
                .setCategoryBudget(yearMonth, selectedCatId, cents);
              resetAndClose();
            } catch (e) {
              setError(
                e instanceof Error ? e.message : "Failed to save budget",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Text>{submitting ? "Saving..." : "Save"}</Text>
        </Button>
      </Column>
    </ModalBottomSheet>
  );
}
