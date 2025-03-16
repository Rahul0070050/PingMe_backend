import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { ChatRepositoryImpl } from "../../../infrastructure/repositories/chatRepositoryImpl";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const chatRepository = new ChatRepositoryImpl();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;
    const chat = await chatRepository.saveMessage({
      id: Date.now().toString(),
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    io.to(receiverId).emit("receiveMessage", chat);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { server };
