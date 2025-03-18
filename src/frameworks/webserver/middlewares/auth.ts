import { Request, Response, NextFunction } from "express";
import { AuthServiceImpl } from "../../../infrastructure/services/authService";

export interface AuthRequest extends Request {
  user?: any;
}

const authService = new AuthServiceImpl();
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const decoded = authService.verifyJwt(token);

  if (!decoded) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
    return;
  }

  req.user = decoded;
  next();
};
