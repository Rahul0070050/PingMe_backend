import { UserRepositoryImpl } from "../../infrastructure/repositories/userRpositoriesImpl";
import ErrorResponse from "../../domain/responses/errorResponse";
import { UserRequest, UserResponse } from "../../types";

export default function userController() {
  const userRepository = new UserRepositoryImpl();
  const getAllUsers = async (req: UserRequest, res: UserResponse) => {
    try {
      if (!req.user) return;
      const allUsers = await userRepository.getAllUsers(
        ["id", "username", "bio", "profile", "lastSeen"],
        req.user.id
      );
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
