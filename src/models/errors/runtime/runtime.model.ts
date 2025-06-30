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

type RuntimeErrorOptions<T> = {
  status?: number,
  details?: T,
  cause?: Error
};

export default class RuntimeError<T> extends BaseError {
  status?: number;
  details?: T;

  constructor(message: string, code?: string, options?: RuntimeErrorOptions<T>) {
    super(message, code, { name: 'RuntimeError', cause: options?.cause });
    this.status = options?.status;
    this.details = options?.details;
    Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
  }

  toJSON() { return { ...this }; }
}
