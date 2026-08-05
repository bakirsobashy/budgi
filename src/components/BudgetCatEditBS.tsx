import { getIconSource } from "@/lib/icons";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Spacer, Text } from "@expo/ui";
import {
  Button,
  Column,
  Icon,
  ModalBottomSheet,
  OutlinedTextField,
  Row,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

const fmt = (cents: number) => (cents / 100).toString();

export default function BudgetCatEditBS({
  open,
  setOpen,
  yearMonth,
  categoryId,
  categoryName,
  categoryColor,
  categoryIcon,
  currentBudgetCents,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  yearMonth: string;
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  currentBudgetCents: number | null;
}) {
  const amountState = useNativeState(
    currentBudgetCents !== null ? fmt(currentBudgetCents) : "",
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const resetAndClose = () => {
    amountState.set(currentBudgetCents !== null ? fmt(currentBudgetCents) : "");
    setError("");
    setOpen(false);
  };

  return (
    <ModalBottomSheet onDismissRequest={resetAndClose}>
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Row>
          <Icon
            source={getIconSource(categoryIcon)}
            size={24}
            tint={categoryColor}
          />
          <Spacer size={8} />
          <Text textStyle={{ color: categoryColor, fontWeight: "bold" }}>
            {categoryName}
          </Text>
        </Row>
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
        {error ? <Text textStyle={{ color: "red" }}>{error}</Text> : null}
        <Row>
          {currentBudgetCents !== null ? (
            <Button
              colors={{ containerColor: "red", contentColor: "#FFFFFF" }}
              onClick={async () => {
                try {
                  await useFinanceStore
                    .getState()
                    .deleteCategoryBudget(yearMonth, categoryId);
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
          <Spacer flexible />
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
                  .setCategoryBudget(yearMonth, categoryId, cents);
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
        </Row>
      </Column>
    </ModalBottomSheet>
  );
}
