import { useFinanceStore } from "@/store/useFinanceStore";
import { Spacer, Text, TextInput, useNativeState } from "@expo/ui";
import {
  Button,
  Column,
  ModalBottomSheet,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

const fmt = (cents: number) => (cents / 100).toString();

export default function BudgetEditBS({
  open,
  setOpen,
  yearMonth,
  currentBudgetCents,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  yearMonth: string;
  currentBudgetCents: number | null;
}) {
  const amountState = useNativeState(
    currentBudgetCents !== null ? fmt(currentBudgetCents) : "",
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const resetAndClose = () => {
    // ObservableState is intentionally mutable shared state.
    // eslint-disable-next-line react-hooks/immutability
    amountState.value = currentBudgetCents !== null ? fmt(currentBudgetCents) : "";
    setError("");
    setOpen(false);
  };

  return (
    <ModalBottomSheet onDismissRequest={resetAndClose}>
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Text>Set Monthly Budget</Text>
        <TextInput
          modifiers={[fillMaxWidth()]}
          placeholder="Budget amount ($)"
          value={amountState}
          keyboardType="numeric"
          onChangeText={(text) => {
            // ObservableState is intentionally mutable shared state.
            // eslint-disable-next-line react-hooks/immutability
            amountState.value = text;
          }}
        />
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
            setError("");
            setSubmitting(true);
            try {
              await useFinanceStore
                .getState()
                .setMonthlyBudget(yearMonth, cents);
              setOpen(false);
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
        {currentBudgetCents !== null ? (
          <Button
            colors={{ containerColor: "red", contentColor: "#FFFFFF" }}
            onClick={async () => {
              try {
                await useFinanceStore
                  .getState()
                  .deleteMonthlyBudget(yearMonth);
                setOpen(false);
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "Failed to delete budget",
                );
              }
            }}
          >
            <Text>Delete</Text>
          </Button>
        ) : null}
        <Spacer size={8} />
      </Column>
    </ModalBottomSheet>
  );
}