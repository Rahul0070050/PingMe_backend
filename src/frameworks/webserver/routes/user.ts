import userController from "../../../interfaces/controllers/userController";
import { ExpressType, ValkeyClient } from "../../../types";

export default function userRouter(
  express: ExpressType,
  valkeyClient: ValkeyClient
) {
  const router = express.Router();
  const controller = userController();

  router.get("/list", controller.getAllUsers);

  return router;
}
