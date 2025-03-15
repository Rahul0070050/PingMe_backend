import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { JwtPayload } from "../../types";
import { AuthService } from "../../domain/services/authService";

export class AuthServiceImpl implements AuthService {
  encryptPassword = (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  };

  comparePassword = (password: string, hashPassword: string) =>
    compareSync(password, hashPassword);

  verifyJwt = (token: string) => jwt.verify(token, config.jwtSecret);

  generateToken = (payload: JwtPayload) =>
    jwt.sign(payload, config.jwtSecret, { expiresIn: "1w" });

  validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
}
