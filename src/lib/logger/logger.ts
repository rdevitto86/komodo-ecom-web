const ENV = import.meta.env.ENV;
const app = Object.freeze({ name: import.meta.env.APP_NAME, version: import.meta.env.VERSION });
const SOURCETYPE = import.meta.env.SPLUNK_SOURCETYPE || `webapp:frontend:log:${ENV}`;

enum LoggerLevelWeight {
  off = 0, debug = 1, info = 2, warn = 3, error = 4, panic = 5
}

class Logger {
  #level: LoggerLevel;
  #enableRemote: boolean = false
  #worker: Worker | null = null;

  constructor() {
    switch (String(import.meta.env.LOG_LEVEL).toLowerCase()) {
      case 'debug':
        this.#level = 'debug';
        break;
      case 'info':
      case 'verbose':
        this.#level = 'info';
        break;
      case 'warn':
      case 'warning':
        this.#level = 'warn';
        break;
      default:
        this.#level = 'error';
    }

    this.#enableRemote = import.meta.env.ENABLE_REMOTE_LOGGING === 'true';
    this.#initWorker();
  }

  // TODO might comnsider an array of args for details

  debug(message: string, details?: any) {
    this.#printConsole(message, 'debug');
    this.traceSplunk(message, 'debug', details);
  }
  
  info(message: string, details?: any) {
    this.#printConsole(message, 'info');
    this.traceSplunk(message, 'info', details);
  }
  
  warn(message: string, details?: any) {
    this.#printConsole(message, 'warn');
    this.traceSplunk(message, 'warn', details);
  }
  
  error(message: string, error?: Error, details?: any) {
    this.#printConsole(message, 'error', { ...details, error });
    this.traceSplunk(message, 'error', { ...details, error });
  }

  panic(message: string, error?: Error, details?: any) {
    this.#printConsole(message, 'panic', { ...details, error });
    this.traceSplunk(message, 'panic', { ...details, error });
  }

  stop() {
    this.#worker?.postMessage({ type: 'STOP' });
    this.#worker = null;
  }

  traceSplunk(message: string, level: LoggerLevel, details?: any) {
    if (!this.#enableRemote) return;    
    this.#sendRemote('splunk', {
      sourcetype: SOURCETYPE,
      app,
      event: {
        message,
        severity: level,
        env: ENV,
        sessionId: details?.sessionId || '',
        url: location.href,
        timestamp: Date.now(),
        details,
      }
    })
  }

  traceOtel(event: OtelPayload) { 
    if (!this.#enableRemote) return;
    this.#sendRemote('otel', event);
  }

  traceClickstream(event: ClickstreamPayload) { 
    if (!this.#enableRemote) return;
    this.#sendRemote('clickstream', event); 
  }

  #initWorker() {
    if (this.#enableRemote) {
      this.#worker = new Worker(
        new URL('/src/lib/logger/worker.ts', import.meta.url),
        { type: 'module' }
      );

      this.#worker.onmessage = ({ data: { type, payload } }) => {
        const { data } = payload as { provider: ProviderType, data: any } || {};

        switch (type) {
          case 'POLO':
            this.#printConsole('Remote logging healthy', 'info');
            break;
          case 'REMAINING':
            this.#printConsole(`Remote logging remaining: ${data as number}`, 'info');
            break;
          case 'ERROR':
            this.#printConsole(`Remote logging error`, 'error', data as Error);
            break;
          case 'STOP':
            this.#printConsole(`Remote logging stopped with ${data as number} logs remaining`, 'info');
            // TODO - store logs in localStorage
            this.#worker = null;
            break;
        }
      };
      
      this.#worker.postMessage({ type: 'MARCO' });
    } else {
      this.#printConsole(`skipping remote logging`, 'warn');
    }
  }

  #printConsole(msg: string, level: LoggerLevel, details?: any) {
    if (LoggerLevelWeight[level] >= LoggerLevelWeight[this.#level]) {
      const log = `[${level}] ${msg}`;

      switch (level) {
        case 'debug': console.debug(log, details); break;
        case 'info': console.info(log, details); break;
        case 'warn': console.warn(log, details); break;
        case 'error':
        case 'panic': console.error(log, details); break;
        default: console.log(log, details); break;
      }
    }
  }

  #sendRemote(provider: ProviderType, event: SplunkPayload | OtelPayload | ClickstreamPayload) {
    if (!this.#enableRemote) return;
    if (!this.#worker) this.#initWorker();
    this.#worker?.postMessage({ type: 'LOG', payload: { provider, data: event } });
  }
}

const logger = new Logger();
export default logger;
