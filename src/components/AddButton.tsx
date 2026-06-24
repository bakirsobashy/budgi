import {
  DropdownMenu,
  DropdownMenuItem,
  FloatingActionButton,
  Icon,
  Text,
} from "@expo/ui/jetpack-compose";
import { align, paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

import {
  default as add,
  default as income,
} from "@expo/material-symbols/add.xml";
import expense from "@expo/material-symbols/remove.xml";

export default function AddButton({
  onClick,
}: {
  onClick: (type: "expense" | "income") => void;
}) {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  return (
    <DropdownMenu
      expanded={showDropdownMenu}
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
            <Icon source={add} tint={"#FFFFFF"} />
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
            <Icon source={income} tint={"#FFFFFF"} />
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
            <Icon source={expense} tint={"#FFFFFF"} />
          </DropdownMenuItem.LeadingIcon>
          <DropdownMenuItem.Text>
            <Text color="white">Expense</Text>
          </DropdownMenuItem.Text>
        </DropdownMenuItem>
      </DropdownMenu.Items>
    </DropdownMenu>
  );
}
