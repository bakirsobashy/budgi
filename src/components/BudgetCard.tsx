import { Spacer, Text } from "@expo/ui";
import { Box, Button, Row } from "@expo/ui/jetpack-compose";
import {
  background,
  border,
  clip,
  clickable,
  fillMaxHeight,
  fillMaxWidth,
  paddingAll,
  Shapes,
} from "@expo/ui/jetpack-compose/modifiers";

// Interpolate from blue (0%) to red (100%).
function fillColor(percentage: number): string {
  const t = Math.min(Math.max(percentage, 0), 1);
  // Blue #2196F3 (33, 150, 243) -> Red #F44336 (244, 67, 54)
  const r = Math.round(33 + (244 - 33) * t);
  const g = Math.round(150 + (67 - 150) * t);
  const b = Math.round(243 + (54 - 243) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

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
  // No budget set: show prompt to copy or start fresh.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <Box
        modifiers={[
          fillMaxWidth(1),
          border(1, "#9AA0A6"),
          clip(Shapes.RoundedCorner(12)),
          paddingAll(16),
          clickable(onPress),
        ]}
      >
        <Button onClick={onStartFresh} modifiers={[fillMaxWidth(1)]}>
          <Text>Monthly Budget: Not set</Text>
        </Button>
        <Text>Tap to set a budget, or copy last month:</Text>
        <Row>
          <Button
            onClick={onCopyLastMonth}
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            enabled={hasPrevBudget}
          >
            <Text>Copy last month</Text>
          </Button>
          <Spacer size={8} />
          <Button
            onClick={onStartFresh}
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          >
            <Text>Start fresh</Text>
          </Button>
        </Row>
      </Box>
    );
  }

  const percentage = budgetCents > 0 ? spentCents / budgetCents : 0;
  const pctLabel = `${Math.round(percentage * 100)}%`;
  const color = fillColor(percentage);
  const fraction = Math.min(percentage, 1);
  const textColor = fraction > 0.5 ? "#FFFFFF" : "#000000";

  return (
    <Box
      modifiers={[
        fillMaxWidth(1),
        border(1, "#9AA0A6"),
        clip(Shapes.RoundedCorner(12)),
        clickable(onPress),
      ]}
    >
      <Box modifiers={[fillMaxWidth(1), fillMaxHeight()]}>
        <Box
          modifiers={[
            fillMaxWidth(fraction),
            fillMaxHeight(),
            background(color),
          ]}
        />
        <Row
          verticalAlignment="center"
          modifiers={[fillMaxWidth(1), fillMaxHeight(), paddingAll(16)]}
        >
          <Text textStyle={{ color: textColor }}>Monthly Budget</Text>
          <Spacer flexible />
          <Text textStyle={{ color: textColor }}>
            {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
          </Text>
        </Row>
      </Box>
    </Box>
  );
}
