import winston from 'winston';
import { getConfig } from '../config/env';

const config = getConfig();

export const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
});

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
