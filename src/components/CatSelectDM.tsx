import type { Category } from "@/lib/types";
import { Spacer, Text } from "@expo/ui";
import {
  DropdownMenu,
  DropdownMenuItem,
  Icon,
  OutlinedButton,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";

import { getIconSource } from "@/lib/icons";

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
          <Icon
            source={getIconSource(selCat?.icon || "")}
            size={24}
            tint={selCat?.color || undefined}
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
              <Icon
                source={getIconSource(cat.icon)}
                size={24}
                tint={cat.color || undefined}
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
        </DropdownMenuItem>
      </DropdownMenu.Items>
    </DropdownMenu>
  );
}
