import { APIClient } from '../http-client/http.service';
import { OfferingType } from '../../models/offering/types';

// TODO GET offerings, GET Offering Details, GET Offering Categories

const offeringsApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    getOfferings: builder.query<OfferingType[], void>({
      query: () => ({
        url: '/api/offerings',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Offering' as const, id })),
        { type: 'Offering', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetOfferingsQuery } = offeringsApi;
