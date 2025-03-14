import { RedisClientType } from "redis";
import authRouter from "./auth";
import userRouter from "./user";
import { ExpressAppType, ExpressType } from "../../../types";

export default function routes(
  app: ExpressAppType,
  express: ExpressType,
  redisClient: RedisClientType
) {
  app.use("/api/v1/auth", authRouter(express));
  app.use("/api/v1/user", userRouter(express, redisClient));
}
