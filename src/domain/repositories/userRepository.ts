import UserEntity from "../entities/user";

export interface UserRepository {
  findByUsername: (username: string) => Promise<UserEntity | null>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  createUser: (params: UserEntity) => Promise<boolean>;
  updateUser: (params: UserEntity) => Promise<boolean>;
}
