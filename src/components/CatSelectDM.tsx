import type { Category } from '@/lib/types';
import { DropdownMenu, DropdownMenuItem, Icon, OutlinedButton, Text } from '@expo/ui/jetpack-compose';
import { useState } from 'react';

export default function CatSelectDM({ categories, setCategory }: { categories: Category[], setCategory: (catId: number) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selCat, setSelCat] = useState<Category | null>(null);
    return (
        <DropdownMenu expanded={isExpanded} onDismissRequest={() => setIsExpanded(false)}>
            <DropdownMenu.Trigger>
                <OutlinedButton onClick={() => setIsExpanded(true)}>
                    <Text>{selCat?.name ?? "select Category"}</Text>
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
                        }}>
                        <DropdownMenuItem.Text>
                            <Text>{cat.name}</Text>
                        </DropdownMenuItem.Text>
                        <DropdownMenuItem.LeadingIcon>
                            <Icon source={require('./ThreeDots.png')} size={24} />
                        </DropdownMenuItem.LeadingIcon>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                    onClick={() => {
                        setIsExpanded(false);
                        setSelCat(null);
                        setCategory(0);
                    }}>
                    <DropdownMenuItem.Text>
                        <Text>Cancel</Text>
                    </DropdownMenuItem.Text>
                    <DropdownMenuItem.LeadingIcon>
                        <Icon source={require('./ThreeDots.png')} size={24} />
                    </DropdownMenuItem.LeadingIcon>
                </DropdownMenuItem>
            </DropdownMenu.Items>
        </DropdownMenu>
    );
}
