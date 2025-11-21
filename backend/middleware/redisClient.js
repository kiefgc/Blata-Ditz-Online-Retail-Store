import Redis from "ioredis";

const isProduction = process.env.REDIS_HOST && process.env.REDIS_PORT;

export const redisClient = isProduction
  ? new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      tls: {},
    })
  : new Redis();

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));
