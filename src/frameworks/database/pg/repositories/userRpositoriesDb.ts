import User from "../models/user";
import { USER, UserRepositoryDb } from "../../../../types/user";

export default function userRepositoryDb(): UserRepositoryDb {
  const create = async (params: USER) => {
    try {
      await User.create({
        username: params.username,
        email: params.email,
        dateOfBirth: params.dateOfBirth,
        phone: params.phone,
        password: params.password,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const findByUsername = async (username: string) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return null;
      }
      return user.dataValues as USER;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateUser = async (params: USER) => {
    try {
      await User.update(
        {
          username: params.username,
          email: params.email,
          profile: params.profile,
          dateOfBirth: params.dateOfBirth,
          phone: params.phone,
          bio: params.bio,
          website: params.website,
          youtube: params.youtube,
          twitter: params.twitter,
          facebook: params.facebook,
          linkdin: params.linkdin,
          enableChatNotification: params.enableChatNotification,
          enableChatSound: params.enableChatSound,
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

  return { create, findByUsername, updateUser };
}
