import { useFinanceStore } from "@/store/useFinanceStore";
import { BottomSheet, Spacer } from "@expo/ui";
import { Column, Icon, Row, Text } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, paddingAll } from "@expo/ui/jetpack-compose/modifiers";

import { getIconSource } from "@/lib/icons";

export default function CatDescBS({
  showBottomSheet,
  setShowBottomSheet,
  catId,
}: {
  showBottomSheet: boolean;
  setShowBottomSheet: (showBottomSheet: boolean) => void;
  catId: number;
}) {
  const category = useFinanceStore((state) =>
    state.categories.find((c) => c.id === catId),
  );
  const txCount = useFinanceStore(
    (state) =>
      state.transactions.filter((t) => t.categoryId === catId).length,
  );

  return (
    <BottomSheet
      isPresented={showBottomSheet}
      onDismiss={() => setShowBottomSheet(false)}
    >
      <Column
        verticalArrangement={{ spacedBy: 12 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <Row modifiers={[fillMaxWidth()]}>
          <Icon
            source={getIconSource(category?.icon ?? "")}
            size={24}
            tint={category?.color || undefined}
          />
          <Spacer size={8} />
          <Text color={category?.color || undefined}>
            {category?.name ?? "Unknown"}
          </Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text>Type:</Text>
          <Text>{category?.type ?? "—"}</Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text>Color:</Text>
          <Text>{category?.color ?? "—"}</Text>
        </Row>
        <Row modifiers={[fillMaxWidth()]}>
          <Text>Transactions:</Text>
          <Text>{txCount}</Text>
        </Row>
      </Column>
    </BottomSheet>
  );
}