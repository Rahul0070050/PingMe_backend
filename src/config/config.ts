import dotenv from "dotenv";
import { CONFIG } from "../types/config";
dotenv.config();
export const config: CONFIG = {
  port: process.env.PORT || "3001",
  ip: process.env.HOST || "0.0.0.0",
  pg: {
    uri: process.env.PG_CONNECTION_URI || "",
    user: process.env.PG_USER || "",
    password: process.env.PG_PASSWORD || "",
    database: process.env.PG_DB_NAME || "",
  },
  ioredis: {
    uri: process.env.REDIS_URL || "redis://localhost:6379",
    host: process.env.REDIS_HOST || "",
    port: Number(process.env.REDIS_PORT) || 0,
    username: process.env.REDIS_USERNAME || "",
    password: process.env.REDIS_PASSWORD || "",
  },
  jwtSecret: process.env.JWT_SECRET || "jkl!±@£!@ghj1237",
};
