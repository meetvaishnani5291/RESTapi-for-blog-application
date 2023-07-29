import winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';

// Setup the Winston logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(), 
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
    winston.format.printf(({ timestamp, message, }) => {
      return `[${timestamp}] message: ${message}`;
    }),
  ),
  transports: [
    // DailyRotateFile transport for error logs
    new winstonDailyRotateFile({
      level: 'error',
      filename: 'logs/error/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    // DailyRotateFile transport for info logs
    new winstonDailyRotateFile({
      level: 'info',
      filename: 'logs/info/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default logger;
