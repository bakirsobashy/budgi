import { Host } from "@expo/ui/jetpack-compose";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";

export default function Budgets() {
  return (
    <Host>
      <View style={styles.container}>
        <SymbolView name={{ android: "info" }} tintColor="#007AFF" size={35} />
        <SymbolView
          name={{
            ios: "pencil.tip.crop.circle.badge.plus",
            android: "home_and_garden",
            web: "home_and_garden",
          }}
          style={styles.symbol}
        />
      </View>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
});
