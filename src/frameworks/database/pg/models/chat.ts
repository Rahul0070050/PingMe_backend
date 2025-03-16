import { DataTypes } from "sequelize";
import sequelize from "../connection";

const ChatModel = sequelize.define("Chat", {
  id: { type: DataTypes.STRING, primaryKey: true },
  senderId: { type: DataTypes.STRING, allowNull: false },
  receiverId: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default ChatModel;
