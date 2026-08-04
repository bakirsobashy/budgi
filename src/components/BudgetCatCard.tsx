import { getIconSource } from "@/lib/icons";
import { Spacer } from "@expo/ui";
import { Icon, OutlinedButton, Shape, Text } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const outlinedText = {
  fontWeight: "bold" as const,
  fontSize: 16,
};

const pillShape = Shape.RoundedCorner({
  cornerRadii: { topStart: 999, topEnd: 999, bottomStart: 999, bottomEnd: 999 },
});

export default function BudgetCatCard({
  categoryName,
  categoryColor,
  categoryIcon,
  spentCents,
  budgetCents,
  onPress,
  onEditPress,
}: {
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  spentCents: number;
  budgetCents: number | null;
  onPress: () => void;
  onEditPress?: () => void;
}) {
  const iconSource = getIconSource(categoryIcon || "check");

  // No category budget: show spent + "Tap to set budget", no fill.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <Text color={categoryColor} style={outlinedText} maxLines={1}>
        {categoryName}
      </Text>
    );
  }

  const percentage = budgetCents > 0 ? spentCents / budgetCents : 0;
  const pctLabel = `${Math.round(percentage * 100)}%`;

  return (
    <OutlinedButton
      onClick={onPress}
      modifiers={[fillMaxWidth(1), height(50)]}
      shape={pillShape}
    >
      <Icon source={iconSource} size={18} tint={categoryColor} />
      <Spacer size={8} />
      <Text color={categoryColor} style={outlinedText} maxLines={1}>
        {categoryName}
      </Text>
      <Spacer flexible />
      <Text color="#000000" style={outlinedText} maxLines={1}>
        {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
      </Text>
    </OutlinedButton>
  );
}
