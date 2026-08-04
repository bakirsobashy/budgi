import { useFinanceStore } from "@/store/useFinanceStore";
import { Row, ScrollView } from "@expo/ui";
import {
  BasicTextField,
  Box,
  Button,
  Column,
  Icon,
  ModalBottomSheet,
  OutlinedButton,
  Text,
} from "@expo/ui/jetpack-compose";
import {
  background,
  clip,
  fillMaxWidth,
  padding,
  paddingAll,
  Shapes,
  size,
} from "@expo/ui/jetpack-compose/modifiers";
import { memo, useState } from "react";

import { ICON_MAP, ICON_NAMES } from "@/lib/icons";

const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
  "#000000",
  "#f4305a",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#4DD0E1",
  "#4DB6AC",
  "#81C784",
  "#AED581",
  "#FFB74D",
  "#FF8A65",
  "#A1887F",
  "#BDBDBD",
  "#78909C",
  "#EF5350",
  "#EC407A",
  "#AB47BC",
  "#7E57C2",
  "#5C6BC0",
  "#42A5F5",
  "#26C6DA",
  "#26A69A",
  "#66BB6A",
  "#9CCC65",
  "#D4E157",
  "#FFEE58",
  "#FFCA28",
  "#FFA726",
  "#FF7043",
  "#8D6E63",
];

type CatInput = {
  name: string;
  icon: string;
  color: string;
};

// Memoized color picker — only re-renders when `selectedColor` changes, so
// typing in the name field above doesn't re-instantiate all 50 buttons.
const ColorPicker = memo(function ColorPicker({
  selectedColor,
  onSelect,
}: {
  selectedColor: string;
  onSelect: (color: string) => void;
}) {
  return (
    <ScrollView direction="horizontal">
      <Row spacing={8}>
        {colors.map((color, i) => (
          <Button
            onClick={() => onSelect(color)}
            key={i}
            colors={{ containerColor: colors[i] }}
            modifiers={[size(40, 40)]}
            contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
          >
            {selectedColor === color ? (
              <Icon source={ICON_MAP["check"]} size={24} />
            ) : null}
          </Button>
        ))}
      </Row>
    </ScrollView>
  );
});

// Memoized icon picker — only re-renders when `selectedColor` or
// `selectedIcon` changes (for tint), not on every keystroke in the name field.
// Selected icon is tinted with the chosen color; all others render in black
// (no tint applied) as the user requested.
const IconPicker = memo(function IconPicker({
  selectedIcon,
  selectedColor,
  onSelect,
}: {
  selectedIcon: string;
  selectedColor: string;
  onSelect: (iconName: string) => void;
}) {
  return (
    <ScrollView direction="horizontal">
      <Row spacing={8}>
        {ICON_NAMES.map((iconName, i) => (
          <OutlinedButton
            onClick={() => onSelect(iconName)}
            key={i}
            modifiers={[size(40, 40)]}
            contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
          >
            <Icon
              source={ICON_MAP[iconName]}
              tint={selectedIcon === iconName ? selectedColor : null}
            />
          </OutlinedButton>
        ))}
      </Row>
    </ScrollView>
  );
});

export default function AddCatBottomSheet({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: "income" | "expense";
}) {
  const [Cat, setCat] = useState<CatInput>({
    name: "",
    color: colors[0],
    icon: ICON_NAMES[0],
  });
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!Cat.name.trim()) {
      return "Category name is required";
    }
    if (!Cat.color) {
      return "Please select a color";
    }
    return "";
  };

  if (!open) return null;
  return (
    <ModalBottomSheet onDismissRequest={() => setOpen(false)}>
      <Column
        verticalArrangement={{ spacedBy: 16 }}
        modifiers={[fillMaxWidth(), paddingAll(16)]}
      >
        <BasicTextField
          onValueChange={(text) => setCat({ ...Cat, name: text })}
          cursorColor="#7c3aed"
          modifiers={[
            fillMaxWidth(),
            clip(Shapes.RoundedCorner(12)),
            background("#e3e2e2ff"),
            padding(12, 10, 12, 10),
          ]}
        >
          <BasicTextField.DecorationBox>
            <Box>
              <BasicTextField.Placeholder>
                <Text>Category Name</Text>
              </BasicTextField.Placeholder>
              <BasicTextField.InnerTextField />
            </Box>
          </BasicTextField.DecorationBox>
        </BasicTextField>
        <Text>color:</Text>
        <ColorPicker
          selectedColor={Cat.color}
          onSelect={(color) => setCat((c) => ({ ...c, color }))}
        />
        <Text>Icon:</Text>
        <IconPicker
          selectedIcon={Cat.icon}
          selectedColor={Cat.color}
          onSelect={(iconName) => setCat((c) => ({ ...c, icon: iconName }))}
        />
        {warning ? <Text color="red">{warning}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={async () => {
            const validationWarning = validate();
            if (validationWarning) {
              setWarning(validationWarning);
              return;
            }
            setWarning("");
            setSubmitting(true);
            try {
              await useFinanceStore.getState().addCategory({
                name: Cat.name,
                type,
                icon: Cat.icon,
                color: Cat.color,
              });
              setCat({ name: "", color: colors[0], icon: ICON_NAMES[0] });
              setOpen(false);
            } catch (e) {
              setWarning(
                e instanceof Error ? e.message : "Failed to add category",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Text>{submitting ? "Adding..." : "Add"}</Text>
        </Button>
      </Column>
    </ModalBottomSheet>
  );
}
