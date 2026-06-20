import { DropdownMenu, DropdownMenuItem, FloatingActionButton, Icon, Text } from "@expo/ui/jetpack-compose";
import { useState } from "react";
export default function AddButton({ onClick }: { onClick: () => void }) {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    return (
        <DropdownMenu expanded={showDropdownMenu}>
            <DropdownMenu.Trigger>
                <FloatingActionButton onClick={() => { setShowDropdownMenu(true); }}>
                    <FloatingActionButton.Icon>
                        <Icon source={require("./plus_Icon.png")} size={32} />
                    </FloatingActionButton.Icon>
                </FloatingActionButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Items>
                <DropdownMenuItem
                    onClick={() => {
                        setShowDropdownMenu(false);
                        onClick();
                    }}>
                    <DropdownMenuItem.Text>
                        <Text>Add Income</Text>
                    </DropdownMenuItem.Text>
                    <DropdownMenuItem.LeadingIcon>
                        <Icon source={require("./plus_Icon.png")} size={24} />
                    </DropdownMenuItem.LeadingIcon>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        setShowDropdownMenu(false);
                        onClick();
                    }}>
                    <DropdownMenuItem.Text>
                        <Text>Add Expense</Text>
                    </DropdownMenuItem.Text>
                    <DropdownMenuItem.LeadingIcon>
                        <Icon source={require("./minus_Icon.png")} size={24} />
                    </DropdownMenuItem.LeadingIcon>
                </DropdownMenuItem>
            </DropdownMenu.Items>
        </DropdownMenu >
    )
}