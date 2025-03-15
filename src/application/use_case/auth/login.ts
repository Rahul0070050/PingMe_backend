import { JwtPayload } from "../../../types";
import ErrorResponse from "../../../domain/responses/errorResponse";
import SuccessResponse from "../../../domain/responses/successResponse";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { AuthService } from "../../../domain/services/authService";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(username: string, password: string) {
    try {
      if (!username || !password) {
        throw new ErrorResponse("Email and Password cannot be empty", 400);
      }

      const user = await this.userRepository.findByUsername(username);
      if (!user) {
        throw new ErrorResponse("User not found", 404);
      }

      const isPasswordMatch = this.authService.comparePassword(
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
      const token = this.authService.generateToken(payload);

      const response = new SuccessResponse("Login success", { token });
      return response.toJSON();
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorResponse(error.message, 400).toJSON();
      }
      if (error instanceof ErrorResponse) {
        throw error.toJSON();
      }
      throw new ErrorResponse("Internal server error", 500);
    }
  }
}
