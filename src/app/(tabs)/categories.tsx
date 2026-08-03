import AddCatBS from "@/components/AddCatBS";
import AddCatButton from "@/components/AddCatButton";
import CatCard from "@/components/CatCard";
import CatDescBS from "@/components/CatDescBS";
import CatEditBS from "@/components/CatEditBS";
import IncomeTB from "@/components/IncomeTB";
import { useFinanceStore } from "@/store/useFinanceStore";
import { ScrollView } from "@expo/ui";
import { Box, Column, Host } from "@expo/ui/jetpack-compose";
import {
  fillMaxSize,
  fillMaxWidth,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Categories() {
  const categories = useFinanceStore((state) => state.categories);
  const [catId, setCatId] = useState<number | null>(null);
  const [isIncome, setIsIncome] = useState(true);
  const [open, setOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Host style={styles.host}>
          <Column modifiers={[fillMaxSize()]}>
            <IncomeTB isIncome={isIncome} setIsIncome={setIsIncome} />

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
                            setCatId(cat.id);
                            setDescOpen(true);
                          }}
                          onEditPress={() => {
                            setCatId(cat.id);
                            setOpen(true);
                          }}
                        />
                      );
                    })}
                </Column>
              </ScrollView>
              <AddCatButton onClick={() => setAddOpen(true)} />
            </Box>
          </Column>

          <CatDescBS
            showBottomSheet={descOpen}
            setShowBottomSheet={setDescOpen}
            catId={catId ?? 0}
          />
          <CatEditBS
            key={catId ?? 0}
            open={open}
            setOpen={setOpen}
            catId={catId ?? 0}
          />
          <AddCatBS
            open={addOpen}
            setOpen={setAddOpen}
            type={isIncome ? "income" : "expense"}
          />
        </Host>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inner: {
    flex: 1,
    width: "100%",
  },
  host: {
    flex: 1,
    width: "100%",
  },
});
