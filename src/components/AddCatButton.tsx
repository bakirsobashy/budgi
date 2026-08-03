import { FloatingActionButton, Icon } from "@expo/ui/jetpack-compose";
import { align, offset } from "@expo/ui/jetpack-compose/modifiers";

const ADD_ICON = { uri: "ic_add" };

export default function AddCatButton({ onClick }: { onClick: () => void }) {
  return (
    <FloatingActionButton
      modifiers={[align("bottomEnd"), offset(-16, -16)]}
      onClick={onClick}
      containerColor={"black"}
    >
      <FloatingActionButton.Icon>
        <Icon source={ADD_ICON} tint={"#FFFFFF"} />
      </FloatingActionButton.Icon>
    </FloatingActionButton>
  );
}
