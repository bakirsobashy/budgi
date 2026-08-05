import type { Transaction } from "@/lib/types";
import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet } from "@expo/ui";
import { Column, Row, Text } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";

export default function TransDescBS({
  showBottomSheet,
  setShowBottomSheet,
  selectedTransaction,
}: {
  showBottomSheet: boolean;
  setShowBottomSheet: (showBottomSheet: boolean) => void;
  selectedTransaction: Transaction | null;
}) {
  const categories = useFinanceStore((state) => state.categories);
  const category = categories.find(
    (c) => c.id === selectedTransaction?.categoryId,
  );

  const amountCents = selectedTransaction?.amount ?? 0;
  const amount = amountCents / 100;
  const type = selectedTransaction?.type ?? "expense";
  const date = selectedTransaction?.date
    ? new Date(selectedTransaction.date).toLocaleDateString()
    : "Unknown date";
  const description = selectedTransaction?.description || "No description";

  return (
    <BottomSheet
      isPresented={showBottomSheet}
      onDismiss={() => setShowBottomSheet(false)}
    >
      <Column
        verticalArrangement={{ spacedBy: 18 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Row modifiers={[fillMaxWidth()]}>
          <Text style={{ fontWeight: "bold" }}>Amount: </Text>
          <Text
            style={{ fontWeight: "bold" }}
            color={type === "income" ? "green" : "red"}
          >
            {`${type === "income" ? "+" : "-"}$${amount.toFixed(2)}`}
          </Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Text
            style={{ fontWeight: "bold" }}
            color={category?.color || undefined}
          >
            {category?.name || "Uncategorized"}
          </Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text style={{ fontWeight: "bold" }}>Date: </Text>
          <Text style={{ fontWeight: "bold" }}>{date}</Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text style={{ fontWeight: "bold" }}>Description: </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {description}
          </Text>
        </Row>
      </Column>
    </BottomSheet>
  );
}
