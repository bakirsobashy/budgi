import { getIconSource } from "@/lib/icons";
import {
  Box,
  Icon,
  OutlinedButton,
  Shape,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  background,
  fillMaxHeight,
  fillMaxWidth,
  height,
  size,
  weight,
  width,
} from "@expo/ui/jetpack-compose/modifiers";

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
}: {
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  spentCents: number;
  budgetCents: number | null;
  onPress: () => void;
}) {
  const iconSource = getIconSource(categoryIcon || "check");

  // No category budget: show spent + "Tap to set budget", no fill.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <OutlinedButton
        onClick={onPress}
        modifiers={[fillMaxWidth(1), height(50)]}
        shape={pillShape}
      >
        <Box modifiers={[size(30, 30), background("#FFFFFF")]}>
          <Icon source={iconSource} size={18} tint={categoryColor} />
        </Box>
        <Box modifiers={[width(8)]} />
        <Text
          color={categoryColor}
          style={{ fontWeight: "bold", fontSize: 16 }}
        >
          {categoryName}
        </Text>
        <Box modifiers={[weight(1), fillMaxHeight()]} />
        <Text style={{ fontSize: 16 }}>{fmt(spentCents)}</Text>
        <Box modifiers={[width(8)]} />
        <Text style={{ fontSize: 16 }}>Tap to set budget</Text>
      </OutlinedButton>
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
      <Box modifiers={[size(30, 30), background("#FFFFFF")]}>
        <Icon source={iconSource} size={18} tint={categoryColor} />
      </Box>
      <Box modifiers={[width(8)]} />
      <Text color="#000000" style={outlinedText} maxLines={1}>
        {categoryName}
      </Text>
      <Box modifiers={[weight(1), fillMaxHeight()]} />
      <Text color="#000000" style={outlinedText} maxLines={1}>
        {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
      </Text>
    </OutlinedButton>
  );
}
