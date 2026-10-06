import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useColorScheme, TextStyle } from "react-native";

import { useSettingsStore } from "../store/useSettingsStore";
import { lightColors, darkColors, type ThemeColors } from "./colors";
import { spacing } from "./spacing";
import { typography as typographyHelper, type TypographyToken } from "./typography";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeValue {
  /** Resolved color palette for the current appearance. */
  colors: ThemeColors;

  /**
   * Shorthand for building a themed `TextStyle`.
   *
   * @example
   * ```tsx
   * const { typography } = useTheme();
   * <Text style={typography('heroNumber')}>$1,700</Text>
   * <Text style={[typography('rowAmount'), { color: colors.expense }]}>−$25</Text>
   * ```
   */
  typography: (token: TypographyToken) => TextStyle;

  /** Layout constants from the design spec. */
  spacing: typeof spacing;

  /** Whether the resolved appearance is dark. */
  isDark: boolean;

  /** The raw user preference (may be `'system'`). */
  themeMode: ThemeMode;

  /** Update the user preference. Persisted to AsyncStorage via useSettingsStore. */
  setThemeMode: (mode: ThemeMode) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ThemeContext = createContext<ThemeValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/**
 * Wraps the app tree and provides resolved theme tokens via `useTheme()`.
 *
 * Place this as high as possible in the component tree (e.g. in `_layout.tsx`).
 * Theme preference is persisted via `useSettingsStore` + AsyncStorage.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // -- Theme mode state (persisted via useSettingsStore) --------------------
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);

  // -- Resolve system appearance -------------------------------------------
  const systemScheme = useColorScheme(); // "light" | "dark" | null

  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return systemScheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, systemScheme]);

  const colors: ThemeColors = isDark ? darkColors : lightColors;

  // -- Bind typography helper to current colors ----------------------------
  const typography = useCallback(
    (token: TypographyToken): TextStyle => typographyHelper(token, colors),
    [colors],
  );

  // -- Memoised context value ----------------------------------------------
  const value = useMemo<ThemeValue>(
    () => ({
      colors,
      typography,
      spacing,
      isDark,
      themeMode,
      setThemeMode,
    }),
    [colors, typography, isDark, themeMode, setThemeMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current theme tokens.
 *
 * Must be called inside a `<ThemeProvider>`.
 *
 * @returns `{ colors, typography, spacing, isDark, themeMode, setThemeMode }`
 */
export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme() must be used within a <ThemeProvider>");
  }
  return ctx;
}
