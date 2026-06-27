import { useFinanceStore } from "@/store/useFinanceStore";
// import {  } from "@expo/ui";
import { Button, View } from "react-native";

export default function Budget() {
  return (
    <View>
      <Button
        onPress={() => useFinanceStore.getState().clear()}
        title="clear db"
      />
    </View>
  );
}
