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

const app: Express = express();
const server: Server = http.createServer(app);

expressConfig(app);

valkeyConnection();
postgressConnection();

new SocketService(server);

routes(app, express, valkey);

app.use(errorHandler);

startServer(server);
