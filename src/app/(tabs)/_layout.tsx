import category from "@expo/material-symbols/category.xml";
import Home from "@expo/material-symbols/home.xml";
import budget from "@expo/material-symbols/money.xml";

import { Host, Icon } from "@expo/ui/jetpack-compose";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        headerTintColor: "black",
        // tabBarActiveBackgroundColor: "black",
        // tabBarInactiveBackgroundColor: "rgb(30, 30, 30)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <View pointerEvents="none">
              <Host matchContents>
                <Icon source={Home} contentDescription="Home" />
              </Host>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color, size }) => (
            <View pointerEvents="none">
              <Host matchContents>
                <Icon source={budget} contentDescription="Home" />
              </Host>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <View pointerEvents="none">
              <Host matchContents>
                <Icon source={category} contentDescription="Home" />
              </Host>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
