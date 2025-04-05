import { DataTypes } from "sequelize";
import sequelize from "../connection";

const Friends = sequelize.define("Friends", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
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
  phone: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 10],
    },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isRequstAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Friends.sync({ alter: true });
export default Friends;
