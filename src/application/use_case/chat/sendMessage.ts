import { ChatRepository } from "../../../domain/repositories/ChatRepository";
import { Chat } from "../../../domain/entities/Chat";

export class SendMessage {
  constructor(private chatRepository: ChatRepository) {}

  async execute(message: Chat) {
    await this.chatRepository.setMessage(message);

    return message;
  }
}
