import BaseError from '../base-error';

type RuntimeErrorOptions<T> = {
  statusCode?: number,
  details?: T,
  cause?: Error
};

export default class RuntimeError<T> extends BaseError {
  statusCode?: number;
  details?: T;

  constructor(message: string, code: string, options: RuntimeErrorOptions<T>) {
    super(message, code, { name: 'RuntimeError', cause: options?.cause });
    this.statusCode = options?.statusCode;
    this.details = options?.details;
    Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      cause: this.cause,
    }
  }
}
