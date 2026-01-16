const ENV = import.meta.env.ENV;
const app = Object.freeze({
  name: import.meta.env.APP_NAME,
  version: import.meta.env.VERSION
});
const SOURCETYPE = import.meta.env.SPLUNK_SOURCETYPE || `webapp:frontend:log:${ENV}`;

class Logger {
  #level: LoggerLevel;
  #enableRemote: boolean = false
  #worker: Worker | null = null;

  constructor() {
    switch (String(import.meta.env.LOG_LEVEL).toLowerCase()) {
      case 'debug':
        this.#level = 'DEBUG';
        break;
      case 'info':
      case 'verbose':
        this.#level = 'INFO';
        break;
      case 'warn':
      case 'warning':
        this.#level = 'WARN';
        break;
      default:
        this.#level = 'ERROR';
    }

    this.#enableRemote = import.meta.env.ENABLE_REMOTE_LOGGING === 'true';
    this.#initWorker();
  }

  // TODO might comnsider an array of args for details

  debug(message: string, details?: any) {
    this.#printConsole(message, 'DEBUG');
    this.traceSplunk(message, 'DEBUG', details);
  }
  
  info(message: string, details?: any) {
    this.#printConsole(message, 'INFO');
    this.traceSplunk(message, 'INFO', details);
  }
  
  warn(message: string, details?: any) {
    this.#printConsole(message, 'WARN');
    this.traceSplunk(message, 'WARN', details);
  }
  
  error(message: string, error?: Error, details?: any) {
    this.#printConsole(message, 'ERROR', { ...details, error });
    this.traceSplunk(message, 'ERROR', { ...details, error });
  }

  panic(message: string, error?: Error, details?: any) {
    this.#printConsole(message, 'PANIC', { ...details, error });
    this.traceSplunk(message, 'PANIC', { ...details, error });
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
            this.#printConsole('Remote logging healthy', 'INFO');
            break;
          case 'REMAINING':
            this.#printConsole(`Remote logging remaining: ${data as number}`, 'INFO');
            break;
          case 'ERROR':
            this.#printConsole(`Remote logging error`, 'ERROR', data as Error);
            break;
          case 'STOP':
            this.#printConsole(`Remote logging stopped with ${data as number} logs remaining`, 'INFO');
            // TODO - store logs in localStorage
            this.#worker = null;
            break;
        }
      };
      
      this.#worker.postMessage({ type: 'MARCO' });
    } else {
      this.#printConsole(`skipping remote logging`, 'WARN');
    }
  }

  #printConsole(msg: string, level: LoggerLevel, details?: any) {
    if (LoggerLevelWeight[level] >= LoggerLevelWeight[this.#level]) {
      const log = `[${level}] ${msg}`;

      switch (level) {
        case 'DEBUG': console.debug(log, details); break;
        case 'INFO': console.info(log, details); break;
        case 'WARN': console.warn(log, details); break;
        case 'ERROR':
        case 'PANIC': console.error(log, details); break;
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

export const logger = new Logger();
