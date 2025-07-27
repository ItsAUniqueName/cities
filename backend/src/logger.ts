import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(info => {
    if (info.stack) {
      return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}\n${info.stack}`;
    }
    return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`;
  })
);


export const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'combined.log')
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs', 'exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs', 'rejections.log') })
  ]
});