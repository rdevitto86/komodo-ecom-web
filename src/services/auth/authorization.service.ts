import { APIClient } from '../http-client/http.service';

// TODO
type UserProfile = {
  id: string;
  username: string;
  email: string;
};

const authApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseBody, LoginPayload>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/api/user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery } = authApi;
