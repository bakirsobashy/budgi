import { Tabs } from "expo-router";
import { Image } from "react-native";

const HOME_ICON = require("@/assets/images/tabIcons/home.png");
const CATEGORIES_ICON = require("@/assets/images/tabIcons/explore.png");
const BUDGET_ICON = require("@/assets/images/tabIcons/explore.png");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        headerTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HOME_ICON}
              style={{ width: size, height: size, tintColor: color }}
              accessibilityLabel="Dashboard"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={CATEGORIES_ICON}
              style={{ width: size, height: size, tintColor: color }}
              accessibilityLabel="Categories"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={BUDGET_ICON}
              style={{ width: size, height: size, tintColor: color }}
              accessibilityLabel="Budget"
            />
          ),
        }}
      />
    </Tabs>
  );
}
