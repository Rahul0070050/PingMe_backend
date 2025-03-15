import express, { Express } from "express";
import http, { Server } from "http";
import expressConfig from "./frameworks/webserver/express";
import { startServer } from "./frameworks/webserver/server";
import redisClient from "./frameworks/database/redis/connection";
import { connection as postgressConnection } from "./frameworks/database/pg/connection";
import routes from "./frameworks/webserver/routes/index";
import errorHandler from "./frameworks/webserver/middlewares/errorHandlingMiddleware";

const app: Express = express();
const server: Server = http.createServer(app);

expressConfig(app);

startServer(server);

postgressConnection();

// createRedisClient();

routes(app, express, redisClient);

app.use(errorHandler);
