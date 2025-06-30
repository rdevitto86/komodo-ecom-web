import { HttpMethod, HttpResponseType, StatusCode } from '@/models/http/http.model';
import BaseError from '../base-error';

export default class APIError extends BaseError {
  status: StatusCode;
  apiName?: string;
  method?: HttpMethod;
  correlationId?: string;

  constructor(message: string, apiName?: string, req?: HttpResponseType, cause?: Error) {
    super(
      message,
      req?.statusText || 'N/A',
      { name: 'APIError', cause }
    );
    this.status = req?.status || 500;
    this.apiName = apiName;
    this.method = req?.method;
    this.correlationId = req?.headers?.correlationId;
  }

  toJSON() { return { ...this }; }
}
