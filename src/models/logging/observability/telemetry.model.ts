import { BaseLog, TraceContext } from '../logging.model';

export interface TelemetrySpan {
  spanId: string;
  traceId?: string;
  parentSpanId?: string;
  operationName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  tags?: Record<string, string>;
  logs?: Array<{
    timestamp: string;
    fields: Record<string, any>;
  }>;
}

export interface TelemetryLog extends BaseLog {
  type: 'telemetry';
  eventType: 'system' | 'performance' | 'api_call' | 'database' | 'cache' | 'network' | 'service';
  eventName: string;
  duration?: number;
  status?: 'success' | 'error' | 'timeout' | 'cancelled';
  trace?: TraceContext;
  resource?: {
    type: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'api' | 'service';
    name: string;
    id?: string;
  };
  performance?: {
    responseTime?: number;
    throughput?: number;
    errorRate?: number;
    availability?: number;
  };
  system?: {
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    networkLatency?: number;
  };
  request?: {
    method?: string;
    url?: string;
    statusCode?: number;
    requestSize?: number;
    responseSize?: number;
    userAgent?: string;
    ip?: string;
  };
  attributes?: Record<string, any>;
}
