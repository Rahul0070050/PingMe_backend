import { ExpressType, ValkeyClient } from "../../../types";

export default function userRouter(
  express: ExpressType,
  valkeyClient: ValkeyClient
) {
  const router = express.Router();
  return router;
}
