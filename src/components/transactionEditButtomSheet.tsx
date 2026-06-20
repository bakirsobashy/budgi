import { Transaction } from "@/lib/types";
import { BottomSheet, Column, Text } from "@expo/ui";
export default function TransactionEditButtomSheet({ showBottomSheet, setShowBottomSheet, selectedTransaction }: { showBottomSheet: boolean, setShowBottomSheet: (showBottomSheet: boolean) => void, selectedTransaction: Transaction | null }) {
    return (
        <BottomSheet isPresented={showBottomSheet} onDismiss={() => setShowBottomSheet(false)}>
            <Column spacing={16} style={{ padding: 16 }}>
                <Text>Transaction Details</Text>
                <Text>{`Description: ${selectedTransaction?.description ?? 'No description'}`}</Text>
            </Column>
        </BottomSheet>
    )
}