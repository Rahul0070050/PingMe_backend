import { Namespace, Server } from "socket.io";
import { SendMessage } from "../../application/use_case/chat/sendMessage";
import { ChatRepositoryImpl } from "../../infrastructure/repositories/chatRepositoryImpl";
import { valkey } from "../../frameworks/database/redis/connection";
import { UserRepositoryImpl } from "../../infrastructure/repositories/userRpositoriesImpl";
import { JwtPayload } from "../../types";

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
  const chatRepository = new ChatRepositoryImpl(valkey);
  const userRepository = new UserRepositoryImpl();

  const sendMessageUseCase = new SendMessage(chatRepository);

  userIo.on("connection", (socket) => {
    const user: JwtPayload = socket.data.user;
    // console.log(`User connected: ${socket.id}`);
    // console.log(`User `, user.username);

    socket.broadcast.emit("set-user-status", {
      id: user.id,
      userClientId: socket.id,
      lastSeen: "",
    });

    chatRepository.setSocketClientId(user.id, socket.id);

    socket.on("get-client-info", async (data, cb) => {
      const { selectedUserId } = data;

      const messages = await chatRepository.getMessages(
        user.id,
        selectedUserId,
        0
      );

      const userClientId = await chatRepository.getSocketClientId(
        selectedUserId
      );

      socket.broadcast.emit("user-read-messages", { selectedUserId });

      if (userClientId) {
        cb({ isOnline: true, userClientId, messages });
        return;
      } else {
        const lastSeen = await userRepository.getUserLastSeen(selectedUserId);
        cb({ isOnline: false, lastSeen, messages });
        return;
      }
    });

    socket.on("get-older-messages", async (data) => {
      const { selectedUserId, limit: offset } = data;

      const messages = await chatRepository.getMessages(
        user.id,
        selectedUserId,
        offset
      );
      socket.emit("get-older-messages", messages);
    });

    socket.on("send-message", async (data) => {
      const { message, receiverId, date, id } = data;
      const userClientId = await chatRepository.getSocketClientId(receiverId);

      if (!userClientId) {
        chatRepository.setMessageCache({
          message,
          receiverId,
          senderId: user.id,
          timestamp: date,
        });
        socket.emit("get-seen-messages", { id, seen: false });
      }
      chatRepository.setMessage({
        message,
        receiverId,
        senderId: user.id,
        timestamp: date,
        seen: false,
      });

      socket.to(userClientId).emit("get-each-message", {
        id,
        message,
        date,
        receiverId,
      });
    });

    socket.on("set-seen-messages", async (data) => {
      const { id, userId } = data;
      const userClientId = await chatRepository.getSocketClientId(userId);
      if (userClientId) {
        chatRepository.updateMessage(id);
        socket.to(userClientId).emit("get-seen-messages", { id, seen: true });
      }
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("set-user-status", {
        id: user.id,
        userClientId: "",
        lastSeen: new Date().toLocaleTimeString(),
      });
      userRepository.setUserLastSeen(user.id);
      chatRepository.deleteSocketClientId(user.id);
    });
  });
}
