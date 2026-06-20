import { BottomSheet, Button, Spacer } from "@expo/ui";
import { Column, Row, Text } from "@expo/ui/jetpack-compose";

export default function AddTransactionButtomSheet({ showAddButtomSheet, setShowAddButtomSheet }: { showAddButtomSheet: boolean, setShowAddButtomSheet: (showAddButtomSheet: boolean) => void }) {
    return (
        <BottomSheet isPresented={showAddButtomSheet} onDismiss={() => setShowAddButtomSheet(false)}>
            <Column >
                <Row>
                    <Button>
                        <Text>Edit</Text>
                    </Button>
                    <Spacer flexible />
                    <Button>
                        <Text>Delete</Text>
                    </Button>
                </Row>
            </Column>
        </BottomSheet>
    );
}
