export enum RuntimeErrorTypes {
  UnknownError = 1000,
  NetworkFailure = 1001,
  Timeout = 1002,
  Unauthorized = 1003,
  Forbidden = 1004,
  NotFound = 1005,
  InvalidInput = 1006,
  DataCorruption = 1007,
  ServiceUnavailable = 1008,
  InternalServerError = 1009,
  DependencyFailure = 1010,
  SessionExpired = 1011,
  InvalidToken = 1012,
  RateLimited = 1013,
  Conflict = 1014,
}
export type RuntimeErrorCode = 1000 | 1001 | 1002 | 1003 | 1004 | 1005
  | 1006 | 1007 | 1008 | 1009 | 1010 | 1011 | 1012 | 1013 | 1014;

export type RuntimeErrorOptions = {
  type?: 'FATAL' | 'ERROR',
  status?: RuntimeErrorCode,
  details?: string,
  cause?: Error
};
