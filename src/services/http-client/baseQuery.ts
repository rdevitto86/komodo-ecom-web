import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { buildURL } from '@/utils/url';

// TODO use custom types in model folder
type RequestArgs = {
  url: string;
  method: string;
  data?: any;
  params?: Record<string, any> & RequestParams;
};

type RequestParams = {
  headers?: Record<string, string>;
  pathParams?: Record<string, string>;
  queryParams?: Record<string, string>;
  bearerToken: string;
};

export const baseQuery = (): BaseQueryFn<RequestArgs, unknown, unknown> =>
  async ({ url, method, data, params = {} as RequestParams }) => {
    try {
      // TODO - telemetry logger start
      const fullUrl = buildURL(url, params?.pathParams, params?.queryParams);

      const headers: Record<string, string> = {
        ...(params.headers || {}),
        Authorization: `Bearer ${params.bearerToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const result = await fetch(fullUrl, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });
      const res = await result.json();

      if (!res.ok) throw res;

      return {
        status: result.status,
        data: res,
      };
    } catch (err: any) {
      // TODO - do logging here
      return {
        error: {
          status: 500,
          data: err.message || 'Unknown error',
        },
      };
    } finally {
      // TODO - telemetry logger end
    }
  };
