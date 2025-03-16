import UserEntity from "../../domain/entities/user";
import UserModel from "../../frameworks/database/pg/models/user";
import { UserRepository } from "../../domain/repositories/userRepository";

export class UserRepositoryImpl implements UserRepository {
  createUser = async (params: UserEntity) => {
    try {
      await UserModel.create({
        username: params.username,
        email: params.email,
        dateOfBirth: params.dateOfBirth,
        phone: params.phone,
        password: params.password,
      });
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("User creation failed");
      }
    }
  };

  findByUsername = async (username: string) => {
    try {
      const user = await UserModel.findOne({ where: { username } });
      if (!user) {
        return null;
      }
      return new UserEntity(
        user.getDataValue("id"),
        user.getDataValue("username"),
        user.getDataValue("email"),
        user.getDataValue("profile"),
        user.getDataValue("dateOfBirth"),
        user.getDataValue("phone"),
        user.getDataValue("bio"),
        user.getDataValue("website"),
        user.getDataValue("youtube"),
        user.getDataValue("twitter"),
        user.getDataValue("facebook"),
        user.getDataValue("linkdin"),
        user.getDataValue("enableChatNotification"),
        user.getDataValue("enableChatSound"),
        user.getDataValue("password")
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  findByEmail = async (email: string) => {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      return new UserEntity(
        user.getDataValue("id"),
        user.getDataValue("username"),
        user.getDataValue("email"),
        user.getDataValue("profile"),
        user.getDataValue("dateOfBirth"),
        user.getDataValue("phone"),
        user.getDataValue("bio"),
        user.getDataValue("website"),
        user.getDataValue("youtube"),
        user.getDataValue("twitter"),
        user.getDataValue("facebook"),
        user.getDataValue("linkdin"),
        user.getDataValue("enableChatNotification"),
        user.getDataValue("enableChatSound"),
        user.getDataValue("password")
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateUser = async (params: UserEntity) => {
    try {
      await UserModel.update(
        {
          profile: params?.profile,
          dateOfBirth: params?.dateOfBirth,
          phone: params?.phone,
          bio: params?.bio,
          website: params?.website,
          youtube: params?.youtube,
          twitter: params?.twitter,
          facebook: params?.facebook,
          linkdin: params?.linkdin,
          enableChatNotification: params?.enableChatNotification,
          enableChatSound: params?.enableChatSound,
        },
        {
          where: { id: params.id },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}
