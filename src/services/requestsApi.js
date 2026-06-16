import { apiSlice } from "./apiSlice";

const STATUS_TO_API = {
  pending: "معلقة",
  accepted: "مقبولة",
  in_progress: "قيد التنفيذ",
  completed: "مكتملة",
  rejected: "مرفوضة",
  cancelled: "ملغية",
};

export const requestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestStats: builder.query({
      query: () => "/requests/stats",
      providesTags: ["RequestStats"],
    }),
    getRequests: builder.query({
      query: ({ status, page = 1, limit } = {}) => {
        const params = new URLSearchParams();
        if (status) params.set("status", STATUS_TO_API[status] || status);
        if (page > 1) params.set("page", page);
        if (limit) params.set("limit", limit);
        const qs = params.toString();
        return `/requests${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Requests"],
    }),
    getRequestById: builder.query({
      query: (id) => `/requests/${id}`,
      providesTags: (result, error, id) => [{ type: "Request", id }],
    }),
    cancelRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Requests", "RequestStats"],
    }),
    getRating: builder.query({
      query: (requestId) => `/requests/${requestId}/rating`,
      providesTags: (result, error, requestId) => [
        { type: "Rating", id: requestId },
      ],
    }),
    createRating: builder.mutation({
      query: ({ requestId, ...body }) => ({
        url: `/requests/${requestId}/rating`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { requestId }) => [
        "Requests",
        { type: "Rating", id: requestId },
      ],
    }),
    updateRating: builder.mutation({
      query: ({ requestId, ...body }) => ({
        url: `/requests/${requestId}/rating`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { requestId }) => [
        { type: "Rating", id: requestId },
      ],
    }),
    deleteRating: builder.mutation({
      query: (requestId) => ({
        url: `/requests/${requestId}/rating`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, requestId) => [
        "Requests",
        { type: "Rating", id: requestId },
      ],
    }),
    updateRequestStatus: builder.mutation({
      query: ({ id, status, eta }) => ({
        url: `/requests/${id}/status`,
        method: "PATCH",
        body: { status, eta },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Requests",
        "RequestStats",
        { type: "Request", id },
      ],
    }),
    createRequest: builder.mutation({
      query: ({ workerId, orderData }) => ({
        url: `/requests/${workerId}`,
        method: "POST",
        body: orderData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRequestStatsQuery,
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCancelRequestMutation,
  useGetRatingQuery,
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useUpdateRequestStatusMutation,
  useCreateRequestMutation,
} = requestsApi;
