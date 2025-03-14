import { RedisClientType } from "redis";
import { ExpressType } from "../../../types";

export default function userRouter(
  express: ExpressType,
  redisClient: RedisClientType
) {
  const router = express.Router();
  return router;
}
