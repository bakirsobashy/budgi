import { Spacer, Text } from "@expo/ui";
import { ElevatedButton, Icon } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from "@expo/ui/jetpack-compose/modifiers";

const ICON_SOURCES: Record<string, number> = {
  "Check.png": require("@/assets/Icons/Check.png"),
  "plus_Icon.png": require("@/assets/Icons/plus_Icon.png"),
  "minus_Icon.png": require("@/assets/Icons/minus_Icon.png"),
};

const DEFAULT_ICON = ICON_SOURCES["Check.png"];

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
  const iconSource =
    icon && ICON_SOURCES[icon] ? ICON_SOURCES[icon] : DEFAULT_ICON;

  return (
    <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
      <Icon source={iconSource} size={24} />
      <Text textStyle={color ? { color } : undefined}>{name}</Text>
      <Spacer flexible />
      <Icon source={require("@/assets/Icons/ThreeDots.png")} size={24} />
    </ElevatedButton>
  );
}
