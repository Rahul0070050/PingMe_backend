import { JwtPayload as MyJwtPayload } from "../../types";
import { JwtPayload } from "jsonwebtoken";

export interface AuthService {
  encryptPassword: (password: string) => string;
  comparePassword: (password: string, hashPassword: string) => boolean;
  verifyJwt: (token: string) => string | JwtPayload;
  generateToken: (payload: MyJwtPayload) => string;
  validateEmail: (email: string) => boolean;
}
