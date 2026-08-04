import { Spacer } from "@expo/ui";
import {
  Box,
  Button,
  Column,
  OutlinedButton,
  Row,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  align,
  alpha,
  fillMaxWidth,
  height,
} from "@expo/ui/jetpack-compose/modifiers";

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const outlinedText = {
  fontWeight: "bold" as const,
  fontSize: 16,
};

export default function BudgetCard({
  spentCents,
  budgetCents,
  onPress,
  onEditPress,
  onCopyLastMonth,
  onStartFresh,
  hasPrevBudget,
}: {
  spentCents: number;
  budgetCents: number | null;
  onPress: () => void;
  onEditPress?: () => void;
  onCopyLastMonth: () => void;
  onStartFresh: () => void;
  hasPrevBudget: boolean;
}) {
  // No budget set: prompt to copy or start fresh.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <Column
        modifiers={[fillMaxWidth(1), height(80)]}
        horizontalAlignment="center"
        verticalArrangement="center"
      >
        <Text style={outlinedText}>Monthly Budget: Not set</Text>
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
      </Column>
    );
  }

  const percentage = budgetCents > 0 ? spentCents / budgetCents : 0;
  const pctLabel = `${Math.round(percentage * 100)}%`;

  return (
    <OutlinedButton
      onClick={onPress}
      modifiers={[fillMaxWidth(1), height(70)]}
      contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
    >
      <Box modifiers={[fillMaxWidth(1), height(70)]}>
        <Column
          verticalArrangement="center"
          horizontalAlignment="center"
          modifiers={[align("center")]}
        >
          <Text color="#000000" style={outlinedText} maxLines={1}>
            Monthly Budget
          </Text>
          <Text color="#000000" style={outlinedText} maxLines={1}>
            {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
          </Text>
        </Column>
        <OutlinedButton
          colors={{ containerColor: "#6200EE" }}
          onClick={onPress}
          modifiers={[fillMaxWidth(percentage), height(70), alpha(0.3)]}
        >
          <Text></Text>
        </OutlinedButton>
      </Box>
    </OutlinedButton>
  );
}
