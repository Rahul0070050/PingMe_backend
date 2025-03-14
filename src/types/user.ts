import Jwt from "jsonwebtoken";
import { JwtPayload } from ".";

export type USER = {
  id: number;
  username: string;
  email: string;
  profile?: string;
  dateOfBirth: string;
  phone: string;
  bio?: string;
  website?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkdin?: string;
  enableChatNotification: boolean;
  enableChatSound: boolean;
  password: string;
};

export type UserRepositoryDb = {
  create: (user: USER) => Promise<boolean | string>;
  findByUsername: (username: string) => Promise<USER | null>;
  updateUser: (params: USER) => Promise<boolean | string>;
};

export interface UserApplicationRepository {
  findByUsername: (username: string) => Promise<USER | null>;
  createUser: (user: USER) => Promise<boolean | string>;
  updateUser: (params: USER) => Promise<boolean | string>;
}

export interface AuthServiceInterface {
  encryptPassword: (password: string) => string;
  comparePassword: (password: string, hashPassword: string) => boolean;
  verifyJwt: (token: string) => string | Jwt.JwtPayload;
  generateToken: (payload: JwtPayload) => string;
}
export interface AuthServiceImpl {
  encryptPassword: (password: string) => string;
  comparePassword: (password: string, hashPassword: string) => boolean;
  verifyJwt: (token: string) => string | Jwt.JwtPayload;
  generateToken: (payload: JwtPayload) => string;
}
