export const lightColors = {
  background: "#FDFDFD",
  textPrimary: "#111111",
  textSecondary: "#888888",
  textMuted: "#666666",
  textInactive: "#9A9A9A",
  divider: "#EEEEEE",
  dividerStrong: "#E4E4E4",
  track: "#E5E5E5",
  infoRing: "#C4C4C4",
  income: "#1F9D55",
  expense: "#D64545",
  onPrimary: "#FFFFFF",
} as const;

export const darkColors = {
  background: "#0E0E0E",
  textPrimary: "#F0F0F0",
  textSecondary: "#888888",
  textMuted: "#999999",
  textInactive: "#6B6B6B",
  divider: "#2A2A2A",
  dividerStrong: "#2A2A2A",
  track: "#2A2A2A",
  infoRing: "#555555",
  income: "#4ADE80",
  expense: "#F87171",
  onPrimary: "#0E0E0E",
} as const;

export type ThemeColors = { [K in keyof typeof lightColors]: string };
