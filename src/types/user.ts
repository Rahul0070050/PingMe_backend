import Jwt from "jsonwebtoken";
import { JwtPayload } from ".";

export type User = {
  id: string;
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

export interface UserRepositoryDb {
  create: (user: User) => Promise<boolean | string>;
  findByUsername: (username: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  updateUser: (params: User) => Promise<boolean | string>;
}

export interface UserApplicationRepository {
  findByUsername: (username: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  createUser: (user: User) => Promise<boolean | string>;
  updateUser: (params: User) => Promise<boolean | string>;
}

export interface AuthServiceInterface {
  encryptPassword: (password: string) => string;
  comparePassword: (password: string, hashPassword: string) => boolean;
  verifyJwt: (token: string) => string | Jwt.JwtPayload;
  generateToken: (payload: JwtPayload) => string;
  validateEmail: (email: string) => boolean;
}
export interface AuthServiceImpl {
  encryptPassword: (password: string) => string;
  comparePassword: (password: string, hashPassword: string) => boolean;
  verifyJwt: (token: string) => string | Jwt.JwtPayload;
  generateToken: (payload: JwtPayload) => string;
  validateEmail: (email: string) => boolean;
}
