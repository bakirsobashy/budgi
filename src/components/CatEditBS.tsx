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
import { useState } from "react";

import { ICON_MAP, ICON_NAMES } from "@/lib/icons";

const colors = ["#6200EE", "#03DAC5", "#FF5722", "#4CAF50", "#2196F3"];
type CatInput = {
  name: string;
  icon: string;
  color: string;
};
export default function CatEditBS({
  open,
  setOpen,
  catId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  catId: number;
}) {
  const category = useFinanceStore((state) =>
    state.categories.find((c) => c.id === catId),
  );
  const [Cat, setCat] = useState<CatInput>({
    name: category?.name ?? "",
    color: category?.color ?? colors[0],
    icon: category?.icon ?? ICON_NAMES[0],
  });
  const [warning, setWarning] = useState("");

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
    <ModalBottomSheet key={catId} onDismissRequest={() => setOpen(false)}>
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
        <ScrollView direction="horizontal">
          <Row spacing={8}>
            {colors.map((color, i) =>
              Cat.color === color ? (
                <Button
                  onClick={() => {
                    setCat({ ...Cat, color: color });
                  }}
                  key={i}
                  colors={{ containerColor: colors[i] }}
                  modifiers={[size(40, 40)]}
                  contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
                >
                  <Icon source={ICON_MAP["check"]} size={24}></Icon>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setCat({ ...Cat, color: colors[i] });
                  }}
                  key={i}
                  colors={{ containerColor: colors[i] }}
                  modifiers={[size(40, 40)]}
                >
                  <Icon source={ICON_MAP["check"]} size={24}></Icon>
                </Button>
              ),
            )}
          </Row>
        </ScrollView>
        <Text>Icon:</Text>
        <ScrollView direction="horizontal">
          <Row spacing={8}>
            {ICON_NAMES.map((iconName, i) =>
              Cat.icon === iconName ? (
                <OutlinedButton
                  onClick={() => {
                    setCat({ ...Cat, icon: iconName });
                  }}
                  key={i}
                  modifiers={[size(40, 40)]}
                  contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
                >
                  <Icon source={ICON_MAP[iconName]} tint={Cat.color} />
                </OutlinedButton>
              ) : (
                <OutlinedButton
                  onClick={() => {
                    setCat({ ...Cat, icon: iconName });
                  }}
                  key={i}
                  modifiers={[size(40, 40)]}
                  contentPadding={{ start: 0, top: 0, end: 0, bottom: 0 }}
                >
                  <Icon source={ICON_MAP[iconName]} />
                </OutlinedButton>
              ),
            )}
          </Row>
        </ScrollView>
        {warning ? <Text color="red">{warning}</Text> : null}
        <Button
          colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
          onClick={() => {
            const validationWarning = validate();
            if (validationWarning) {
              setWarning(validationWarning);
              return;
            }
            setWarning("");
            useFinanceStore.getState().updateCategory(catId, {
              name: Cat.name,
              icon: Cat.icon,
              color: Cat.color,
            });
            setOpen(false);
          }}
        >
          <Text>Apply</Text>
        </Button>
        <Button
          colors={{ containerColor: "red", contentColor: "#FFFFFF" }}
          onClick={() => {
            useFinanceStore.getState().deleteCategory(catId);
            setOpen(false);
          }}
        >
          <Text>Delete</Text>
        </Button>
      </Column>
    </ModalBottomSheet>
  );
}
