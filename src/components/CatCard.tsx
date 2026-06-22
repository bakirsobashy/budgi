import { Spacer, Text } from "@expo/ui";
import { ElevatedButton, Icon } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, height } from '@expo/ui/jetpack-compose/modifiers';
export default function CatCard({
    name,
    onPress,
}: {
    name: string;
    onPress: () => void;
}) {
    return (
        <ElevatedButton modifiers={[fillMaxWidth(1), height(50)]} onClick={onPress}>
            <Text>{name}</Text>
            <Spacer flexible />
            <Icon source={require("./ThreeDots.png")} size={24} />
        </ElevatedButton>
    );
}


