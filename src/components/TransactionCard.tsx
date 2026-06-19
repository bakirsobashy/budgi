import { StyleSheet, Text, View } from "react-native";

export default function TransactionCard({
  date,
  amount,
  category,
  description,
}: {
  date?: string;
  amount?: number;
  category?: string;
  description?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.item}>{date}</Text>
      <Text style={styles.item}>{amount}</Text>
      <Text style={styles.item}>{category}</Text>
      <Text style={styles.item}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  item: {
    flex: 1,
  },
});
