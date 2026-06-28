import add from "@expo/material-symbols/add.xml";
import { FloatingActionButton, Icon } from "@expo/ui/jetpack-compose";
import { align, offset } from "@expo/ui/jetpack-compose/modifiers";

export default function AddCatButton({ onClick }: { onClick: () => void }) {
  return (
    <FloatingActionButton
      modifiers={[align("bottomEnd"), offset(-16, -16)]}
      onClick={onClick}
      containerColor={"black"}
    >
      <FloatingActionButton.Icon>
        <Icon source={add} tint={"#FFFFFF"} />
      </FloatingActionButton.Icon>
    </FloatingActionButton>
  );
}
