import { useFinanceStore } from "@/store/useFinanceStore";
import { Button } from "@expo/ui";
import { BasicTextField, Box, Column, ModalBottomSheet, Text } from "@expo/ui/jetpack-compose";
import { background, clip, fillMaxWidth, padding, paddingAll, Shapes } from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

type CatInput = {
    name: string;
    // icon: string;
}
export default function CatEditBS(
    { open, setOpen, catId }: { open: boolean, setOpen: (open: boolean) => void, catId: number }) {
    const [Cat, setCat] = useState<CatInput>({ name: '' });
    if (!open) return null;
    return (
        <ModalBottomSheet onDismissRequest={() => setOpen(false)}>
            <Column
                verticalArrangement={{ spacedBy: 16 }}
                modifiers={[fillMaxWidth(), paddingAll(16)]}>

                <BasicTextField
                    onValueChange={(text) => setCat({ ...Cat, name: text })}
                    cursorColor="#7c3aed"
                    modifiers={[
                        fillMaxWidth(),
                        clip(Shapes.RoundedCorner(12)),
                        background('#e3e2e2ff'),
                        padding(12, 10, 12, 10),
                    ]}>
                    <BasicTextField.DecorationBox>
                        <Box>
                            <BasicTextField.Placeholder>
                                <Text>Category Name</Text>
                            </BasicTextField.Placeholder>
                            <BasicTextField.InnerTextField />
                        </Box>
                    </BasicTextField.DecorationBox>
                </BasicTextField>
                <Button
                    label="Apply"
                    onPress={() => {
                        useFinanceStore.getState().updateCategory(catId, {
                            name: Cat.name,
                        });
                        setOpen(false);
                    }}
                />
                <Button
                    label="Delete"
                    onPress={() => {
                        useFinanceStore.getState().deleteCategory(catId);
                        setOpen(false);
                    }}
                />
            </Column>
        </ModalBottomSheet>
    )
}