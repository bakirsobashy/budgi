import AddCatBS from "@/components/AddCatBS";
import AddCatButton from "@/components/AddCatButton";
import CatCard from "@/components/CatCard";
import CatEditBS from "@/components/CatEditBS";
import IncomeTB from "@/components/IncomeTB";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Column, ScrollView } from "@expo/ui";
import { Box, Host } from "@expo/ui/jetpack-compose";
import { useState } from "react";


export default function Categories() {
    const categories = useFinanceStore((state) => state.categories);
    const [catId, setCatId] = useState<number | null>(null);
    const [isIncome, setIsIncome] = useState(true)
    const [open, setOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    return (
        <Host style={{ flex: 1 }}>
            <Box>
                <Column>
                    <IncomeTB isIncome={isIncome} setIsIncome={setIsIncome} />
                    <ScrollView>
                        <Column style={{ padding: 16 }} spacing={16}>
                            {categories.filter((cat) => cat.type === (isIncome ? "income" : "expense")).map((cat) => {
                                return (
                                    <CatCard
                                        key={cat.id}
                                        color={cat.color}
                                        name={cat.name}
                                        icon={cat.icon}
                                        onPress={() => { setOpen(true), setCatId(cat.id) }}
                                    />
                                );
                            })}
                        </Column>
                    </ScrollView>
                </Column>
                <AddCatButton onClick={() => setAddOpen(true)} />
            </Box>
            <CatEditBS open={open} setOpen={setOpen} catId={catId || 0} />
            <AddCatBS open={addOpen} setOpen={setAddOpen} type={isIncome ? "income" : "expense"} />
        </Host>
    )
}
