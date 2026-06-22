import { Spacer, Text } from "@expo/ui";
import { ElevatedButton } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from '@expo/ui/jetpack-compose/modifiers';
export default function TransactionCard({
  date,
  amount,
  category,
  description,
  onPress,
}: {
  date: string;
  amount?: number;
  category?: string;
  description?: string;
  onPress: () => void;
}) {
  return (
    <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      <Text>{category || 'No category'}</Text>
      <Spacer flexible />
      <Text>{date}</Text>
      <Spacer flexible />
      <Text>{`$${amount?.toFixed(2) ?? '0.00'}`}</Text>
    </ElevatedButton>
  );
}


