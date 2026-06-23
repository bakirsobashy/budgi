import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("finance.db");
const categoryColumnMigrations = [
  "ALTER TABLE categories ADD COLUMN type text NOT NULL DEFAULT 'expense';",
  "ALTER TABLE categories ADD COLUMN icon text NOT NULL DEFAULT 'Check.png';",
  "ALTER TABLE categories ADD COLUMN color text NOT NULL DEFAULT '#6200EE';",
];
for (const sql of categoryColumnMigrations) {
  try {
    expoDb.execSync(sql);
  } catch {
    // Ignore if column already exists
  }
}
console.log("Client initialized successfully");

export const db = drizzle(expoDb, { schema });
