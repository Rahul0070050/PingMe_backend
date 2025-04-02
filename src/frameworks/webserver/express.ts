import { Express } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

export default function expressConfig(app: Express) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.use(compression());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://ping-me-snowy.vercel.app"], // Ensure this matches frontend
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow cookies & auth headers
    })
  );

  app.use(morgan("combined"));
}
