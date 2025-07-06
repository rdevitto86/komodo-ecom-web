import BaseError from '../base-error';

export enum RuntimeErrors {
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
export type RuntimeErrorCodes = 1000 | 1001 | 1002 | 1003 | 1004 | 1005
  | 1006 | 1007 | 1008 | 1009 | 1010 | 1011 | 1012 | 1013 | 1014;

type ErrorType = 'fatal' | 'error' | 'warn';

type RuntimeErrorOptions = {
  status?: RuntimeErrorCodes,
  details?: string,
  cause?: Error
};

export default class RuntimeError<T extends ErrorType> extends BaseError {
  type: T = 'error' as T;
  status?: RuntimeErrorCodes = 1000;
  details?: string;

  constructor(message: string, code?: string, options?: RuntimeErrorOptions) {
    super(message, code, { name: 'RuntimeError', cause: options?.cause });
    if (options?.status) this.status = options.status;
    if (options?.details) this.details = options.details;
    Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
  }

  // TODO - use logger instance to log errors

  toJSON() { return { ...this }; }
}
