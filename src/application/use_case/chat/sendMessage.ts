import { ChatRepository } from "../../../domain/repositories/ChatRepository";
import { Chat } from "../../../domain/entities/Chat";

export class SendMessage {
  constructor(private chatRepository: ChatRepository) {}

  async execute(senderId: string, receiverId: string, message: string) {
    if (!senderId || !receiverId || !message) throw new Error("Invalid data");

    const chat = new Chat(Date.now().toString(), senderId, receiverId, message);
    await this.chatRepository.saveMessage(chat);

    return chat;
  }
}
