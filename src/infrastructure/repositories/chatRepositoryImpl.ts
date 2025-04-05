import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { Chat } from "../../domain/entities/Chat";
import ChatModel from "../../frameworks/database/pg/models/chat";
import Valkey from "ioredis";
import { CacheService } from "../../domain/services/casheService";
import { Op } from "sequelize";
import { CacheServiceImpl } from "../services/casheService";

export class ChatRepositoryImpl implements ChatRepository {
  private cacheService: CacheService;

  constructor(private valkey: Valkey) {
    this.cacheService = new CacheServiceImpl(valkey);
  }

  async setSocketClientId(id: string, clientId: string): Promise<boolean> {
    try {
      return await this.cacheService.setSocketClientId(id, clientId);
    } catch (error) {
      console.error("Error setting socket client ID:", error);
      return false;
    }
  }

  async getSocketClientId(userId: string): Promise<string> {
    try {
      return await this.cacheService.getSocketClientId(userId);
    } catch (error) {
      console.error("Error getting socket client ID:", error);
      return "";
    }
  }

  async deleteSocketClientId(userId: string): Promise<boolean> {
    try {
      return await this.cacheService.deleteSocketClientId(userId);
    } catch (error) {
      console.error("Error deleting socket client ID:", error);
      return false;
    }
  }

  async setMessage(chat: Chat): Promise<void> {
    try {
      await ChatModel.create({
        senderId: chat.senderId,
        receiverId: chat.receiverId,
        message: chat.message,
        timestamp: chat.timestamp,
        seen: chat.seen,
      });
    } catch (error) {
      console.error("Error setting message:", error);
      throw error;
    }
  }

  async updateMessage(id: string): Promise<void> {
    try {
      await ChatModel.update(
        {
          seen: true,
        },
        {
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        }
      );
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  }

  async setMessageCache(chat: Chat) {
    try {
      await this.cacheService.setMessageCache(chat);
    } catch (error) {
      console.error("Error setting message:", error);
      throw error;
    }
  }
  // async getMessageCache(senderId: string, receiverId: string): Promise<Chat[] | null> {

  // }

  async getMessages(
    senderId: string,
    receiverId: string,
    offset: number
  ): Promise<Chat[]> {
    try {
      const cachedMessages = await this.cacheService.getMessageCache(
        senderId,
        receiverId
      );

      if (Array.isArray(cachedMessages)) {
        console.log("cache");

        return cachedMessages.map((msg) => {
          return {
            ...msg,
            seen: true,
          };
        });
      }

      const messages = await ChatModel.findAll({
        where: {
          [Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
        offset: offset || 0,
        limit: 15,
        order: [["timestamp", "DESC"]],
      });

      const chatMessages = messages.map(
        (msg) =>
          new Chat(
            msg.getDataValue("id"),
            msg.getDataValue("senderId"),
            msg.getDataValue("receiverId"),
            msg.getDataValue("message"),
            msg.getDataValue("timestamp"),
            msg.getDataValue("seen")
          )
      );

      const messageIds = chatMessages
        .filter((msg) => !msg.seen && msg.senderId === receiverId)
        .map((msg) => msg.id);

      // console.log("messageIds ", messageIds);

      if (messageIds.length) {
        ChatModel.update(
          { seen: true },
          {
            where: {
              id: {
                [Op.in]: messageIds,
              },
            },
          }
        );
      }

      return chatMessages.reverse();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to retrieve chat messages. Please try again.");
    }
  }

  async isUserOnline(userId: string): Promise<boolean> {
    try {
      return await this.cacheService.isUserOnline(userId);
    } catch (error) {
      console.error("Error checking user online status:", error);
      return false;
    }
  }

  async markMessageRead(messageId: string): Promise<void> {
    try {
      await this.cacheService.markMessageRead(messageId);
    } catch (error) {
      console.error("Error marking message as read:", error);
      throw error;
    }
  }

  async isMessageRead(messageId: string): Promise<boolean> {
    try {
      return await this.cacheService.isMessageRead(messageId);
    } catch (error) {
      console.error("Error checking message read status:", error);
      return false;
    }
  }

  async clearChat(senderId: string, receiverId: string): Promise<void> {
    try {
      // Clear from cache
      await this.cacheService.clearChat(senderId, receiverId);

      // Clear from database
      await ChatModel.destroy({
        where: {
          [Op.or]: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });
    } catch (error) {
      console.error("Error clearing chat:", error);
      throw error;
    }
  }
}
