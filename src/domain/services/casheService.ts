import { Chat } from "../../domain/entities/Chat";

export interface CacheService {
  setSocketClientId(id: string, clientId: string): Promise<boolean>;
  getSocketClientId(email: string): Promise<string>;
  deleteSocketClientId(email: string): Promise<boolean>; // Fixed return type
  setMessageCache(message: Chat): Promise<void>;
  getMessageCache(senderId: string, receiverId: string): Promise<Chat[] | null>;
  isUserOnline(userId: string): Promise<boolean>;
  markMessageRead(messageId: string): Promise<void>;
  isMessageRead(messageId: string): Promise<boolean>;
  clearChat(senderId: string, receiverId: string): Promise<void>;
}
