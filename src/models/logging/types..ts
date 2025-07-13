import { ClickstreamLog } from './analytics/clickstream.model';
import { AuditLog } from './audit/audit.model';
import { MetricsLog } from './observability/metrics.model';
import { RuntimeLog } from './observability/runtime.model';
import { TelemetryLog } from './observability/telemetry.model';

export type ObservabilityLog = RuntimeLog | MetricsLog | TelemetryLog;
export type LogEntry = ObservabilityLog | ClickstreamLog | AuditLog;

export type BaseLog = {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  source?: string;
  sessionId?: string;
  userId?: string;
  environment?: 'development' | 'staging' | 'production';
  version?: string;
};

export type TraceContext = {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  flags?: number;
}

export type LogBatch = {
  batchId: string;
  timestamp: string;
  source: string;
  logs: LogEntry[];
  metadata?: {
    version?: string;
    compressed?: boolean;
    checksum?: string;
    schema?: string;
  };
}

export type LoggingConfig = {
  observability: {
    runtime: { enabled: boolean; level: BaseLog['level'] };
    metrics: { enabled: boolean; samplingRate?: number };
    telemetry: { enabled: boolean; tracing?: boolean };
  };
  analytics: {
    clickstream: { enabled: boolean; sampling?: number };
    business: { enabled: boolean; };
  };
  audit: {
    enabled: boolean;
    sensitiveDataMasking?: boolean;
  };
  destinations: Array<{
    name: string;
    type: 'console' | 'file' | 'http' | 'kafka' | 'kinesis' | 'pubsub';
    logTypes: Array<LogEntry['type']>;
    config: Record<string, any>;
  }>;
  retention?: {
    observability?: string; // e.g., "30d"
    analytics?: string; // e.g., "1y"
    audit?: string; // e.g., "7y"
  };
}
