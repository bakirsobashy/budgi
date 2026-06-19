import { ListItem, Text } from "@expo/ui";

export default function TransactionCard({
  date,
  amount,
  category,
  description,
  onPress,
}: {
  date?: string;
  amount?: number;
  category?: string;
  description?: string;
  onPress?: () => void;
}) {
  return (
    <ListItem
      supportingText={`${date} • ${category}`}
      trailing={<Text>{`$${amount?.toFixed(2) ?? "0.00"}`}</Text>}
      onPress={onPress}
    />
  );
}
