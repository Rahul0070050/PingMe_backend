import UserEntity from "../../..//domain/entities/user";
import ErrorResponse from "../../../domain/responses/errorResponse";
import SuccessResponse from "../../../domain/responses/successResponse";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { AuthService } from "../../../domain/services/authService";

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(userData: UserEntity) {
    try {
      const isEmailValid = this.authService.validateEmail(userData.email);
      if (!isEmailValid) {
        throw new ErrorResponse("Please provide a valid Email", 406);
      }

      const isUsernameExists = await this.userRepository.findByUsername(
        userData.username
      );
      if (isUsernameExists) {
        throw new ErrorResponse("This Username already Exists", 406);
      }

      const isEmailExists = await this.userRepository.findByEmail(
        userData.email
      );
      if (isEmailExists) {
        throw new ErrorResponse("This Email already Exists", 406);
      }

      userData.password = this.authService.encryptPassword(userData.password);

      const response = await this.userRepository.createUser(userData);
      if (response) {
        return new SuccessResponse("Registration successfuly completed");
      }
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
