import { config } from "../../../config/config";
import { CONFIG } from "../../../types/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.pg.uri, {
  dialect: "postgres",
  logging: false,
});

export async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default sequelize;
