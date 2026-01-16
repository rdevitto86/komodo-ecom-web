import { browser } from "$app/environment";

const LogLevels = Object.freeze({
  DEBUG: 1, 1: 'DEBUG',
  INFO: 2, 2: 'INFO',
  WARN: 3, 3: 'WARN',
  ERROR: 4, 4: 'ERROR',
  PANIC: 5, 5: 'PANIC'
});
type LogWeight = 1 | 2 | 3 | 4 | 5;

export interface LogPayload {
  sourcetype: string;
  app: {
    name: string;
    version: string;
  };
  event: {
    message: string;
    severity: string;
    env: string;
    session_id?: string;
    url: string;
    timestamp: number;
    details?: any;
  };
}

class Logger {
  #level: number
  #enableRemote: boolean = false
  #worker: Worker | null = null;

  constructor() {
    switch (String(import.meta.env.LOG_LEVEL).toLowerCase()) {
      case 'debug':
        this.#level = LogLevels.DEBUG;
        break;
      case 'info':
      case 'verbose':
        this.#level = LogLevels.INFO;
        break;
      case 'warn':
      case 'warning':
        this.#level = LogLevels.WARN;
        break;
      default:
        this.#level = LogLevels.ERROR;
    }

    // start sidecar thread for remote logging
    this.#enableRemote = import.meta.env.ENABLE_REMOTE_LOGGING === 'true';
    if (this.#enableRemote && browser) {
      this.#worker = new Worker(
        new URL('/src/lib/logger/worker.ts', import.meta.url),
        { type: 'module' }
      );

      this.#worker.onmessage = ({ data: { type, payload } }) => {
        switch (type) {
          case 'POLO':
            break;
          case 'REMAINING':
            this.#printConsole(`Remote logging remaining: ${payload as number}`, LogLevels.INFO);
            break;
          case 'ERROR':
            this.#printConsole(`Remote logging error: ${payload as Error}`, LogLevels.ERROR);
            break;
          case 'STOP':
            this.#printConsole(`Remote logging stopped with ${payload as number} logs remaining`, LogLevels.INFO);
            this.#worker = null;
            break;
        }
      };
      
      this.#worker.postMessage({ type: 'MARCO' });
    }
  }

  debug(message: string, code?: string) {
    this.#printConsole(message, LogLevels.DEBUG, code);
    this.#sendRemote(message, LogLevels.DEBUG);
  }
  
  info(message: string, code?: string) {
    this.#printConsole(message, LogLevels.INFO, code);
    this.#sendRemote(message, LogLevels.INFO);
  }
  
  warn(message: string, code?: string, error?: Error) {
    this.#printConsole(message, LogLevels.WARN, code, error);
    this.#sendRemote(message, LogLevels.WARN, { code, error });
  }
  
  error(message: string, code?: string, error?: Error) {
    this.#printConsole(message, LogLevels.ERROR, code, error);
    this.#sendRemote(message, LogLevels.ERROR, { code, error });
  }

  panic(message: string, code?: string, error?: Error) {
    this.#printConsole(message, LogLevels.PANIC, code, error);
    this.#sendRemote(message, LogLevels.PANIC, { code, error });
  }

  #printConsole(msg: string, level: LogWeight, code?: string, error?: Error) {
    if (this.#level >= level) {
      const fmt = `[${LogLevels[level]}] ${msg}`;
      const log = code ? `${fmt} | ${code}` : fmt;

      switch (level) {
        case 1: console.debug(log); break;
        case 2: console.info(log); break;
        case 3: console.warn(log); break;
        case 4:
        case 5: console.error(log, error); break;
        default: console.log(log, error); break;
      }
    }
  }

  #sendRemote(msg: string, level: LogWeight, details?: any) {
    if (!this.#enableRemote || !this.#worker) return;

    this.#worker?.postMessage({ type: 'LOG', payload: {
      sourcetype: '',
      app: {
        name: import.meta.env.APP_NAME,
        version: import.meta.env.VERSION,
      },
      event: {
        message: msg,
        level: level,
        severity: LogLevels[level],
        timestamp: Date.now(),
        env: import.meta.env.ENV,
        url: window.location.href,
        session_id: '',
        details: details,
      },
    } as LogPayload});
  }
}

export const logger = new Logger();
