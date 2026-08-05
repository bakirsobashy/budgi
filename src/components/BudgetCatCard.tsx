import { budgetFillColor } from "@/lib/budgetColor";
import { getIconSource } from "@/lib/icons";
import { Spacer } from "@expo/ui";
import {
  Box,
  Icon,
  OutlinedButton,
  Row,
  Shape,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  align,
  animated,
  fillMaxWidth,
  graphicsLayer,
  height,
  offset,
  size,
  tween,
} from "@expo/ui/jetpack-compose/modifiers";
import { useEffect, useState } from "react";

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

  const percentage =
    budgetCents && budgetCents > 0 ? spentCents / budgetCents : 0;

  // Start the fill bar at 0, then animate to the target percentage.
  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimPct(percentage), 0);
    return () => clearTimeout(t);
  }, [percentage]);

  // No category budget: show spent + "Tap to set budget", no fill.
  if (budgetCents === null || budgetCents === undefined) {
    return (
      <Text color={categoryColor} style={outlinedText} maxLines={1}>
        {categoryName}
      </Text>
    );
  }

  const pctLabel = `${Math.round(percentage * 100)}%`;
  const fillColor = budgetFillColor(percentage);

  return (
    <OutlinedButton
      onClick={onPress}
      modifiers={[fillMaxWidth(1), height(50)]}
      contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
    >
      <Box modifiers={[fillMaxWidth(1), height(50)]}>
        <OutlinedButton
          colors={{ containerColor: fillColor }}
          onClick={onPress}
          modifiers={[
            fillMaxWidth(1),
            height(50),
            graphicsLayer({
              scaleX: animated(
                animPct,
                tween({ durationMillis: 600, easing: "fastOutSlowIn" }),
              ),
              transformOriginX: 0,
              transformOriginY: 0.5,
              alpha: 1,
            }),
          ]}
        >
          <Text></Text>
        </OutlinedButton>
        <Row
          verticalArrangement="center"
          horizontalAlignment="center"
          modifiers={[align("center")]}
        >
          <Spacer size={8} />
          <OutlinedButton
            colors={{ containerColor: "#ffffff", contentColor: "#FFFFFF" }}
            modifiers={[size(25, 25), offset(10, 0)]}
            contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
            onClick={onPress}
          >
            <Icon source={iconSource} size={18} tint={categoryColor} />
          </OutlinedButton>
          <Spacer size={16} />
          <Text
            color={categoryColor}
            style={{
              ...outlinedText,
              shadow: {
                color: "#ffffff",
                offsetX: 0,
                offsetY: 0,
                blurRadius: 2,
              },
            }}
            maxLines={1}
          >
            {categoryName}
          </Text>
          <Spacer flexible />
          <Text color="#000000" style={outlinedText} maxLines={1}>
            {`${fmt(spentCents)} / ${fmt(budgetCents)} (${pctLabel})`}
          </Text>
          <Spacer size={16} />
        </Row>
      </Box>
    </OutlinedButton>
  );
}
