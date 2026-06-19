import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#6366f1",
            tabBarStyle: { paddingBottom: 4 },
            headerStyle: { backgroundColor: "#0f172a" },
            headerTintColor: "#f1f5f9",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color, size }) => <Text>📊</Text>,
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: "Add",
              tabBarIcon: ({ color, size }) => <Text>➕</Text>,
            }}
          />
          <Tabs.Screen
            name="budgets"
            options={{
              title: "Budgets",
              tabBarIcon: ({ color, size }) => <Text>📈</Text>,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
});
