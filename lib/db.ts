import { Database } from "sqlite3";
import { open } from "sqlite";

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: "./gambling.db",
      driver: require("sqlite3").Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        coins INTEGER DEFAULT 10000,
        last_free_coins DATETIME
      );
    `);
  }
  return db;
}

export async function getUserCoins(userId: string): Promise<number> {
  const db = await getDb();
  const user = await db.get("SELECT coins FROM users WHERE id = ?", userId);
  if (!user) {
    await db.run("INSERT INTO users (id, coins) VALUES (?, ?)", userId, 10000);
    return 10000;
  }
  return user.coins;
}

export async function updateUserCoins(userId: string, amount: number): Promise<void> {
  const db = await getDb();
  await db.run(
    "UPDATE users SET coins = CASE WHEN coins + ? < 0 THEN 1000 ELSE coins + ? END WHERE id = ?",
    amount,
    amount,
    userId
  );
}