import { Host } from "@expo/ui";
import { MenuView } from "@expo/ui/community/menu";
import { Button } from "react-native";

export default function Budgets() {
  return (
    <Host>
      <MenuView
        shouldOpenOnLongPress={true}
        actions={[
          { id: "copy", title: "Copy" },
          { id: "share", title: "Share" },
        ]}
        onPressAction={(e) => console.log(e.nativeEvent.event)}
      >
        <Button title="button" />
      </MenuView>
    </Host>
  );
}
