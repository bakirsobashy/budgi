import { Spacer, Text } from "@expo/ui";
import { ElevatedButton, Icon } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";
import { SymbolView } from "expo-symbols";

export default function CatCard({
  icon,
  color,
  name,
  onPress,
}: {
  icon?: string | null;
  color?: string | null;
  name: string;
  onPress: () => void;
}) {
  return (
    <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      {icon ? (
        <SymbolView
          name={{ android: icon as any }}
          size={24}
          tintColor={color || undefined}
        />
      ) : (
        <Spacer size={24} />
      )}
      <Spacer size={8} />
      <Text textStyle={color ? { color } : undefined}>{name}</Text>
      <Spacer flexible />
      <Icon source={require("@/assets/Icons/ThreeDots.png")} size={24} />
    </ElevatedButton>
  );
}
