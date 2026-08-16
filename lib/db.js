import mysql from "mysql2/promise";

const requiredEnvironment = ["MYSQL_HOST", "MYSQL_USER", "MYSQL_DATABASE"];

export function isDatabaseConfigured() {
  return requiredEnvironment.every((key) => Boolean(process.env[key]));
}

function createPool() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0,
  });
}

const globalForDatabase = globalThis;
export const db = globalForDatabase.vibeVerseDb ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.vibeVerseDb = db;
}

export async function verifyDatabaseConnection() {
  if (!db) {
    return { configured: false, connected: false };
  }

  await db.query("SELECT 1");
  return { configured: true, connected: true };
}
