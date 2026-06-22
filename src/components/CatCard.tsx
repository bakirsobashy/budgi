import { Spacer, Text } from "@expo/ui";
import { ElevatedButton, Icon } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from '@expo/ui/jetpack-compose/modifiers';
export default function CatCard({
    color,
    name,
    onPress,
}: {
    color: string;
    name: string;
    onPress: () => void;
}) {
    return (
        <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
            <Text textStyle={{ color: color }} >{name}</Text>
            <Spacer flexible />
            <Icon source={require("@/assets/Icons/ThreeDots.png")} size={24} />
        </ElevatedButton>
    );
}


