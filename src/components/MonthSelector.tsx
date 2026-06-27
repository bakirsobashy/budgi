import {
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text,
} from "@expo/ui/jetpack-compose";
import { useEffect, useState } from "react";
import { Modal, Text as RNText, TouchableOpacity, View } from "react-native";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function JSMonthPicker({
  value,
  onChange,
  onClose,
  visible,
}: {
  value: Date;
  onChange: (d: Date) => void;
  onClose: () => void;
  visible: boolean;
}) {
  const [year, setYear] = useState(value.getFullYear());

  useEffect(() => {
    if (visible) {
      setYear(value.getFullYear());
    }
  }, [visible, value]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setYear(year - 1)}
              style={{ padding: 10 }}
            >
              <RNText>{"<"}</RNText>
            </TouchableOpacity>
            <View style={{ justifyContent: "center" }}>
              <RNText style={{ fontSize: 18, fontWeight: "bold" }}>
                {year}
              </RNText>
            </View>
            <TouchableOpacity
              onPress={() => setYear(year + 1)}
              style={{ padding: 10 }}
            >
              <RNText>{">"}</RNText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {MONTHS.map((m, i) => {
              const isSelected =
                value.getMonth() === i && value.getFullYear() === year;
              return (
                <TouchableOpacity
                  key={m}
                  style={{
                    width: "30%",
                    padding: 10,
                    alignItems: "center",
                    marginVertical: 5,
                    backgroundColor: isSelected ? "#007AFF" : "transparent",
                    borderRadius: 8,
                  }}
                  onPress={() => onChange(new Date(year, i))}
                >
                  <RNText style={{ color: isSelected ? "white" : "black" }}>
                    {m}
                  </RNText>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center", padding: 10 }}
            onPress={onClose}
          >
            <RNText>Cancel</RNText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function SingleChoiceExample({
  selectedMonth,
  onMonthChange,
  onOpenPicker,
}: {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  onOpenPicker: () => void;
}) {
  return (
    <SingleChoiceSegmentedButtonRow>
      <SegmentedButton
        onClick={() => {
          const d = new Date(selectedMonth);
          d.setMonth(d.getMonth() - 1);
          onMonthChange(d);
        }}
      >
        <SegmentedButton.Label>
          <Text>{"<"}</Text>
        </SegmentedButton.Label>
      </SegmentedButton>
      <SegmentedButton onClick={onOpenPicker}>
        <SegmentedButton.Label>
          <Text>
            {selectedMonth.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </SegmentedButton.Label>
      </SegmentedButton>
      <SegmentedButton
        onClick={() => {
          const d = new Date(selectedMonth);
          d.setMonth(d.getMonth() + 1);
          onMonthChange(d);
        }}
      >
        <SegmentedButton.Label>
          <Text>{">"}</Text>
        </SegmentedButton.Label>
      </SegmentedButton>
    </SingleChoiceSegmentedButtonRow>
  );
}
