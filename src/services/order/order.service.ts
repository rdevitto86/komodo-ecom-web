import { APIClient } from '../http-client/http.service';

// TODO POST order history, POST submit

const orderApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    // Creates a new order
    createOrder: builder.mutation<Order, CreateOrderPayload>({
      query: (payload) => ({
        url: '/api/orders',
        method: 'POST',
        data: payload,
      }),
      // Invalidate the list of orders to show the new one
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    // Fetches a list of orders for the current user
    getOrders: builder.query<Order[], void>({
      query: () => '/api/orders',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Order' as const, id })),
        { type: 'Order', id: 'LIST' },
      ],
    }),

    // Fetches a single order by its ID
    getOrderById: builder.query<Order, string>({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderByIdQuery } = orderApi;
