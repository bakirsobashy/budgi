import { Spacer, Text } from "@expo/ui";
import { ElevatedButton } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
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
}: {
  date: string;
  amount?: number;
  category?: string;
  description?: string;
  icon?: string | null;
  color?: string | null;
  type: "expense" | "income";
  onPress: () => void;
}) {
  return (
    <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      <SymbolView
        name={{ android: icon as any }}
        size={24}
        tintColor={color || undefined}
      />
      <Spacer size={8} />
      <Text textStyle={color ? { color: color } : undefined}>
        {category || "No category"}
      </Text>
      <Spacer flexible />
      <Text>{date}</Text>
      <Spacer flexible />
      <Text
        textStyle={type === "income" ? { color: "green" } : { color: "red" }}
      >
        {`${type === "income" ? "+" : "-"}$${amount?.toFixed(2) ?? "0.00"}`}
      </Text>
    </ElevatedButton>
  );
}
