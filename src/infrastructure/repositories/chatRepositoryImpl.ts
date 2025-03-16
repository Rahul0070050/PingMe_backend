import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { Chat } from "../../domain/entities/Chat";
import ChatModel from "../../frameworks/database/pg/models/chat";

export class ChatRepositoryImpl implements ChatRepository {
  async saveMessage(chat: Chat): Promise<void> {
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
