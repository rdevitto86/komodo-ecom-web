import { APIClient } from '../http-client/http.service';

// TODO: Define a proper type for your CMS or content response
type ContentResponse = {
  pageTitle: string;
  sections: {
    id: string;
    type: 'hero' | 'feature' | 'testimonial';
    content: any;
  }[];
};

const contentApi = APIClient.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query<ContentResponse, void>({
      query: () => ({
        url: '/api/content',
        method: 'GET',
      }),
      providesTags: ['Content'],
    }),
  }),
});

export const { useGetContentQuery } = contentApi;
