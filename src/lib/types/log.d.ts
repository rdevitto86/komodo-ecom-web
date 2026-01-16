type LoggerLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'PANIC';
type ProviderType = 'splunk' | 'otel' | 'clickstream';

enum LoggerLevelWeight {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  PANIC = 5
}

interface SplunkPayload {
  sourcetype: string;
  app: {
    name: string;
    version: string;
  };
  event: {
    message: string;
    severity: LogLevel;
    env: string;
    sessionId?: string;
    url: string;
    timestamp: number;
    details?: any;
  };
}

interface OtelPayload {
  name: string;
  attributes: {
    component?: string;
    traceId?: string;
    spanId?: string;
    duration?: number;
    memoryUsage?: number;
    [key: string]: any;
  }
}

interface ClickstreamPayload {
  action: 'click' | 'hover' | 'scroll' | 'submit' | 'input';
  target: {
    id?: string;
    label?: string;
    text?: string;
    path?: string;
    aria?: string;
    [key: string]: any;
  };
  meta: {
    screenResolution?: string;
    viewport?: string;
    userLanguage?: string;
    theme?: 'light' | 'dark';
    timezone?: string;
    os?: string;
    osVersion?: string;
    browser?: string;
    browserVersion?: string;
    [key: string]: any;
  };
}