import { apiSlice } from "./apiSlice";
import { setCredentials } from "../store/slices/authSlice";

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
    submitOnboarding: builder.mutation({
      query: (formData) => ({
        url: "/workers/onboarding",
        method: "POST",
        body: formData,
        formData: true,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Backend returns updated worker in data.data
          if (data?.data) {
            dispatch(setCredentials({ user: data.data }));
          }
        } catch (_err) {
          // handled in component
        }
      },
    }),
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
   
    getWorkerServiceById: builder.query({
      query: (id) => ({
        url: `/workers/services/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "WorkerService", id }],
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
   
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    updateWorkerProfile: builder.mutation({
      query: (body) => ({
        url: "/workers/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["WorkerProfile"],
    }),
    getWorkerPublicProfile: builder.query({
      query: (id) => ({
        url: `/workers/public/${id}`,
        method: "GET",
      }),
      providesTags: ["WorkerProfile"],
    }),
    getWorkerPublicServices: builder.query({
      query: (id) => ({
        url: `/workers/public/${id}/services`,
        method: "GET",
      }),
      providesTags: ["WorkerServices"],
    }),
    getWorkerPublicWorks: builder.query({
      query: (id) => ({
        url: `/workers/public/${id}/works`,
        method: "GET",
      }),
      providesTags: ["WorkerWorks"],
    }),
    getWorkerPublicReviews: builder.query({
      query: (id) => ({
        url: `/workers/public/${id}/reviews`,
        method: "GET",
      }),
      providesTags: ["Rating"],
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
  useSubmitOnboardingMutation,
  useGetWorkerProfileQuery,
  // NEW
  useGetDashboardStatsQuery,
  useGetDashboardRequestsQuery,
  useGetWorkerServicesQuery,
  useGetWorkerServiceByIdQuery,
  useAddWorkerServiceMutation,
  useUpdateWorkerServiceMutation,
  useDeleteWorkerServiceMutation,
  useUploadImageMutation,
  useUpdateWorkerProfileMutation,
  useGetWorkerPublicProfileQuery,
  useGetWorkerPublicServicesQuery,
  useGetWorkerPublicWorksQuery,
  useGetWorkerPublicReviewsQuery,
} = workerApi;


