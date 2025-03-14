import {
  USER,
  UserApplicationRepository,
  UserRepositoryDb,
} from "../../types/user";

export default function userApplicationRepository(
  repository: UserRepositoryDb
): UserApplicationRepository {
  const findByUsername = (username: string) =>
    repository.findByUsername(username);
  const createUser = (params: USER) => repository.create(params);
  const updateUser = (params: USER) => repository.updateUser(params);
  return {
    findByUsername,
    createUser,
    updateUser,
  };
}
