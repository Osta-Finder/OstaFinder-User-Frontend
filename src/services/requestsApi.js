import { apiSlice } from './apiSlice';

const STATUS_TO_API = {
  pending: 'معلقة',
  accepted: 'مقبولة',
  in_progress: 'قيد التنفيذ',
  completed: 'مكتملة',
  rejected: 'مرفوضة',
  cancelled: 'ملغية',
};

export const requestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestStats: builder.query({
      query: () => '/requests/stats',
      providesTags: ['RequestStats'],
    }),
    getRequests: builder.query({
      query: (status) => {
        const params = status ? `?status=${encodeURIComponent(STATUS_TO_API[status] || status)}` : '';
        return `/requests${params}`;
      },
      providesTags: ['Requests'],
    }),
    cancelRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Requests', 'RequestStats'],
    }),
    getRating: builder.query({
      query: (requestId) => `/requests/${requestId}/rating`,
      providesTags: (result, error, requestId) => [{ type: 'Rating', id: requestId }],
    }),
    createRating: builder.mutation({
      query: ({ requestId, ...body }) => ({
        url: `/requests/${requestId}/rating`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { requestId }) => ['Requests', { type: 'Rating', id: requestId }],
    }),
    updateRating: builder.mutation({
      query: ({ requestId, ...body }) => ({
        url: `/requests/${requestId}/rating`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { requestId }) => [{ type: 'Rating', id: requestId }],
    }),
    deleteRating: builder.mutation({
      query: (requestId) => ({
        url: `/requests/${requestId}/rating`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, requestId) => ['Requests', { type: 'Rating', id: requestId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRequestStatsQuery,
  useGetRequestsQuery,
  useCancelRequestMutation,
  useGetRatingQuery,
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} = requestsApi;
