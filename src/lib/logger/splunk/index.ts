import type { LoggerLevel } from '../runtime';
import { LoggingAdapter } from '../common/adapter';

interface SplunkPayload {
  sourcetype: string;
  app: {
    name: string;
    version: string;
  };
  event: {
    message: string;
    severity: LoggerLevel;
    env: string;
    sessionId?: string;
    url: string;
    timestamp: number;
    details?: any;
  };
}

export class SplunkLogger extends LoggingAdapter {
  #sourcetype = import.meta.env.SPLUNK_SOURCETYPE || `webapp:frontend:log:${import.meta.env.ENV || 'unknown'}`;
  #app = { name: import.meta.env.APP_NAME, version: import.meta.env.VERSION };

  constructor() {
    super({ 
      provider: 'splunk', 
      limit: 10, 
      interval: 5000,
      endpoint: '/api/logging/splunk'
    });
  }

  message(payload: SplunkPayload): void {
    this.send({ sourcetype: this.#sourcetype, app: this.#app, event: payload });
  }
}
