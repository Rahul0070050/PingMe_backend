import Valkey from "ioredis";
import { Chat } from "../../domain/entities/Chat";

export class CacheService {
  private cache: Valkey;

  constructor(cache: Valkey) {
    this.cache = cache;
  }

  async setMessageCache(message: Chat): Promise<void> {
    await this.cache.set(
      `chat:${message.senderId}:${message.receiverId}`,
      JSON.stringify(message)
    );
  }

  async getMessageCache(
    senderId: string,
    receiverId: string
  ): Promise<Chat[] | null> {
    const cachedMessages = await this.cache.get(
      `chat:${senderId}:${receiverId}`
    );
    return cachedMessages ? JSON.parse(cachedMessages) : null;
  }
}
