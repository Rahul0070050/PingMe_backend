import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { JwtPayload } from "../../types";
import { AuthServiceImpl } from "../../types/user";
export default function authService(): AuthServiceImpl {
  const encryptPassword = (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  };

  const comparePassword = (password: string, hashPassword: string) =>
    compareSync(password, hashPassword);

  const verifyJwt = (token: string) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload: JwtPayload) =>
    jwt.sign(payload, config.jwtSecret, { expiresIn: "1w" });

  return {
    encryptPassword,
    comparePassword,
    verifyJwt,
    generateToken,
  };
}
