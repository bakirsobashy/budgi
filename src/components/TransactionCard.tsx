import { ICON_MAP } from "@/lib/icons";
import { Spacer, Text } from "@expo/ui";
import { Icon, OutlinedButton } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  offset,
  size,
} from "@expo/ui/jetpack-compose/modifiers";

export default function TransactionCard({
  amount,
  category,
  description,
  icon,
  color,
  type,
  onPress,
  onEditPress,
}: {
  amount?: number;
  category?: string;
  description?: string;
  icon?: string | null;
  color?: string | null;
  type: "expense" | "income";
  onPress: () => void;
  onEditPress: () => void;
}) {
  return (
    <OutlinedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      {icon ? (
        <Icon
          source={ICON_MAP[icon] || ICON_MAP["check"]}
          size={24}
          tint={color || undefined}
        />
      ) : (
        <Spacer size={24} />
      )}
      <Spacer size={8} />
      <Text textStyle={color ? { color: color } : undefined}>
        {category || "Uncategorized"}
      </Text>
      <Spacer flexible />
      <Text
        textStyle={type === "income" ? { color: "green" } : { color: "red" }}
      >
        {`${type === "income" ? "+" : "-"}$${amount?.toFixed(2) ?? "0.00"}`}
      </Text>
      <OutlinedButton
        modifiers={[size(30, 30), offset(10, 0)]}
        contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
        onClick={onEditPress}
      >
        <Icon source={require("@/assets/Icons/Pen.png")} size={16} />
      </OutlinedButton>
    </OutlinedButton>
  );
}
