import { Sequelize } from "sequelize-typescript";
import { createLogger, format, transports } from 'winston';
import { config } from "dotenv";

config();

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.printf(({ level, message }) => `[${level}]${message}`)
      ),
    }),
  ],
});

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

sequelize.authenticate()
    .then(() => logger.info("[Sequelize]: Connection has been established successfully."))
    .catch(err => logger.error("[Sequelize]: Unable to connect to the database: ", err));

export default sequelize;
