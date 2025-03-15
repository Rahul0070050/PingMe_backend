import { Request, Response } from "express";
import ErrorResponse from "../../domain/responses/errorResponse";
import { RegisterUser } from "../../application/use_case/auth/register";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRpositoriesDb";
import { AuthServiceImpl } from "../../infrastructure/services/authService";
import { LoginUser } from "../../application/use_case/auth/login";

export default function authController() {
  const userRepository = new UserRepositoryImpl();
  const authService = new AuthServiceImpl();

  const loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ErrorResponse("Email and Password cannot be empty", 400);
      }

      const loginUseCase = new LoginUser(userRepository, authService);
      const result = await loginUseCase.execute(username, password);

      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json(error.toJSON());
        return;
      }
      res.status(error.statusCode).json(error);
    }
  };

  const registerUser = async (req: Request, res: Response) => {
    try {
      const { username, email, dateOfBirth, phone, password } = req.body;
      if (!username || !email || !dateOfBirth || !phone || !password) {
        throw new ErrorResponse("Please provide all the required fields", 400);
      }

      const registerUseCase = new RegisterUser(userRepository, authService);
      const result = await registerUseCase.execute(req.body);
      if (result) {
        res.status(result.statusCode).json(result.toJSON());
      }
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json(error.toJSON());
        return;
      }
      res.status(error.statusCode).json(error);
    }
  };

  return {
    loginUser,
    registerUser,
  };
}
