import { Spacer } from "@expo/ui";
import { OutlinedButton, Row, Text } from "@expo/ui/jetpack-compose";
export default function IncomeTB({
  isIncome,
  setIsIncome,
}: {
  isIncome: boolean;
  setIsIncome: (isIncome: boolean) => void;
}) {
  return (
    <Row>
      <Spacer flexible />
      <OutlinedButton
        onClick={() => setIsIncome(!isIncome)}
        colors={
          isIncome
            ? { containerColor: "transparent", contentColor: "black" }
            : { containerColor: "black", contentColor: "white" }
        }
      >
        <Text>{isIncome ? "income" : "expense"}</Text>
      </OutlinedButton>
      <Spacer flexible />
    </Row>
  );
}
