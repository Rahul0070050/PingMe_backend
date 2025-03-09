import Knex from "knex";
import { CONFIG } from "../../../types/config";
export default function connection(config: CONFIG) {
  function connectToPG() {
    const knex = Knex({
      client: "pg",
      connection: {
        host: config.pg.uri,
        user: config.pg.user,
        password: config.pg.password,
        database: config.pg.database,
      },
    });
    console.log(config.pg.password);

    knex
      .raw("SELECT 1")
      .then(() => {
        console.log("PostgreSQL connected");
      })
      .catch((e) => {
        console.log("PostgreSQL not connected");
        console.error(e);
      });
  }

  return {
    connectToPG,
  };
}
