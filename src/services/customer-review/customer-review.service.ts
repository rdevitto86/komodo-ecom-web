import { APIClient } from '../http-client/http.service';
import { CustomerReviewType } from '@/models/customer-review/types';

const reviewApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    // Fetches all reviews for a specific offering
    getReviewsForOffering: builder.query<CustomerReviewType[], string>({
      query: (offeringId) => `/api/offerings/${offeringId}/reviews`,
      providesTags: (result, error, offeringId) => [
        { type: 'Review', id: `LIST-${offeringId}` },
      ],
    }),

    // Creates a new review for an offering
    createReview: builder.mutation<CustomerReviewType, CreateReviewPayload>({
      query: (payload) => ({
        url: `/api/offerings/${payload.offeringId}/reviews`,
        method: 'POST',
        data: payload,
      }),
      // After creating a review, invalidate the list for that specific offering
      invalidatesTags: (result, error, { offeringId }) => [{ type: 'Review', id: `LIST-${offeringId}` }],
    }),
  }),
});

export const { useGetReviewsForOfferingQuery, useCreateReviewMutation } = reviewApi;
