import { Namespace, Server } from "socket.io";
import { initializeSocket } from "../../../interfaces/controllers/socketController";
import { AuthService } from "../../../domain/services/authService";
import { AuthServiceImpl } from "../../../infrastructure/services/authService";
import { JwtPayload } from "../../../types";

export class SocketService {
  private io: Server;
  private userIo: Namespace;
  private authService = new AuthServiceImpl();

  constructor(server: any) {
    this.io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    this.userIo = this.io.of("/user");
    this.initializeMiddleware();
    initializeSocket(this.io, this.userIo);
  }

  private initializeMiddleware() {
    this.userIo.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth?.token;
        if (!token) {
          return next(new Error("Authentication error: No token provided"));
        }

        // check is user typeof jwt_payload type
        function isJwtPayload(user: any): user is JwtPayload {
          return user && typeof user === "object" && "id" in user;
        }

        const user = await this.authService.verifyJwt(token);
        if (!user) {
          return next(new Error("Authentication error: Invalid token"));
        }
        socket.data.user = user;
        next();
      } catch (error) {
        next(new Error("Authentication failed"));
      }
    });
  }
}
