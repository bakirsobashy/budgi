import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("finance.db");
try {
  expoDb.execSync("ALTER TABLE categories ADD COLUMN type text NOT NULL DEFAULT 'expense';");
} catch (e) {
  // Ignore if column already exists
}
console.log("Client initialized successfully");

export const db = drizzle(expoDb, { schema });
