import express, { Express } from "express";
import http, { Server } from "http";
import expressConfig from "./frameworks/webserver/express";
import { startServer } from "./frameworks/webserver/server";
import valkeyConnection, {
  valkey,
} from "./frameworks/database/redis/connection";
import { connection as postgressConnection } from "./frameworks/database/pg/connection";
import routes from "./frameworks/webserver/routes/index";
import errorHandler from "./frameworks/webserver/middlewares/errorHandling";
import { SocketService } from "./frameworks/webserver/socketio/socket";
import { SendMessage } from "./application/use_case/chat/sendMessage";
import { ChatRepositoryImpl } from "./infrastructure/repositories/chatRepositoryImpl";

const app: Express = express();
const server: Server = http.createServer(app);

expressConfig(app);

// Connect to databases
valkeyConnection();
postgressConnection();

// Initialize repositories and use cases
const chatRepository = new ChatRepositoryImpl();
const sendMessageUseCase = new SendMessage(chatRepository);

// Initialize WebSocket service
new SocketService(server, sendMessageUseCase);

// Set up routes
routes(app, express, valkey);

// Apply error handling middleware (should be after routes)
app.use(errorHandler);

// Start server
startServer(server);
