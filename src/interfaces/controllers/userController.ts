import { Request, Response } from "express";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRpositoriesImpl";
import ErrorResponse from "../../domain/responses/errorResponse";

export default function userController() {
  const userRepository = new UserRepositoryImpl();
  const getAllUsers = async (req: Request, res: Response) => {
    try {
      const allUsers = await userRepository.getAllUsers([
        "id",
        "username",
        "bio",
        "profile",
      ]);
      res.status(200).json(allUsers);
      return;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json(error.toJSON());
        return;
      }
      res.status(500).json(error);
    }
  };

  return { getAllUsers };
}
