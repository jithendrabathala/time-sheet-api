import winston from 'winston';
import { NODE_ENV } from '../../config/env';

type TInfo = {
  timestamp: string;
  level: string;
  message: string;
  type?: string;
};

const levelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
} as Record<string, string>;

const typeColors = {
  server: '\x1b[35m', // Magenta
  db: '\x1b[36m', // Cyan
  default: '\x1b[37m', // White
} as Record<string, string>;

const resetColor = '\x1b[0m'; // white

const level: string = ((): string => {
  return NODE_ENV === 'production' ? 'warn' : 'debug';
})();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as Record<string, number>;

const format: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ colors: levelColors, level: true }),
  winston.format.printf((info: winston.Logform.TransformableInfo) => {
    const { timestamp, level, message, type = 'default' } = info as TInfo;

    const typeColor: string = typeColors[type as string] || typeColors.default;

    return `${timestamp} ${level}: ${typeColor}[${type}]${resetColor} ${message}`;
  }),
);

const transports: winston.transport[] = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
];

const logger = winston.createLogger({ level, levels, format, transports });

export default logger;
