import { Stack } from "expo-router";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { db } from "../db/client";
import { seedCategories } from "../db/seed";
import migrations from "../drizzle/migrations";
import { useFinanceStore } from "../store/useFinanceStore";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const [seedError, setSeedError] = useState<Error | null>(null);
  const hydrate = useFinanceStore((s) => s.hydrate);
  const isHydrated = useFinanceStore((s) => s.isHydrated);

  useEffect(() => {
    if (success) {
      seedCategories()
        .then(() => hydrate())
        .catch((err) => {
          console.error("Failed to seed or hydrate store:", err);
          setSeedError(err instanceof Error ? err : new Error(String(err)));
        });
    }
  }, [success, hydrate]);

  if (error) return <Text>Migration error: {error.message}</Text>;
  if (seedError) return <Text>Setup error: {seedError.message}</Text>;
  if (!success || !isHydrated) return <Text>Loading…</Text>;
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
