import { getIconSource } from "@/lib/icons";
import { Spacer, Text } from "@expo/ui";
import { Box, Icon, Row } from "@expo/ui/jetpack-compose";
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

function fillColor(percentage: number): string {
  const t = Math.min(Math.max(percentage, 0), 1);
  const r = Math.round(33 + (244 - 33) * t);
  const g = Math.round(150 + (67 - 150) * t);
  const b = Math.round(243 + (54 - 243) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

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
  // No category budget: show spent + "Tap to set budget", no fill.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <Box
        modifiers={[
          fillMaxWidth(1),
          border(1, "#9AA0A6"),
          clip(Shapes.RoundedCorner(12)),
          clickable(onPress),
        ]}
      >
        <Row
          verticalAlignment="center"
          modifiers={[fillMaxWidth(1), fillMaxHeight(), paddingAll(16)]}
        >
          <Icon
            source={getIconSource(categoryIcon)}
            size={24}
            tint={categoryColor}
          />
          <Spacer size={8} />
          <Text textStyle={{ color: categoryColor }}>{categoryName}</Text>
          <Spacer flexible />
          <Text>{fmt(spentCents)}</Text>
          <Spacer size={8} />
          <Text>Tap to set budget</Text>
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
          <Icon
            source={getIconSource(categoryIcon)}
            size={24}
            tint={fraction > 0.5 ? "#FFFFFF" : categoryColor}
          />
          <Spacer size={8} />
          <Text textStyle={{ color: textColor }}>{categoryName}</Text>
          <Spacer flexible />
          <Text textStyle={{ color: textColor }}>
            {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
          </Text>
        </Row>
      </Box>
    </Box>
  );
}
