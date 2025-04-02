import Valkey from "ioredis";
import { Chat } from "../../domain/entities/Chat";
import { CacheService } from "../../domain/services/casheService";

export class CacheServiceImpl implements CacheService {
  private cache: Valkey;
  private readonly MESSAGE_EXPIRY = 86400;

  constructor(cache: Valkey) {
    this.cache = cache;
  }

  async setMessageCache(message: Chat): Promise<void> {
    const key = `chat:${message.senderId}:${message.receiverId}`;
    await this.cache.lpush(key, JSON.stringify(message));
    await this.cache.expire(key, this.MESSAGE_EXPIRY);
  }

  async getMessageCache(
    senderId: string,
    receiverId: string
  ): Promise<Chat[] | null> {
    const key = `chat:${senderId}:${receiverId}`;
    const cachedMessages = await this.cache.lrange(key, 0, -1);
    this.cache.del(key);
    return cachedMessages.length > 0
      ? cachedMessages.map((msg) => JSON.parse(msg))
      : null;
  }

  async isUserOnline(userId: string): Promise<boolean> {
    return (await this.cache.get(`socket:${userId}`)) ? true : false;
  }

  async markMessageRead(messageId: string): Promise<void> {
    await this.cache.set(
      `message:read:${messageId}`,
      "true",
      "EX",
      this.MESSAGE_EXPIRY
    );
  }

  async isMessageRead(messageId: string): Promise<boolean> {
    return (await this.cache.get(`message:read:${messageId}`)) === "true";
  }

  async clearChat(senderId: string, receiverId: string): Promise<void> {
    await this.cache.del(`chat:${senderId}:${receiverId}`);
  }

  async setSocketClientId(userId: string, clientId: string): Promise<boolean> {
    try {
      await this.cache.set(`socket:${userId}`, clientId, "EX", 86400);
      return true;
    } catch (error) {
      console.error("Error setting socket client ID:", error);
      return false;
    }
  }

  async getSocketClientId(userId: string): Promise<string> {
    return (await this.cache.get(`socket:${userId}`)) || "";
  }

  async deleteSocketClientId(userId: string): Promise<boolean> {
    try {
      await this.cache.del(`socket:${userId}`);
      return true;
    } catch (error) {
      console.error("Error deleting socket client ID:", error);
      return false;
    }
  }
}
