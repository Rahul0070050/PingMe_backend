import { JwtPayload } from "../../../types";
import {
  UserApplicationRepository,
  AuthServiceImpl,
} from "../../../types/user";
import ErrorResponse from "../../responses/errorResponse";
import SuccessResponse from "../../responses/successResponse";

export default async function login(
  username: string,
  password: string,
  userRepositoryDb: UserApplicationRepository,
  authService: AuthServiceImpl
) {
  try {
    if (!username || !password) {
      throw new ErrorResponse("Email and Password cannot be empty", 400);
    }

    const user = await userRepositoryDb.findByUsername(username);
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }

    const isPasswordMatch = authService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordMatch) {
      throw new ErrorResponse("Password not matching", 401);
    }

    const payload: JwtPayload = {
      username: user.username,
      email: user.email,
      phone: user.phone,
    };
    const token = authService.generateToken(payload);

    const response = new SuccessResponse("Login success", { token });
    return response.toJSON();
  } catch (error) {
    if (error instanceof ErrorResponse) {
      throw error.toJSON();
    }
    throw new ErrorResponse("Internal server error", 500);
  }
}
