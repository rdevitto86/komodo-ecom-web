interface BaseErrorOptions {
  name?: string;
  cause?: unknown;
}

export default abstract class BaseError extends Error {
  override name: string;
  override cause?: unknown;
  code?: string | number;
  timestamp: Date;

  constructor(message: string, code?: string, options?: BaseErrorOptions) {
    super(message, { cause: options?.cause });
    this.name = options?.name || 'BaseError';
    this.code = code;
    this.cause = options?.cause;
    this.timestamp = new Date();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract toJSON(): {
    message: string;
    timestamp: Date;
  };
}
