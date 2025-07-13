import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const APIClient = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery(),
  // Define tags for cache invalidation and refetching.
  tagTypes: ['User', 'Offering', 'Content', 'Address', 'Order', 'Review'],
  endpoints: () => ({}), // endpoints are defined and injected in other files to keep this file clean
});
