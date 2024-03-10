import { Sequelize } from "sequelize-typescript";
import logger from '../config/logger';
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306", 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [],
  benchmark: true,
  logging: (sql: string, timingMs?: number) => logger.info(`[Sequelize]: ${sql} - ${timingMs}ms`),
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("[Sequelize]: Connection has been established successfully.");
  } catch (err) {
    logger.error("[Sequelize]: Unable to connect to the database: ", err);
  }
})();

export default sequelize;
