import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "error" : "info",
  transports: [
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.printf(({ level, message }) => `[${level}]${message}`)
      ),
    }),
  ],
});

export default logger;
