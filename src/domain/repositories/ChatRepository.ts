import { Chat } from "../entities/Chat";

export interface ChatRepository {
  setSocketClientId(id: string, email: string): Promise<boolean>;
  getSocketClientId(email: string): Promise<string>;
  deleteSocketClientId(email: string): Promise<boolean>;
  setMessage(chat: Chat): Promise<void>;
  getMessages(
    senderId: string,
    receiverId: string,
    offset: number
  ): Promise<Chat[]>;
  setMessageCache(message: Chat): Promise<void>;
}
