import { Spacer } from "@expo/ui";
import { OutlinedButton, Row, Text } from "@expo/ui/jetpack-compose";

// Two-segment toggle. The currently active segment is highlighted (black bg,
// white text); the inactive one is transparent with black text. Pressing the
// inactive segment switches to it.
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
        onClick={() => setIsIncome(true)}
        colors={
          isIncome
            ? { containerColor: "black", contentColor: "white" }
            : { containerColor: "transparent", contentColor: "black" }
        }
      >
        <Text>Income</Text>
      </OutlinedButton>
      <OutlinedButton
        onClick={() => setIsIncome(false)}
        colors={
          !isIncome
            ? { containerColor: "black", contentColor: "white" }
            : { containerColor: "transparent", contentColor: "black" }
        }
      >
        <Text>Expense</Text>
      </OutlinedButton>
      <Spacer flexible />
    </Row>
  );
}