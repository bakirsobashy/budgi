import { Row, Spacer, Text } from "@expo/ui";
import { ElevatedCard } from "@expo/ui/jetpack-compose";
import { clickable, fillMaxWidth, height, paddingAll } from '@expo/ui/jetpack-compose/modifiers';
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
  onPress?: () => void;
}) {
  return (
    <ElevatedCard modifiers={[fillMaxWidth(1), height(50)]}>
      <Row>
        <Text>{category || 'No category'}</Text>
        <Spacer flexible />
        <Text>{date}</Text>
        <Spacer flexible />
        <Text>{`$${amount?.toFixed(2) ?? '0.00'}`}</Text>
      </Row>
    </ElevatedCard>
  );
}


