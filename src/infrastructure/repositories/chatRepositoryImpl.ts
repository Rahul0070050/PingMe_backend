import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { Chat } from "../../domain/entities/Chat";
import ChatModel from "../../frameworks/database/pg/models/chat";
import Valkey from "ioredis";

export class ChatRepositoryImpl implements ChatRepository {
  constructor(private cache: Valkey) {}
  setSocketClientId(id: string, email: string): boolean {
    return true;
  }
  async getSocketClientId(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve("");
    });
  }
  deleteSocketClientId(email: string): boolean {
    return true;
  }
  async setMessage(chat: Chat): Promise<void> {
    await ChatModel.create({
      id: chat.id,
      senderId: chat.senderId,
      receiverId: chat.receiverId,
      message: chat.message,
      timestamp: chat.timestamp,
    });
  }

  async getMessages(user1: string, user2: string): Promise<Chat[]> {
    const messages = await ChatModel.findAll({
      where: {
        senderId: [user1, user2],
        receiverId: [user1, user2],
      },
      order: [["timestamp", "ASC"]],
    });

    return messages.map(
      (msg) =>
        new Chat(
          msg.getDataValue("id"),
          msg.getDataValue("senderId"),
          msg.getDataValue("receiverId"),
          msg.getDataValue("message"),
          msg.getDataValue("timestamp")
        )
    );
  }
}
