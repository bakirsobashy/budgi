import { TextStyle } from "react-native";
import type { ThemeColors } from "./colors";

// Font family names as exported by @expo-google-fonts/inter
// These must match the keys used when loading fonts via useFonts()
const INTER_REGULAR = "Inter_400Regular";
const INTER_SEMIBOLD = "Inter_600SemiBold";
const INTER_BOLD = "Inter_700Bold";

/**
 * Every text style token from the Budgi Final Design Spec §2.
 *
 * - Amount-related styles include `fontVariant: ['tabular-nums']` so digits
 *   are monospaced and columns align properly.
 * - `overline` and `section` are meant to be rendered uppercase at the use
 *   site (e.g. `textTransform: 'uppercase'`).
 * - Colors are NOT baked in — use the `typography()` helper or apply colors
 *   at the call site so light/dark theme works.
 */
const styles = {
  heroNumber: {
    fontFamily: INTER_BOLD,
    fontSize: 52,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 62,
    fontVariant: ["tabular-nums"] as const,
  },
  entryAmount: {
    fontFamily: INTER_BOLD,
    fontSize: 56,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 66,
    fontVariant: ["tabular-nums"] as const,
  },
  title: {
    fontFamily: INTER_BOLD,
    fontSize: 17,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 22,
  },
  tabActive: {
    fontFamily: INTER_BOLD,
    fontSize: 17,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 22,
  },
  tabInactive: {
    fontFamily: INTER_REGULAR,
    fontSize: 17,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 22,
  },
  rowName: {
    fontFamily: INTER_SEMIBOLD,
    fontSize: 16,
    fontWeight: "600" as const,
    letterSpacing: 0,
    lineHeight: 22,
  },
  rowAmount: {
    fontFamily: INTER_BOLD,
    fontSize: 16,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 22,
    fontVariant: ["tabular-nums"] as const,
  },
  summaryValue: {
    fontFamily: INTER_BOLD,
    fontSize: 17,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 22,
    fontVariant: ["tabular-nums"] as const,
  },
  amountSmall: {
    fontFamily: INTER_SEMIBOLD,
    fontSize: 14,
    fontWeight: "600" as const,
    letterSpacing: 0,
    lineHeight: 20,
    fontVariant: ["tabular-nums"] as const,
  },
  amountTiny: {
    fontFamily: INTER_SEMIBOLD,
    fontSize: 12,
    fontWeight: "600" as const,
    letterSpacing: 0,
    lineHeight: 16,
    fontVariant: ["tabular-nums"] as const,
  },
  label: {
    fontFamily: INTER_REGULAR,
    fontSize: 12,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 16,
  },
  caption: {
    fontFamily: INTER_REGULAR,
    fontSize: 11,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 16,
  },
  overline: {
    fontFamily: INTER_REGULAR,
    fontSize: 11,
    fontWeight: "400" as const,
    letterSpacing: 2,
    lineHeight: 16,
  },
  section: {
    fontFamily: INTER_REGULAR,
    fontSize: 10,
    fontWeight: "400" as const,
    letterSpacing: 2,
    lineHeight: 14,
  },
  button: {
    fontFamily: INTER_SEMIBOLD,
    fontSize: 14,
    fontWeight: "600" as const,
    letterSpacing: 0,
    lineHeight: 20,
  },
  keypad: {
    fontFamily: INTER_REGULAR,
    fontSize: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  navActive: {
    fontFamily: INTER_BOLD,
    fontSize: 12,
    fontWeight: "700" as const,
    letterSpacing: 0,
    lineHeight: 16,
  },
  navInactive: {
    fontFamily: INTER_REGULAR,
    fontSize: 12,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 16,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof styles;

/**
 * Returns a complete `TextStyle` for the given token, with `color` defaulting
 * to `colors.textPrimary`. Override the color at the call site for
 * income/expense/muted variants.
 *
 * @example
 * ```tsx
 * <Text style={typography('heroNumber', colors)}>$1,700.00</Text>
 * <Text style={[typography('rowAmount', colors), { color: colors.expense }]}>−$25.00</Text>
 * ```
 */
export function typography(
  token: TypographyToken,
  colors: ThemeColors,
): TextStyle {
  return {
    ...styles[token],
    color: colors.textPrimary,
  };
}

export { styles as typographyStyles };
