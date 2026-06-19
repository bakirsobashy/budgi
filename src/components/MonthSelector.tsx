import { Button, Row, Text } from "@expo/ui";
import { useState } from "react";

export default function MonthSelector() {
  const [date, setDate] = useState(new Date());
  return (
    <Row alignment="center" spacing={16}>
      <Button variant="outlined" label="⬅️" onPress={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))} />
      <Text>{date.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</Text>
      <Button variant="outlined" label="➡️" onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))} />
    </Row>
  );
}
