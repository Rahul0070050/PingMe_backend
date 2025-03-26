import { Chat } from "../entities/Chat";

export interface ChatRepository {
  setSocketClientId(id: string, email: string): boolean;
  getSocketClientId(email: string): Promise<string>;
  deleteSocketClientId(email: string): boolean;
  setMessage(chat: Chat): Promise<void>;
  getMessages(user1: string, user2: string): Promise<Chat[]>;
}
