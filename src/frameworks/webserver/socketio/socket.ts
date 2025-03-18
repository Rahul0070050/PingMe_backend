import { Namespace, Server } from "socket.io";
import { SendMessage } from "../../../application/use_case/chat/sendMessage";
import { saveMessageToCache } from "../../../infrastructure/cache/chatCache";
import { AuthServiceImpl } from "../../../infrastructure/services/authService"; // 👈 Import Token Verification

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
export class SocketService {
  private io: Server;
  private sendMessageUseCase: SendMessage;
  private userIo: Namespace;
  private authService: AuthServiceImpl;

  constructor(server: any, sendMessageUseCase: SendMessage) {
    this.io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    this.userIo = this.io.of("/user");
    this.sendMessageUseCase = sendMessageUseCase;

    this.authService = new AuthServiceImpl();
    this.initializeMiddleware();
    this.initializeSocket();
  }

  private initializeMiddleware() {
    this.userIo.use(async (socket, next) => {
      try {
        // const token = socket.handshake.auth?.token;
        // if (!token) {
        //   return next(new Error("Authentication error: No token provided"));
        // }

        // const user = await this.authService.verifyJwt(token);
        // if (!user) {
        //   return next(new Error("Authentication error: Invalid token"));
        // }

        // socket.data.user = user;
        // socket.join(user.id);
        next();
      } catch (error) {
        next(new Error("Authentication failed"));
      }
    });
  }

  private initializeSocket() {
    console.log("socketio init");

    this.userIo.on("connection", (socket) => {
      // const user = socket.data.user;
      // console.log(`User connected: ${user.id}`);
      console.log(`Socketio connected`);
      this.userIo.emit("get-messages", messages);
      socket.on("send-message", async (data) => {
        const { receiverId, message } = data;
        console.log(message);

        // const senderId = user.id;

        // const chat = await this.sendMessageUseCase.execute(
        //   senderId,
        //   receiverId,
        //   message
        // );
        // await saveMessageToCache(receiverId, message);

        // this.userIo.to(receiverId).emit("receive-message", chat);
      });

      socket.on("disconnect", () => {
        // console.log(`User disconnected: ${user.id}`);
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}
