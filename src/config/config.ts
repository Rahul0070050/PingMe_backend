import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || "3001",
  ip: process.env.HOST || "0.0.0.0",
  pg: {
    uri: process.env.PG_CONNECTION_URI || "",
    user: process.env.PG_USER || "",
    password: process.env.PG_PASSWORD || "",
    database: process.env.PG_DB_NAME || "",
  },
  redis: {
    uri: process.env.REDIS_URL || "redis://localhost:6379",
  },
  jwtSecret: process.env.JWT_SECRET || "jkl!±@£!@ghj1237",
};
