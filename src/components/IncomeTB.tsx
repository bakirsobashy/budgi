import { Spacer } from "@expo/ui";
import { Row, Text, ToggleButton } from "@expo/ui/jetpack-compose";
export default function IncomeTB({ isIncome, setIsIncome }: { isIncome: boolean, setIsIncome: (isIncome: boolean) => void }) {
    return (
        <Row>
            <Spacer flexible />
            <ToggleButton checked={isIncome} onCheckedChange={() => setIsIncome(!isIncome)} >
                <Text>{isIncome ? "income" : "expense"}</Text>
            </ToggleButton>
            <Spacer flexible />
        </Row>
    )
}