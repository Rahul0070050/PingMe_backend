import { JwtPayload } from "../../types";
import { AuthServiceInterface } from "../../types/user";

export default function authService(service: AuthServiceInterface) {
  const encryptPassword = (password: string) =>
    service.encryptPassword(password);
  const comparePassword = (password: string, hashPassword: string) =>
    service.comparePassword(password, hashPassword);
  const verifyJwt = (token: string) => service.verifyJwt(token);
  const generateToken = (payload: JwtPayload) => service.generateToken(payload);
  return {
    encryptPassword,
    comparePassword,
    verifyJwt,
    generateToken,
  };
}
