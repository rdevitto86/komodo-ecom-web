import BaseError from '../base-error';
import { RuntimeErrorCode, RuntimeErrorOptions } from './types';

export * from './types';

export default class RuntimeError<T extends 'FATAL' | 'ERROR'> extends BaseError {
  type: T;
  status?: RuntimeErrorCode = 1000;
  details?: string;

  constructor(message: string, code?: string, options?: RuntimeErrorOptions) {
    super(message, code, { name: 'RuntimeError', cause: options?.cause });
    this.type = (options?.type || 'error') as T;
    if (options?.status) this.status = options.status;
    if (options?.details) this.details = options.details;
    Object.setPrototypeOf(this, new.target.prototype); // redefine instanceof
  }

  printConsole() { console.error(this); }

  toJSON() { return { ...this }; }
}
