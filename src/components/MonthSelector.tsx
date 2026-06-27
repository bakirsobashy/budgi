import {
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";

export default function SingleChoiceExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ["Day", "Week", "Month", "Year"];

  return (
    <SingleChoiceSegmentedButtonRow>
      {options.map((label, index) => (
        <SegmentedButton
          key={label}
          selected={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
        >
          <SegmentedButton.Label>
            <Text>{label}</Text>
          </SegmentedButton.Label>
        </SegmentedButton>
      ))}
    </SingleChoiceSegmentedButtonRow>
  );
}
