import BaseError from '../base-error';

type APIErrorParams = {
  code: string;
  apiName?: string;
  correlationId?: string;
  cause?: Error;
}

export default class APIError extends BaseError {
  statusCode: number;
  apiName?: string;
  correlationId?: string;

  constructor(message: string, statusCode: number, options: APIErrorParams) {
    super(message, options?.code, { name: 'APIError', cause: options?.cause });
    this.statusCode = statusCode || 500;
    this.apiName = options?.apiName;
    this.correlationId = options?.correlationId;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      apiName: this.apiName,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      cause: this.cause,
    }
  }
}
