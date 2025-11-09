import dotenv from "dotenv";
dotenv.config();

import mongodb from "mongodb";

const client = new mongodb.MongoClient(process.env.MONGODB_URI);
const dbName = process.env.MONGODB_NAME || "blataditz-ors";
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error("No database found");
  return db;
}
