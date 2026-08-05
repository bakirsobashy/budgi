import { getIconSource } from "@/lib/icons";
import { Spacer, Text } from "@expo/ui";
import { Icon, OutlinedButton } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  offset,
  size,
} from "@expo/ui/jetpack-compose/modifiers";

const EDIT_ICON = { uri: "ic_edit" };

export default function TransactionCard({
  amount,
  category,
  icon,
  color,
  type,
  onPress,
  onEditPress,
}: {
  amount?: number;
  category?: string;
  icon?: string | null;
  color?: string | null;
  type: "expense" | "income";
  onPress: () => void;
  onEditPress: () => void;
}) {
  const displayAmount = amount ?? 0;
  return (
    <OutlinedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      {icon ? (
        <Icon
          source={getIconSource(icon || "")}
          size={24}
          tint={color || undefined}
        />
      ) : (
        <Spacer size={24} />
      )}
      <Spacer size={8} />
      <Text textStyle={color ? { color: color, fontWeight: "bold" } : { fontWeight: "bold" }}>
        {category || "Uncategorized"}
      </Text>
      <Spacer flexible />
      <Text
        textStyle={type === "income" ? { color: "green", fontWeight: "bold" } : { color: "red", fontWeight: "bold" }}
      >
        {`${type === "income" ? "+" : "-"}$${displayAmount.toFixed(2)}`}
      </Text>
      <OutlinedButton
        modifiers={[size(30, 30), offset(10, 0)]}
        contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
        onClick={onEditPress}
      >
        <Icon source={EDIT_ICON} size={16} />
      </OutlinedButton>
    </OutlinedButton>
  );
}
