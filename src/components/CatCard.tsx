import { Spacer, Text } from "@expo/ui";
import {
  Icon,
  OutlinedButton,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  offset,
  size,
} from "@expo/ui/jetpack-compose/modifiers";

import { getIconSource } from "@/lib/icons";

const EDIT_ICON = { uri: "ic_edit" };

export default function CatCard({
  icon,
  color,
  name,
  onPress,
  onEditPress,
}: {
  icon: string;
  color: string;
  name: string;
  onPress: () => void;
  onEditPress: () => void;
}) {
  return (
    <OutlinedButton
      modifiers={[fillMaxWidth(1), height(50)]}
      onClick={onPress}
    >
      <Icon
        source={getIconSource(icon)}
        size={24}
        tint={color}
      />
      <Spacer size={8} />
      <Text textStyle={color ? { color, fontWeight: "bold" } : { fontWeight: "bold" }}>{name}</Text>
      <Spacer flexible />
      <OutlinedButton
        modifiers={[size(30, 30), offset(10, 0)]}
        contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
        onClick={onEditPress}
      >
        <Icon source={EDIT_ICON} size={16} />
      </OutlinedButton>
    </OutlinedButton>
  );
}
