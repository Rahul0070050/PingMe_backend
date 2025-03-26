import { Namespace, Server } from "socket.io";
import { SendMessage } from "../../application/use_case/chat/sendMessage";
import { Chat } from "../../domain/entities/Chat";
import { ChatRepositoryImpl } from "../../infrastructure/repositories/chatRepositoryImpl";
import { CacheService } from "../../infrastructure/services/casheService";
import { valkey } from "../../frameworks/database/redis/connection";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRpositoriesImpl";

interface MessageData {
  message: string;
  sender: number;
  date: string;
}

const messages: MessageData[] = [
  {
    message: "That sounds awesome! Are you using WebRTC for the video calls?",
    sender: 2,
    date: "2025-03-06T10:05:00Z",
  },
  {
    message:
      "Yeah, WebRTC for real-time communication and getstream.io for chat features.",
    sender: 1,
    date: "2025-03-06T10:06:00Z",
  },
  {
    message:
      "That's a solid tech stack! Are you handling authentication yourself?",
    sender: 2,
    date: "2025-03-06T10:07:00Z",
  },
  {
    message:
      "Nope, I'm using Clerk for authentication. It simplifies things a lot!",
    sender: 1,
    date: "2025-03-06T10:08:00Z",
  },
  {
    message: "Clerk is great! Are you planning to add any extra features?",
    sender: 2,
    date: "2025-03-06T10:09:00Z",
  },
  {
    message: "Yeah, I want to add meeting scheduling and recording features.",
    sender: 1,
    date: "2025-03-06T10:10:00Z",
  },
  {
    message:
      "That would make it super useful! Let me know if you need a tester. 😃",
    sender: 2,
    date: "2025-03-06T10:11:00Z",
  },
  {
    message:
      "Thanks! I'll definitely reach out once I have a beta version ready.",
    sender: 1,
    date: "2025-03-06T10:12:00Z",
  },
  {
    message:
      "That's a solid tech stack! Are you handling authentication yourself?",
    sender: 2,
    date: "2025-03-06T10:07:00Z",
  },
  {
    message:
      "Nope, I'm using Clerk for authentication. It simplifies things a lot!",
    sender: 1,
    date: "2025-03-06T10:08:00Z",
  },
  {
    message: "Clerk is great! Are you planning to add any extra features?",
    sender: 2,
    date: "2025-03-06T10:09:00Z",
  },
  {
    message: "Yeah, I want to add meeting scheduling and recording features.",
    sender: 1,
    date: "2025-03-06T10:10:00Z",
  },
  {
    message:
      "That would make it super useful! Let me know if you need a tester. 😃",
    sender: 2,
    date: "2025-03-06T10:11:00Z",
  },
  {
    message:
      "Thanks! I'll definitely reach out once I have a beta version ready.",
    sender: 1,
    date: "2025-03-06T10:12:00Z",
  },
];

export function initializeSocket(io: Server, userIo: Namespace) {
  const messageRepository = new ChatRepositoryImpl(valkey);
  const userRepository = new UserRepositoryImpl();
  const sendMessageUseCase = new SendMessage(messageRepository);
  const cacheService = new CacheService(valkey);

  console.log("socketio init");

  userIo.on("connection", (socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${socket.id}`);
    console.log(`user `, user);
    // socket.emit("get-messages", messages);
    socket.on("send-message", async (data) => {
      const { receiverId, message } = data;
      console.log(data);

      // const chatMessage = new Chat(
      //   data.id,
      //   data.senderId,
      //   data.receiverId,
      //   data.content,
      //   new Date()
      // );
      // await sendMessageUseCase.execute(message);
      // io.to(data.receiverId).emit("receive_message", message);
    });

    socket.on("disconnect", () => {
      // console.log(`User disconnected: ${user.id}`);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
