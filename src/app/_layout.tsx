import { Stack } from "expo-router";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect } from "react";
import { Text } from "react-native";
import { db } from "../db/client";
import { seedCategories } from "../db/seed";
import migrations from "../drizzle/migrations";
import { useFinanceStore } from "../store/useFinanceStore";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const hydrate = useFinanceStore((s) => s.hydrate);
  const isHydrated = useFinanceStore((s) => s.isHydrated);

  useEffect(() => {
    if (success) {
      seedCategories().then(() => hydrate());
    }
  }, [success]);
  if (error) return <Text>Migration error: {error.message}</Text>;
  if (!success || !isHydrated) return <Text>Loading…</Text>;
  return <Stack />;
}
