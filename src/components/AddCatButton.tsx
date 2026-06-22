import { FloatingActionButton, Icon } from "@expo/ui/jetpack-compose";
import { align, offset } from "@expo/ui/jetpack-compose/modifiers";
export default function AddCatButton({ onClick }: { onClick: () => void }) {
    return (
        <FloatingActionButton
            modifiers={[align('bottomEnd'), offset(-16, -16)]}
            onClick={onClick}>
            <FloatingActionButton.Icon>
                <Icon source={require('@/assets/Icons/plus_Icon.png')} size={24} />
            </FloatingActionButton.Icon>
        </FloatingActionButton>
    )
}