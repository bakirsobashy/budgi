import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "@budgi/themeMode";

const VALID_MODES: readonly ThemeMode[] = ["light", "dark", "system"] as const;

interface SettingsState {
  /** User's theme preference. Defaults to `'system'` until hydrated. */
  themeMode: ThemeMode;

  /** Whether the persisted value has been read from storage. */
  isHydrated: boolean;

  /** Read the persisted theme mode from AsyncStorage. Call once at app start. */
  hydrate: () => Promise<void>;

  /** Update the theme mode and persist it to AsyncStorage. */
  setThemeMode: (mode: ThemeMode) => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useSettingsStore = create<SettingsState>((set) => ({
  themeMode: "system",
  isHydrated: false,

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored && VALID_MODES.includes(stored as ThemeMode)) {
        set({ themeMode: stored as ThemeMode, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch {
      // Storage read failed — keep the default ("system") and mark hydrated
      // so the app doesn't block on a broken storage layer.
      set({ isHydrated: true });
    }
  },

  setThemeMode: (mode: ThemeMode) => {
    set({ themeMode: mode });
    // Fire-and-forget write — if it fails the in-memory value is still correct
    // and will be retried implicitly the next time the user changes the setting.
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  },
}));
