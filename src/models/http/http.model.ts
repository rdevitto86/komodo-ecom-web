import {
  HttpBody,
  HttpHeaders,
  HttpMethod,
  HttpPathParams,
  HttpQueryParams,
  HttpRequestType,
  HttpResponseType,
  StatusCode,
  StatusText
} from './types';

export * from './types';

export class HttpRequest implements HttpRequestType {
  method: HttpMethod;
  body?: HttpBody;
  path?: HttpPathParams;
  query?: HttpQueryParams;
  // logger?: LoggerInstance | null;

  constructor(req: HttpRequestType) {
    this.url = req.url;
    this.method = req.method as HttpMethod;
    this.headers = req.headers as HttpHeaders & HeadersInit;
    this.body = req.body;
    this.path = req.path;
    this.query = req.query;
    // this.logger = req.logger;
  }

  get url() { return this.url; }
  get headers() { return this.headers; }

  set url(url: string) {
    this.url = url;
  }

  set headers(headers: HttpHeaders & HeadersInit) {
    this.headers = headers;
  }

  // setLogger(logger: LoggerInstance | null) {
  //   this.logger = logger;
  // }
}

export class HttpResponse implements HttpResponseType {
  status: StatusCode;
  statusText: StatusText;
  body: object;
  method?: HttpMethod;
  // logger?: LoggerInstance | null;

  constructor(res: HttpResponseType) {
    this.status = res.status;
    this.statusText = res.statusText as StatusText;
    this.headers = res.headers as HttpHeaders & HeadersInit;
    this.body = res.body as object;
    this.method = res.method;
    // this.logger = res.logger;
  }

  get headers() { return this.headers; }


  set headers(headers: HttpHeaders & HeadersInit) {
    this.headers = headers;
  }

  // setLogger(logger: LoggerInstance | null) {
  //   this.logger = logger;
  // }
}
