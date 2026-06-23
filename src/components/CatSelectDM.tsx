import type { Category } from "@/lib/types";
import { Spacer, Text } from "@expo/ui";
import {
  DropdownMenu,
  DropdownMenuItem,
  Icon,
  OutlinedButton,
} from "@expo/ui/jetpack-compose";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
export default function CatSelectDM({
  categories,
  setCategory,
}: {
  categories: Category[];
  setCategory: (catId: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selCat, setSelCat] = useState<Category | null>(null);
  return (
    <DropdownMenu
      expanded={isExpanded}
      onDismissRequest={() => setIsExpanded(false)}
    >
      <DropdownMenu.Trigger>
        <OutlinedButton onClick={() => setIsExpanded(true)}>
          <SymbolView
            name={{ android: selCat?.icon as any }}
            size={24}
            tintColor={selCat?.color || undefined}
          />
          <Spacer size={8} />
          <Text textStyle={{ color: selCat?.color ?? undefined }}>
            {selCat?.name ?? "select Category"}
          </Text>
        </OutlinedButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Items>
        {categories.map((cat) => (
          <DropdownMenuItem
            key={cat.id}
            onClick={() => {
              setCategory(cat.id);
              setIsExpanded(false);
              setSelCat(cat);
            }}
          >
            <DropdownMenuItem.Text>
              <Text textStyle={cat.color ? { color: cat.color } : undefined}>
                {cat.name}
              </Text>
            </DropdownMenuItem.Text>
            <DropdownMenuItem.LeadingIcon>
              <SymbolView
                name={{ android: cat.icon as any }}
                size={24}
                tintColor={cat.color || undefined}
              />
            </DropdownMenuItem.LeadingIcon>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => {
            setIsExpanded(false);
            setSelCat(null);
            setCategory(0);
          }}
        >
          <DropdownMenuItem.Text>
            <Text>Cancel</Text>
          </DropdownMenuItem.Text>
          <DropdownMenuItem.LeadingIcon>
            <Icon source={require("@/assets/Icons/ThreeDots.png")} size={24} />
          </DropdownMenuItem.LeadingIcon>
        </DropdownMenuItem>
      </DropdownMenu.Items>
    </DropdownMenu>
  );
}
