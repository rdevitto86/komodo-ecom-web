import { BaseLog, TraceContext } from '../types.';

export type RuntimeLog = BaseLog & {
  type: 'runtime';
  message: string;
  component?: string;
  operation?: string;
  trace?: TraceContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
    cause?: string;
    details?: Record<string, any>;
  };
  context?: Record<string, any>;
}
