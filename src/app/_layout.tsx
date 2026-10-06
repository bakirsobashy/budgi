import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../db/client";
import { seedCategories } from "../db/seed";
import migrations from "../drizzle/migrations";
import { useFinanceStore } from "../store/useFinanceStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { ThemeProvider } from "../theme/useTheme";

// Keep the native splash (white screen) visible while we render our own
// white React view with the animated GIF centered, so the transition from
// native splash → React splash is seamless.
try {
  void SplashScreen.preventAutoHideAsync();
} catch {
  /* In some environments (e.g. Expo Go) this can reject; safe to ignore. */
}

const ANIMATION = require("@/assets/Icons/animation.gif");

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const [seedError, setSeedError] = useState<Error | null>(null);
  const hydrate = useFinanceStore((s) => s.hydrate);
  const isHydrated = useFinanceStore((s) => s.isHydrated);
  const hydrateSettings = useSettingsStore((s) => s.hydrate);
  const isSettingsHydrated = useSettingsStore((s) => s.isHydrated);

  useEffect(() => {
    if (success) {
      seedCategories()
        .then(() => Promise.all([hydrate(), hydrateSettings()]))
        .catch((err) => {
          console.error("Failed to seed or hydrate store:", err);
          setSeedError(err instanceof Error ? err : new Error(String(err)));
        });
    }
  }, [success, hydrate, hydrateSettings]);

  // The native splash and the React splash below are both a white background,
  // so we can hide the native splash as soon as React has mounted — the user
  // sees a seamless white screen with the centered animated GIF that keeps
  // playing until the DB is migrated, seeded, and the store is hydrated.
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  if (error) return <Text>Migration error: {error.message}</Text>;
  if (seedError) return <Text>Setup error: {seedError.message}</Text>;

  // Show the React splash (white screen + centered animated GIF) until the
  // DB is migrated, seeded, and both stores are hydrated.
  if (!success || !isHydrated || !isSettingsHydrated) {
    return (
      <View style={styles.splash}>
        <Image
          source={ANIMATION}
          style={styles.splashImage}
          contentFit="contain"
        />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: 100,
    height: 100,
  },
});