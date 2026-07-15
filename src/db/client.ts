import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("finance.db");
console.log("Database opened successfully");

export const db = drizzle(expoDb, { schema });
