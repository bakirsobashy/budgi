import AddCatBS from "@/components/AddCatBS";
import AddCatButton from "@/components/AddCatButton";
import CatCard from "@/components/CatCard";
import CatEditBS from "@/components/CatEditBS";
import IncomeTB from "@/components/IncomeTB";
import { useFinanceStore } from "@/store/useFinanceStore";
import { ScrollView } from "@expo/ui";
import { Box, Column, Host } from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  padding,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";

export default function Categories() {
  const categories = useFinanceStore((state) => state.categories);
  const [catId, setCatId] = useState<number | null>(null);
  const [isIncome, setIsIncome] = useState(true);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  return (
    <Host style={{ flex: 1 }}>
      <Column>
        <Column
          modifiers={[fillMaxWidth(), padding(8, 40, 8, 0)]}
          horizontalAlignment="center"
        >
          <IncomeTB isIncome={isIncome} setIsIncome={setIsIncome} />
        </Column>
        <Box modifiers={[fillMaxSize()]}>
          <ScrollView>
            <Column
              verticalArrangement={{ spacedBy: 16 }}
              modifiers={[fillMaxWidth(), paddingAll(16)]}
            >
              {categories
                .filter((cat) => cat.type === (isIncome ? "income" : "expense"))
                .map((cat) => {
                  return (
                    <CatCard
                      key={cat.id}
                      color={cat.color}
                      name={cat.name}
                      icon={cat.icon}
                      onPress={() => {
                        setOpen(true);
                        setCatId(cat.id);
                      }}
                      onEditPress={() => {
                        setOpen(true);
                        setCatId(cat.id);
                      }}
                    />
                  );
                })}
            </Column>
          </ScrollView>
          <AddCatButton onClick={() => setAddOpen(true)} />
        </Box>
      </Column>
      <CatEditBS open={open} setOpen={setOpen} catId={catId || 0} />
      <AddCatBS
        open={addOpen}
        setOpen={setAddOpen}
        type={isIncome ? "income" : "expense"}
      />
    </Host>
  );
}
