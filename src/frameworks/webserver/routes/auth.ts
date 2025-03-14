import { ExpressType } from "../../../types";
import authController from "../../../adapters/controllers/authController";

import userApplicationRepository from "../../../application/repositories/userApplicationRepository";
import userRpositoriesDb from "../../database/pg/repositories/userRpositoriesDb";
import authServiceInterface from "../../../application/services/authService";
import authServiceImpl from "../../services/authService";

export default function authRouter(express: ExpressType) {
  const router = express.Router();
  const controller = authController(
    userApplicationRepository,
    userRpositoriesDb,
    authServiceInterface,
    authServiceImpl
  );

  router.post("/login", controller.loginUser);
  router.post("/register", controller.registerUser);

  return router;
}
