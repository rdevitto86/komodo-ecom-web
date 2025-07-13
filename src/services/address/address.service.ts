import { APIClient } from '../http-client/http.service';

// TODO: Define a more specific type for the address validation payload
type ValidateAddressPayload = {
  address: string;
};

// TODO: Define a more specific type for the address validation response
type ValidateAddressResponse = {
  isValid: boolean;
  suggestedAddress?: string;
  // Add other relevant fields from your API response
};

const addressApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    validateAddress: builder.query<ValidateAddressResponse, ValidateAddressPayload>({
      query: (payload) => ({
        url: '/api/validate-address',
        method: 'POST',
        data: payload,
      }),
      providesTags: ['Address'],
    }),
  }),
});

export const { useValidateAddressQuery } = addressApi;
