import { APIClient } from '../http-client/http.service';

// TODO POST User, POST/PATCH User Profile

const userApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<UserProfile, UpdateUserProfilePayload>({
      query: (payload) => ({
        url: '/api/user/profile',
        method: 'PATCH', // Using PATCH for partial updates is conventional
        data: payload,
      }),
      // After a successful update, invalidate the 'User' tag to trigger a refetch
      // of any queries that provide that tag (e.g., getUserProfile).
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserProfileMutation } = userApi;
