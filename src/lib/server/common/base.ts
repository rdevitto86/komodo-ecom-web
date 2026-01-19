import logger from '$lib/logger/logger';
import { isRequestValid } from '$lib/server/utils/http';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const BASE_URL = import.meta.env.API_BASE_URL;

export abstract class BaseAPI {
  protected constructor() {}

  protected async send<T>(method: Method, path: string, body?: any, headers?: any): Promise<T> {
    try {
      const url = `${BASE_URL}${path}`;
      const req: RequestInit = {
        method,
        body: typeof body !== 'string' ? JSON.stringify(body) : body,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
      };
      
      if (!isRequestValid(url, req)) {
        const err = new Error('api validation failed');
        logger.error('api request failed validation', err);
        throw err;
      }
      
      const res = await fetch(url, req);

      if (!res.ok) {
        const err = new Error(res.statusText);
        logger.error(`api request failed with status ${res.status}`, err, res);
        throw err;
      }

      return res.json() as Promise<T>;
    } catch (err) {
      logger.error('api request failed', err as Error);
      throw err;
    }
  }
}
