import { apiSlice } from "./apiSlice";

export const workerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopWorkers: builder.query({
      query: () => ({
        url: "/workers/top-by-category",
        method: "GET",
      }),
    }),
    getFilteredWorkers: builder.query({
      query: (filters) => ({
        url: `/workers${filters}`,
        method: "GET",
      }),
    }),
    getWorkerWorks: builder.query({
      query: () => ({
        url: "/workers/works",
        method: "GET",
      }),
      providesTags: ["WorkerWorks"],
    }),
    getWorkerWorkById: builder.query({
      query: (id) => ({
        url: `/workers/works/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "WorkerWork", id }],
    }),
    addWorkerWork: builder.mutation({
      query: (body) => ({
        url: "/workers/works",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkerWorks"],
    }),
    updateWorkerWork: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/workers/works/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "WorkerWorks",
        { type: "WorkerWork", id },
      ],
    }),
    deleteWorkerWork: builder.mutation({
      query: (id) => ({
        url: `/workers/works/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkerWorks"],
    }),
    getWorkerServices: builder.query({
      query: () => ({
        url: "/workers/services",
        method: "GET",
      }),
      providesTags: ["WorkerServices"],
    }),
    addWorkerService: builder.mutation({
      query: (body) => ({
        url: "/workers/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkerServices"],
    }),
    deleteWorkerService: builder.mutation({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkerServices"],
    }),
    getIncomingRequests: builder.query({
      query: () => ({
        url: "/workers/requests",
        method: "GET",
      }),
      providesTags: ["WorkerRequests"],
    }),
    updateRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/workers/requests/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["WorkerRequests", "WorkerWorks"],
    }),
    // Worker Profile and Dashboard============================>
    getWorkerProfile: builder.query({
      query: () => ({
        url: "/workers/profile",
        method: "GET",
      }),
      providesTags: ["WorkerProfile"],
    }),

    getDashboardStats: builder.query({
      query: () => ({
        url: "/workers/stats",
        method: "GET",
      }),
      providesTags: ["WorkerStats"],
    }),

    getDashboardRequests: builder.query({
      query: () => ({
        url: "/workers/dashboard-requests",
        method: "GET",
      }),
      providesTags: ["WorkerRequests"],
    }),
    getWorkerServices: builder.query({
      query: () => ({
        url: "/workers/services",
        method: "GET",
      }),
      providesTags: ["WorkerServices"],
    }),
    getWorkerServiceById: builder.query({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "WorkerService", id }],
    }),
    addWorkerService: builder.mutation({
      query: (body) => ({
        url: "/workers/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkerServices"],
    }),
    updateWorkerService: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/workers/services/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "WorkerServices",
        { type: "WorkerService", id },
      ],
    }),
    deleteWorkerService: builder.mutation({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkerServices"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    //======================================>
  }),
  overrideExisting: false,
});
export const {
  useGetTopWorkersQuery,
  useGetFilteredWorkersQuery,
  useGetWorkerWorksQuery,
  useGetWorkerWorkByIdQuery,
  useAddWorkerWorkMutation,
  useUpdateWorkerWorkMutation,
  useDeleteWorkerWorkMutation,
  useGetIncomingRequestsQuery,
  useUpdateRequestStatusMutation,
  // NEW
  useGetWorkerProfileQuery,
  useGetDashboardStatsQuery,
  useGetDashboardRequestsQuery,
  useGetWorkerServicesQuery,
  useGetWorkerServiceByIdQuery,
  useAddWorkerServiceMutation,
  useUpdateWorkerServiceMutation,
  useDeleteWorkerServiceMutation,
  useUploadImageMutation,
} = workerApi;
