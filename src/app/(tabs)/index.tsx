import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function Index() {
  const categories = useFinanceStore((s) => s.categories);
  const isHydrated = useFinanceStore((s) => s.isHydrated);

  useEffect(() => {
    if (isHydrated) {
      console.log("Dashboard categories:", categories);
    }
  }, [isHydrated, categories]);

  return (
    <View style={styles.container}>
      <Text>Dashboard categories:</Text>
      {categories.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
