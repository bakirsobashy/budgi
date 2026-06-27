import { Spacer, Text } from "@expo/ui";
import { Icon, OutlinedButton } from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  offset,
  size,
} from "@expo/ui/jetpack-compose/modifiers";
import { SymbolView } from "expo-symbols";
export default function TransactionCard({
  date,
  amount,
  category,
  description,
  icon,
  color,
  type,
  onPress,
  onEditPress,
}: {
  date: string;
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
        <SymbolView
          name={{ android: icon as any }}
          size={24}
          tintColor={color || undefined}
        />
      ) : (
        <Spacer size={24} />
      )}
      <Spacer size={8} />
      <Text textStyle={color ? { color: color } : undefined}>
        {category || "Uncategorized"}
      </Text>
      <Spacer flexible />
      <Text>{date}</Text>
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
