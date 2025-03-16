import { Request, Response } from "express";
import { SendMessage } from "../../application/use_case/chat/sendMessage";
import { ChatRepositoryImpl } from "../../infrastructure/repositories/chatRepositoryImpl";

const chatRepository = new ChatRepositoryImpl();
const sendMessageUseCase = new SendMessage(chatRepository);

export const sendMessageController = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const chat = await sendMessageUseCase.execute(
      senderId,
      receiverId,
      message
    );
    res.status(201).json(chat);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
