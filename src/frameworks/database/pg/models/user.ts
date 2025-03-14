import { DataTypes } from "sequelize";
import sequelize from "../connection";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  profile: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
    validate: {
      min: 10,
      max: 12,
    },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkdin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enableChatNotification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  enableChatSound: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync({ alter: true });
export default User;
