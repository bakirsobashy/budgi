import {
  DropdownMenu,
  DropdownMenuItem,
  FloatingActionButton,
  Icon,
  Text,
} from "@expo/ui/jetpack-compose";
import { align, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

const FAB_ICON = { uri: "ic_add" };
const INCOME_ICON = { uri: "ic_money" };
const EXPENSE_ICON = { uri: "ic_local_shipping" };

export default function AddButton({
  onClick,
}: {
  onClick: (type: "expense" | "income") => void;
}) {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  return (
    <DropdownMenu
      expanded={showDropdownMenu}
      onDismissRequest={() => setShowDropdownMenu(false)}
      modifiers={[align("bottomEnd"), paddingAll(16)]}
      color="black"
    >
      <DropdownMenu.Trigger>
        <FloatingActionButton
          onClick={() => {
            setShowDropdownMenu(true);
          }}
          containerColor="black"
        >
          <FloatingActionButton.Icon>
            <Icon source={FAB_ICON} tint={"#FFFFFF"} />
          </FloatingActionButton.Icon>
        </FloatingActionButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Items>
        <DropdownMenuItem
          onClick={() => {
            setShowDropdownMenu(false);
            onClick("income");
          }}
        >
          <DropdownMenuItem.LeadingIcon>
            <Icon source={INCOME_ICON} tint={"#FFFFFF"} />
          </DropdownMenuItem.LeadingIcon>
          <DropdownMenuItem.Text>
            <Text color="white">Income</Text>
          </DropdownMenuItem.Text>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setShowDropdownMenu(false);
            onClick("expense");
          }}
        >
          <DropdownMenuItem.LeadingIcon>
            <Icon source={EXPENSE_ICON} tint={"#FFFFFF"} />
          </DropdownMenuItem.LeadingIcon>
          <DropdownMenuItem.Text>
            <Text color="white">Expense</Text>
          </DropdownMenuItem.Text>
        </DropdownMenuItem>
      </DropdownMenu.Items>
    </DropdownMenu>
  );
}