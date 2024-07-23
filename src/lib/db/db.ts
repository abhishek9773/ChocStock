import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  console.log("data base url not exist");
}
console.log(process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL as string;
export const connection = postgres(connectionString);

export const db = drizzle(connection);
