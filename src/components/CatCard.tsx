import { Spacer, Text } from "@expo/ui";
import { ElevatedButton, Icon } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";

import { ICON_MAP } from "@/lib/icons";

export default function CatCard({
  icon,
  color,
  name,
  onPress,
}: {
  icon: string;
  color: string;
  name: string;
  onPress: () => void;
}) {
  return (
    <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      <Icon source={ICON_MAP[icon] || ICON_MAP["check"]} size={24} tint={color} />
      <Spacer size={8} />
      <Text textStyle={color ? { color } : undefined}>{name}</Text>
      <Spacer flexible />
      <Icon source={require("@/assets/Icons/ThreeDots.png")} size={24} />
    </ElevatedButton>
  );
}
