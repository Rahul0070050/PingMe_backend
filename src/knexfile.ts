import dotenv from "dotenv";
dotenv.config();
import { config } from "./config/config";

export default {
  development: {
    client: "pg",
    connection: {
      connectionString: config.pg.uri,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
