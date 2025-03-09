import { Server } from "http";
import { config } from "../../config/config";

export const startServer = (server: Server) => {
  server.listen(config.port, () => {
    console.log("server running on PORT: ", config.port);
  });
};
