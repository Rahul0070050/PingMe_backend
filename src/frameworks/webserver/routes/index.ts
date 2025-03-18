import authRouter from "./auth";
import userRouter from "./user";
import { ExpressAppType, ExpressType, ValkeyClient } from "../../../types";
import { authMiddleware } from "../middlewares/auth";

export default function routes(
  app: ExpressAppType,
  express: ExpressType,
  valkeyClient: ValkeyClient
) {
  app.use("/api/v1/auth", authRouter(express));
  app.use("/api/v1/user", authMiddleware, userRouter(express, valkeyClient));
}
