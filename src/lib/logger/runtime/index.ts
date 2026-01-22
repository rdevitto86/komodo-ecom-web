import { LoggingAdapter } from '../common/adapter';

export type LoggerLevel = 'off' | 'debug' | 'info' | 'warn' | 'error' | 'panic';

const LoggerLevelWeight = { 
  off: 0, debug: 1, info: 2, warn: 3, error: 4, panic: 5 
};

type LoggerConfig = {
  level?: LoggerLevel;
  remoteLogger?: LoggingAdapter;
}

let levelWeight: number = (() => {
  const level = String(import.meta.env.LOG_LEVEL || 'error').toLowerCase() as LoggerLevel;
  return LoggerLevelWeight[level] ?? LoggerLevelWeight.error;
})();

let remoteLogger: LoggingAdapter | null = null;

const logger = {
  init(config: LoggerConfig) {
    if (config.level) levelWeight = LoggerLevelWeight[config.level];
    if (config.remoteLogger) remoteLogger = config.remoteLogger;
  },

  debug(message: string, ...args: any[]) {
    if (levelWeight >= LoggerLevelWeight.debug) {
      console.debug(message, ...args);
    }
  },

  trace(message: string, ...args: any[]) {
    if (levelWeight >= LoggerLevelWeight.debug) {
      console.trace(message, ...args);
    }
  },
  
  info(message: string, ...args: any[]) {
    if (levelWeight >= LoggerLevelWeight.info) {
      console.info(message, ...args);
      if (remoteLogger) {
        remoteLogger.send({ level: 'info', message });
      }
    }
  },
  
  warn(message: string, ...args: any[]) {
    if (levelWeight >= LoggerLevelWeight.warn) {
      console.warn(message, ...args);
      if (remoteLogger) {
        remoteLogger.send({ level: 'warn', message });
      }
    }
  },
  
  error(message: string, context?: Error | object) {
    if (levelWeight >= LoggerLevelWeight.error) {
      console.error(message, context);
      if (remoteLogger) {
        remoteLogger.send({ level: 'error', message, context });
      }
    }
  },

  panic(message: string, context?: Error | object) {
    if (levelWeight >= LoggerLevelWeight.panic) {
      console.error(message, context);
      if (remoteLogger) {
        remoteLogger.send({ level: 'panic', message, context });
      }
    }
  },

  log(message: string, ...args: any[]) {
    console.log(message, ...args);
  }
};

export default logger;
