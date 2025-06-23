export type StatusCode = 200 | 201 | 202 | 204 | 301 | 302 | 400 | 401 | 403 | 404 | 409 | 500
export type StatusText = 'OK' | 'Created' | 'Accepted' | 'No Content' | 'Moved Permanently' | 'Found' |
  'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Conflict' | 'Internal Server Error';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HeaderContentTypes = 'application/json';
export type BearerToken = `Bearer ${string}`;

export enum HttpStatuses {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500
}

export interface HttpHeaders {
  [key: string]: string | undefined;
  Authorization?: BearerToken;
  'Content-Type': HeaderContentTypes;
  'api-version'?: string;
  correlationId?: string;
  requestId?: string;
}

export interface HttpPathParams {
  [key: string]: string | number;
}

export interface HttpQueryParams {
  [key: string]: string | number | boolean;
}

export type HttpBody<T = any> = T;

// HTTP Request
export interface HttpRequestType extends RequestInit {
  url: string;
  method?: HttpMethod;
  headers?: HttpHeaders & HeadersInit;
  body?: HttpBody;
  path?: HttpPathParams;
  query?: HttpQueryParams;
  // logger?: LoggerInstance | null;
}

export class HttpRequest implements HttpRequestType {
  url!: string;
  method?: HttpMethod;
  headers!: HttpHeaders & HeadersInit;
  body?: HttpBody;
  path?: HttpPathParams;
  query?: HttpQueryParams;
  // logger?: LoggerInstance | null;

  constructor(req: HttpRequestType) {
    Object.assign(this, req);
  }
}

// HTTP Response
export interface HttpResponseType<T = any> extends ResponseInit {
  status: StatusCode;
  statusText?: StatusText;
  method?: HttpMethod;
  headers?: HttpHeaders & HeadersInit;
  body?: T
  // logger?: LoggerInstance | null;
}

export class HttpResponse<T = any> implements HttpResponseType<T> {
  status!: StatusCode;
  statusText!: StatusText;
  headers!: HttpHeaders & HeadersInit;
  body!: T;
  method?: HttpMethod;
  // logger?: LoggerInstance | null;

  constructor(res: HttpResponseType) {
    Object.assign(this, res);
  }
}
