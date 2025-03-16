import express, { Express } from "express";
import http, { Server } from "http";
import expressConfig from "./frameworks/webserver/express";
import { startServer } from "./frameworks/webserver/server";
import redisClient from "./frameworks/database/redis/connection";
import { connection as postgressConnection } from "./frameworks/database/pg/connection";
import routes from "./frameworks/webserver/routes/index";
import errorHandler from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
import { SocketService } from "./frameworks/webserver/socketio/socket";

const app: Express = express();
const server: Server = http.createServer(app);

// Attach Express before initializing Socket.IO
expressConfig(app);

postgressConnection();

// Initialize routes before Socket.IO
routes(app, express, redisClient);

// Start Socket.IO after Express is ready
const socketService = new SocketService(server);

// Start the HTTP server
startServer(server);

app.use(errorHandler);
