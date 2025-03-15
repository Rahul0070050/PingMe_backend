import { ExpressType } from "../../../types";
import authController from "../../../interfaces/controllers/authController";

export default function authRouter(express: ExpressType) {
  const router = express.Router();
  const controller = authController();

  router.post("/login", controller.loginUser);
  router.post("/register", controller.registerUser);

  return router;
}
