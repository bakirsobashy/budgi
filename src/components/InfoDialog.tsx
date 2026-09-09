import { Text } from "@expo/ui";
import {
  BasicAlertDialog,
  Button,
  Column,
  Spacer,
  Surface,
} from "@expo/ui/jetpack-compose";
import {
  clip,
  height,
  padding,
  Shapes,
  wrapContentHeight,
  wrapContentWidth,
} from "@expo/ui/jetpack-compose/modifiers";
import { Linking } from "react-native";

const DONATE_URL =
  "https://checkout.rasedi.com/pay/test/d80c7a23-02d1-42e9-a114-0b0276830097";
const PRIVACY_POLICY_URL =
  "https://github.com/bakirsobashy/budgi/blob/master/docs/privacy-policy.md";

export default function InfoDialog({
  setShowAboutSheet,
}: {
  setShowAboutSheet: (value: boolean) => void;
}) {
  return (
    <BasicAlertDialog onDismissRequest={() => setShowAboutSheet(false)}>
      <Surface
        tonalElevation={6}
        modifiers={[
          wrapContentWidth(),
          wrapContentHeight(),
          clip(Shapes.RoundedCorner(28)),
        ]}
      >
        <Column modifiers={[padding(16, 16, 16, 16)]}>
          <Text textStyle={{ fontWeight: "bold", fontSize: 18 }}>Budgi</Text>
          <Text>
            A personal finance app to track income, expenses, categories, and
            monthly budgets.
          </Text>
          <Text>Version: 1.0.0</Text>
          <Text>Developer: bakirsobashy</Text>
          <Text>Contact:</Text>
          <Text> GitHub: github.com/bakirsobashy/</Text>
          <Text> Email: bakir1998bt.bk@gmail.com</Text>
          <Text> Phone: +964 7727519662</Text>
          <Spacer modifiers={[height(12)]} />
          <Text>
            If you find this app useful, consider supporting the developer.
          </Text>
          <Spacer modifiers={[height(8)]} />
          <Button
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            onClick={() => Linking.openURL(DONATE_URL)}
          >
            <Text>Donate</Text>
          </Button>
          <Spacer modifiers={[height(12)]} />
          <Button
            colors={{ containerColor: "black", contentColor: "#FFFFFF" }}
            onClick={() => Linking.openURL(PRIVACY_POLICY_URL)}
          >
            <Text>Privacy Policy</Text>
          </Button>
        </Column>
      </Surface>
    </BasicAlertDialog>
  );
}
