import {
  Box,
  Button,
  OutlinedButton,
  Shape,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxHeight,
  fillMaxWidth,
  height,
  paddingAll,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const outlinedText = {
  fontWeight: "bold" as const,
  fontSize: 16,
};

const pillShape = Shape.RoundedCorner({
  cornerRadii: { topStart: 999, topEnd: 999, bottomStart: 999, bottomEnd: 999 },
});

export default function BudgetCard({
  spentCents,
  budgetCents,
  onPress,
  onCopyLastMonth,
  onStartFresh,
  hasPrevBudget,
}: {
  spentCents: number;
  budgetCents: number | null;
  onPress: () => void;
  onCopyLastMonth: () => void;
  onStartFresh: () => void;
  hasPrevBudget: boolean;
}) {
  // No budget set: prompt to copy or start fresh.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <OutlinedButton
        onClick={onPress}
        modifiers={[fillMaxWidth(1), height(80)]}
        shape={pillShape}
      >
        <Box modifiers={[fillMaxWidth(1), paddingAll(16)]}>
          <Button onClick={onStartFresh} modifiers={[fillMaxWidth(1)]}>
            <Text>Monthly Budget: Not set</Text>
          </Button>
          <Text>Tap to set a budget, or copy last month:</Text>
          <Box modifiers={[paddingAll(8)]}>
            <Button
              onClick={onCopyLastMonth}
              colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
              enabled={hasPrevBudget}
            >
              <Text>Copy last month</Text>
            </Button>
            <Button
              onClick={onStartFresh}
              colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            >
              <Text>Start fresh</Text>
            </Button>
          </Box>
        </Box>
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
      <Text color="#000000" style={outlinedText} maxLines={1}>
        Monthly Budget
      </Text>
      <Box modifiers={[weight(1), fillMaxHeight()]} />
      <Text color="#000000" style={outlinedText} maxLines={1}>
        {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
      </Text>
    </OutlinedButton>
  );
}
