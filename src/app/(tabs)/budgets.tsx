import Home from "@expo/material-symbols/home.xml";
import {
  Host,
  Icon,
  NavigationBar,
  NavigationBarItem,
  Text,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";

const HOME_ICON = Home;
const SEARCH_ICON = Home;
const SETTINGS_ICON = Home;

export default function Budget() {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <Host matchContents>
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
    </Host>
  );
}
