import { Transaction } from "@/lib/types";
import { BottomSheet, Column } from "@expo/ui";
import { Row, Text } from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";

export default function TransDescBS({
  showBottomSheet,
  setShowBottomSheet,
  selectedTransaction,
}: {
  showBottomSheet: boolean;
  setShowBottomSheet: (showBottomSheet: boolean) => void;
  selectedTransaction: Transaction | null;
}) {
  return (
    <BottomSheet
      isPresented={showBottomSheet}
      onDismiss={() => setShowBottomSheet(false)}
    >
      <Column spacing={16} style={{ padding: 16 }}>
        <Row
          horizontalArrangement="spaceEvenly"
          verticalAlignment="center"
          modifiers={[fillMaxWidth()]}
        ></Row>
        <Text>{`Description: ${selectedTransaction?.description || "No description"}`}</Text>
      </Column>
    </BottomSheet>
  );
}
