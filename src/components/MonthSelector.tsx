import { Button, StyleSheet, Text, View } from "react-native";

export default function MonthSelector() {
  return (
    <View style={styles.row}>
      <Button title="⬅️" />
      <Text>June 2026</Text>
      <Button title="➡️" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
