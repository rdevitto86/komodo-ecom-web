import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

// Type Definitions
import { LoginPayload } from '../authorization/authorization.service';

export const APIClient = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginPayload>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    validateAddress: builder.query<any, { address: string }>({
      query: ({ address }) => ({
        url: '/api/validate-address',
        method: 'POST',
        data: { address },
      }),
    }),
    getContent: builder.query<any, void>({
      query: () => ({
        url: '/api/content',
        method: 'GET',
      }),
    }),
    logEvent: builder.mutation<any, { eventType: string; payload: any }>({
      query: (event) => ({
        url: '/api/logging',
        method: 'POST',
        data: event,
      }),
    }),
    sendMetrics: builder.mutation<any, { metricName: string; value: number }>({
      query: (metric) => ({
        url: '/api/metrics',
        method: 'POST',
        data: metric,
      }),
    }),
    getOfferings: builder.query<any, void>({
      query: () => ({
        url: '/api/offerings',
        method: 'GET',
      }),
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: '/api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useValidateAddressQuery,
  useGetContentQuery,
  useLogEventMutation,
  useSendMetricsMutation,
  useGetOfferingsQuery,
  useGetUserProfileQuery,
} = APIClient;
