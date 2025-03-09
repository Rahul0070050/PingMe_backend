import express, { Express } from "express";
import http, { Server } from "http";
import redis from "redis";
import expressConfig from "./frameworks/webserver/express";
import { config } from "./config/config";
// import routes from "./frameworks/webserver/routes";
// import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
// import redisConnection from "./frameworks/database/redis/connection";
import { startServer } from "./frameworks/webserver/server";
import pgConnection from "./frameworks/database/pg/connection";

const app: Express = express();
const server: Server = http.createServer(app);

expressConfig(app);

startServer(server);

pgConnection(config).connectToPG();
