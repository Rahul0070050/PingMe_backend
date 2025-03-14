import { NextFunction, Request, Response } from "express";
import {
  AuthServiceImpl,
  AuthServiceInterface,
  UserApplicationRepository,
  UserRepositoryDb,
} from "../../types/user";
import login from "../../application/use_case/auth/login";
import ErrorResponse from "../../application/responses/errorResponse";

export default function authController(
  userApplicationRepository: (
    repository: UserRepositoryDb
  ) => UserApplicationRepository,
  userRepositoriesDb: () => UserRepositoryDb,
  authServiceInterface: (service: AuthServiceInterface) => AuthServiceImpl,
  authServiceImpl: () => AuthServiceImpl
) {
  const dbRepository = userApplicationRepository(userRepositoriesDb());
  const services = authServiceInterface(authServiceImpl());

  const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ErrorResponse("Email and Password cannot be empty", 400);
      }
      const result = await login(username, password, dbRepository, services);

      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json(error.toJSON());
        return;
      }
      res.status(error.statusCode).json(error);
    }
  };

  const registerUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, dateOfBirth, phone, password } = req.body;
      if (!username || !email || !dateOfBirth || !phone || !password) {
        throw new ErrorResponse("Please provide all the required fields", 400);
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
