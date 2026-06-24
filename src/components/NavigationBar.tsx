import Home from "@expo/material-symbols/home.xml";
import {
  Icon,
  NavigationBar,
  NavigationBarItem,
  Text,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";

const HOME_ICON = Home;
const SEARCH_ICON = Home;
const SETTINGS_ICON = Home;

type BasicNavigationBarProps = {
  modifiers?: unknown[];
};

export default function BasicNavigationBar({
  modifiers,
}: BasicNavigationBarProps) {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <NavigationBar>
      <NavigationBarItem
        selected={selectedTab === "home"}
        onClick={() => setSelectedTab("home")}
      >
        <NavigationBarItem.Icon>
          <Icon source={HOME_ICON} />
        </NavigationBarItem.Icon>
        <NavigationBarItem.Label>
          <Text>Home</Text>
        </NavigationBarItem.Label>
      </NavigationBarItem>

      <NavigationBarItem
        selected={selectedTab === "search"}
        onClick={() => setSelectedTab("search")}
      >
        <NavigationBarItem.Icon>
          <Icon source={SEARCH_ICON} />
        </NavigationBarItem.Icon>
        <NavigationBarItem.Label>
          <Text>Search</Text>
        </NavigationBarItem.Label>
      </NavigationBarItem>

      <NavigationBarItem
        selected={selectedTab === "settings"}
        onClick={() => setSelectedTab("settings")}
      >
        <NavigationBarItem.Icon>
          <Icon source={SETTINGS_ICON} />
        </NavigationBarItem.Icon>
        <NavigationBarItem.Label>
          <Text>Settings</Text>
        </NavigationBarItem.Label>
      </NavigationBarItem>
    </NavigationBar>
  );
}
