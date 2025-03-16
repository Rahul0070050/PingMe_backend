import { Chat } from "../entities/Chat";

export interface ChatRepository {
  saveMessage(chat: Chat): Promise<void>;
  getMessages(user1: string, user2: string): Promise<Chat[]>;
}
